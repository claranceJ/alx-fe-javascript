//---DYNAMIC CONTENT ADVANCE DOM MANIPULATION----//


//Array of quote objects
const quotes = [
{text: "The best way to predict the future is to create it.", category: "Inspiration"},
{text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life"},
{text: "Your time is limited, don't waste it living someone else's life.", category: "Motivation"}
];

//function to display a random quote
function showRandomQuote(){
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
    <p>${randomQuote.text}</p>
    <p><strong>Category:</stong> ${randomQuote.category}</p>
    `;

    //--Saving the last viewed quote to session storage
    sessionStorage.setItem("lastViewedQuote",JSON.stringify("randomQuote"));
}

//----------------function to create the Add Quote form--------------//
// function createAddQuoteForm() {
//     const formContainer = document.createElement("div");
//     formContainer.innerHTML = `
//     <h2>Add a New Quote</h2>
//     <form id="addQuoteForm">  
//        <div>
//           <label for="quoteText">Quote:</label> 
//           <input type="text" id="quoteText" name="quoteText" required> 
//         </div> 
//         <div>
//            <label for="quoteCategory">Category:</label> 
//            <input type="text" id="quoteCategory" name="quoteCategory" required>
//         </div> 
//         <button type="submit">Add Quote</button> 
//     </form> 
//     `;
//     document.body.appendChild(formContainer);

//     //---------------handling form submission-------------//
//     const addQuoteForm = document.getElementById("addQuoteForm");
//     addQuoteForm.addEventListener("submit", function(event){
//         event.preventDefault();
//         const newQuoteText = document.getElementById("quoteText").value;
//         const newQuoteCategory = document.getElementById("quoteCategory").value;
//         const newQuote = {
//             text: newQuoteText,
//             category: newQuoteCategory,
//         };
//         quotes.push(newQuote);
//         alert("Quote added successfully!");

//         addQuoteForm.reset();
//     })

// }
//---------------------OR------------------------------//
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if(newQuoteText && newQuoteCategory){
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory};
        quotes.push(newQuote);
        saveQuotesToLocalStorage();
        alert("Quote Added succefully!");

        //-------clear the input------------//
        document.getElementById("newQuoteText").value= "";
        document.getElementById("newQuoteCategory").value= "";

    } else{
        alert("Please enter both a quote and a category!");
    }
}

//--function to save quotes to local storage
function saveQuotesToLocalStorage(){
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

//--function to load quotes from local storage
function loadQuotesFromLocalStorage(){
    const storedQuotes = localstorage.getItem("quotes");
    if(storedQuotes){
        quotes = JSON.parse(storedQuotes);
    }
}

//Function to load the last viewed quote from session storage
function LoadLastViewedQuote(){
    const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
    if(lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML=`
        <p>${quote.text}</p>
        <p><strong>Category:</strong> ${quote.category}</p>
        `
    }
}


//Event Listener to "show new quote button"
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

//load quotes from local storage
loadQuotesFromLocalStorage();

//load last viewed quote from session storage
LoadLastViewedQuote();

//Function to export quote from JSON file
function exportToJsonFile() { 
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" }); 
    const url = URL.createObjectURL(dataBlob);

    const downloadLink = document.createElement("a"); 
    downloadLink.href = url; 
    downloadLink.download = "quotes.json"; 
    downloadLink.click();

    //CLEAN UP
    URL.revokeObjectURL(url);
}

//--Function to Import quotes from JSON file
function importFromJsonFile(event) { 
    const fileReader = new FileReader(); 
    fileReader.onload = function(event) { 
        try { const importedQuotes = JSON.parse(event.target.result); 
            if (Array.isArray(importedQuotes)) { 
                quotes.push(...importedQuotes); 
                saveQuotesToLocalStorage(); 
                alert('Quotes imported successfully!'); 
            } else { 
                alert('Invalid JSON format. Please upload a valid JSON file.'); 
            } 
        } catch (error) { 
            alert('Error parsing JSON file. Please upload a valid JSON file.');
         } 
    }; 
    fileReader.readAsText(event.target.files[0]); 
}
