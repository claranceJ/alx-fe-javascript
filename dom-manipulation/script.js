document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const categoryFilter = document.getElementById("categoryFilter");
  
    // Load quotes from localStorage or initialize an empty array
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    let categories = [];
  
    // Mock API URL
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Replace with actual endpoint
  
    // Function to display a random quote
    function showRandomQuote() {
      const filteredQuotes = getFilteredQuotes();
      if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add a new quote.";
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
    }
  
    // Function to add a new quote
    window.addQuote = function() {
      const quoteText = document.getElementById("newQuoteText").value;
      const quoteCategory = document.getElementById("newQuoteCategory").value;
  
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quote added successfully!");
        // Clear the input fields after adding the quote
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        updateCategories();
      } else {
        alert("Please enter both quote text and category.");
      }
    };
  
    // Function to export quotes to a JSON file
    window.exportToJsonFile = function() {
      const dataStr = JSON.stringify(quotes);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "quotes.json";
      downloadLink.click();
      URL.revokeObjectURL(url);
    };
  
    // Function to import quotes from a JSON file
    window.importFromJsonFile = function(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported successfully!");
        updateCategories();
      };
      fileReader.readAsText(event.target.files[0]);
    };
  
    // Function to populate categories dropdown
    function populateCategories() {
      categories = [...new Set(quotes.map(quote => quote.category))];
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
  
    // Function to update categories dropdown
    function updateCategories() {
      populateCategories();
      showRandomQuote();
    }
  
    // Function to get filtered quotes based on selected category
    function getFilteredQuotes() {
      const selectedCategory = categoryFilter.value;
      if (selectedCategory === "all") {
        return quotes;
      } else {
        return quotes.filter(quote => quote.category === selectedCategory);
      }
    }
  
    // Function to filter quotes based on selected category
    window.filterQuotes = function() {
      showRandomQuote();
      localStorage.setItem("selectedCategory", categoryFilter.value);
    };
  
    // Function to fetch quotes from server
    async function fetchQuotesFromServer() {
      try {
        const response = await fetch(apiUrl);
        const serverQuotes = await response.json();
  
        // Assuming serverQuotes is an array of quote objects with text and category
        // You might need to adjust the property names based on your actual server response
        const newServerQuotes = serverQuotes.map(serverQuote => ({
          text: serverQuote.title,
          category: serverQuote.body // Adjust this as necessary
        }));
  
        // Conflict resolution: Server's data takes precedence
        const mergedQuotes = [...newServerQuotes, ...quotes];
        quotes = [...new Set(mergedQuotes.map(quote => JSON.stringify(quote)))].map(str => JSON.parse(str));
  
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes synced with server successfully!");
        updateCategories();
      } catch (error) {
        console.error("Error syncing with server:", error);
      }
    }
  
    // Periodically sync with server every 5 minutes
    setInterval(fetchQuotesFromServer, 300000);
  
    // Initialize
    newQuoteButton.addEventListener("click", showRandomQuote);
    populateCategories();
  
    // Restore last selected category filter
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      categoryFilter.value = savedCategory;
    }
    showRandomQuote();
  });
  