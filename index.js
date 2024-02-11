
document.addEventListener("DOMContentLoaded", start)

async function start() {
  let searchform = document.querySelector("#search-form");
  let searcbox = document.querySelector("#search-box");

  let addBooksForm = document.querySelector("#addBooksForm");
 
  let freeContainers = document.querySelector(".freeContainers");
  let bookstationContainers = document.querySelector(".bookstation-Containers");





  // Fetch data from the JSON file
  let books = await getBook();

  let gadgets = await getGadgets();


  // Populate cards with existing books
  populateBooks(books);

  populateGadgets(gadgets)

  searchform.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the search input value
    const searchTerm = searcbox.value.toLowerCase()
    
    // Filter books based on the search term
    const filteredBooks = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    });

    const filteredgadgets = gadgets.filter((gadget) => {
      return (
        gadget.name.toLowerCase().includes(searchTerm) ||
        gadget.manufacture.toLowerCase().includes(searchTerm)
      );
    });

    // Populate the books with the filtered results
    populateBooks(filteredBooks);
    populateGadgets(filteredgadgets)
  });
  addBooksForm.addEventListener("submit", async (event) => {
  event.preventDefault();

    // Get form input values
    const title = document.getElementById("add-book-title").value;
    const author = document.getElementById("add-books-author").value;
    const year_publish = document.getElementById("add-books-year_publish").value;
    const image_source = document.getElementById("add-books-image_source").value;
    const num_pages = document.getElementById("add-books-num_pages").value;
    const status = document.getElementById("add-books-status").value;
    const category = document.querySelector("#add-books-category").value;
     console.log(category)

      // Check if the selected category is "Gadgets"
    if (category.toLowerCase() === "gadgets") {
      const name = document.getElementById("add-book-title").value;
     const manufacture = document.getElementById("add-books-author").value;
         const  price = document.getElementById("add-books-year_publish").value;
        const image = document.getElementById("add-books-image_source").value;
    const location = document.getElementById("add-books-num_pages").value;
    const status = document.getElementById("add-books-status").value;
       const category = document.querySelector("#add-books-category").value;


      // Add new gadget to the JSON file
      await addGadgets({ name: title, manufacture, price, location, status, category });
  } else {
      // Add new book to the JSON file
      await addBook({ title, author, year_publish, image_source, num_pages, status, category });
  }




   
    // Clear the form fields
    addBooksForm.reset();

    // Refresh the book list and gadgets lists
    books = await getBook();
    populateBooks(books);
    gadgets =await getGadgets()
    populateGadgets(gadgets)
    


   
  });

}

async function populateBooks(books) {
  let booklist = document.querySelector(".bookContainer");

  // Clear existing content
  booklist.innerHTML = "";

  books.forEach((book) => {
    let bookItem = document.createElement("div");
    bookItem.classList.add("card-container"); // Add the class to the div
    bookItem.style.background="#1125"; 

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async () => {
      await deleteBook(book.id); // Assuming each book object has an 'id' property

      // Refresh the book list after deletion
      books = await getBook();
      populateBooks(books);
    });

   
   

    // Create an img element
    let imgElement = document.createElement("img");
    imgElement.src = book.image_source;
    
    imgElement.alt = book.title;
    imgElement.classList.add("book-image"); 
    // Add the class to the img element

    // Create an h2 element
    let h2Element = document.createElement("h2");
    h2Element.textContent = book.title;

    // Create p elements
    let authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;

    let yearElement = document.createElement("p");
    yearElement.textContent = `Year Published: ${book.year_publish}`;

    let pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.num_pages}`;

    let statusElement = document.createElement("p");
    statusElement.textContent = `Status: ${book.status}`;

    let catelement = document.createElement("p");
    catelement.textContent = `category: ${book.category}`;


    // Append child elements to the bookItem
    bookItem.appendChild(imgElement);
    bookItem.appendChild(h2Element);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(yearElement);
    bookItem.appendChild(pagesElement);
    bookItem.appendChild(statusElement);
    bookItem.appendChild(deleteButton);
    bookItem.appendChild(catelement)

    // Append the bookItem to the booklist
    booklist.appendChild(bookItem);
  });
}





 async function getBook() {
  return fetch("http://localhost:3000/books").then((response) =>
    response.json()
  );
}

async function addBook(book) {
  return fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).then((response) => response.json());
}


async function deleteBook(bookId) {
  return fetch(`http://localhost:3000/books/${bookId}`, {
    method: "DELETE",
  }).then((response) => response.json());
}





// for adding freebies






function populateGadgets(gadgets) {
  let gadgetlist = document.querySelector(".freeContainers");

  // Clear existing content
  gadgetlist.innerHTML = "";

  gadgets.forEach((gadget) => {
    let gadgetItem = document.createElement("div");
    gadgetItem.classList.add("gadgets-container"); // Add the class to the div
    gadgetItem.style.background="#1125"; 

    let deleteButton2 = document.createElement("button");
    deleteButton2.textContent = "Delete";
    deleteButton2.classList.add("delete-button");

    deleteButton2.addEventListener("click", async () => {
      await deleteGadget(gadget.id); // Assuming each book object has an 'id' property

      // Refresh the book list after deletion
      gadgets = await getGadgets();
      populateGadgets(gadgets);
    });

   
   

    // Create an img element
    let imgElement2 = document.createElement("img");
    imgElement2.src = gadget.image;
  
    imgElement2.alt = gadget.name;
    imgElement2.classList.add("gadget-image"); 
    // Add the class to the img element

    // Create an h2 element
    let h2Element2 = document.createElement("h2");
    h2Element2.textContent = gadget.name;

    // Create p elements
    let authorElement2 = document.createElement("p");
    authorElement2.textContent = `manufacture: ${gadget.manufacture}`;

    let yearElement2 = document.createElement("p");
    yearElement2.textContent = `location: ${gadget.location}`;

    let pagesElement2 = document.createElement("p");
    pagesElement2.textContent = `price: ${gadget.price}`;

    let statusElement2 = document.createElement("p");
    statusElement2.textContent = `Status: ${gadget.status}`;

    // Append child elements to the bookItem
    gadgetItem.appendChild(imgElement2);
    gadgetItem.appendChild(h2Element2);
    gadgetItem.appendChild(authorElement2);
    gadgetItem.appendChild(yearElement2);
    gadgetItem.appendChild(pagesElement2);
    gadgetItem.appendChild(statusElement2);
    gadgetItem.appendChild(deleteButton2);

    // Append the bookItem to the booklist
    gadgetlist.appendChild(gadgetItem);
  });
}














async function getGadgets() {
  return fetch("http://localhost:3000/gadgets").then((response) =>
    response.json()
  );
}

async function addGadgets(gadget) {
  return fetch("http://localhost:3000/gadgets", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gadget),
  }).then((response) => response.json());
}


async function deleteGadget(gadgetId) {
  return fetch(`http://localhost:3000/gadgets/${gadgetId}`, {
    method: "DELETE",
  }).then((response) => response.json());
}
















