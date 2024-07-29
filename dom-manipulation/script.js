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
        alert("Quote Added succefully!");

        //-------clear the input------------//
        document.getElementById("newQuoteText").value= "";
        document.getElementById("newQuoteCategory").value= "";

    } else{
        alert("Please enter both a quote and a category!");
    }
}



//Event Listener to "show new quote button"
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

//initialize the form and display the first quote
showRandomQuote();