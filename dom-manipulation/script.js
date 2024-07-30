document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const exportButton = document.getElementById("exportQuotes");
    const addQuoteButton = document.getElementById("addQuoteButton");
  
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
    // Function to display a random quote
    function showRandomQuote() {
      if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add a new quote.";
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
    }
  
    // Function to add a new quote
    function addQuote() {
      const quoteText = document.getElementById("newQuoteText").value;
      const quoteCategory = document.getElementById("newQuoteCategory").value;
  
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quote added successfully!");
        // Clear the input fields after adding the quote
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
      } else {
        alert("Please enter both quote text and category.");
      }
    }
  
    // Function to export quotes to a JSON file
    function exportQuotes() {
      const dataStr = JSON.stringify(quotes);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "quotes.json";
      downloadLink.click();
      URL.revokeObjectURL(url);
    }
  
    // Function to import quotes from a JSON file
    window.importFromJsonFile = function(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported successfully!");
      };
      fileReader.readAsText(event.target.files[0]);
    };
  
    // Initialize
    newQuoteButton.addEventListener("click", showRandomQuote);
    addQuoteButton.addEventListener("click", addQuote);
    exportButton.addEventListener("click", exportQuotes);
  });
  