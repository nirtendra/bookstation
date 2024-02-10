
document.addEventListener("DOMContentLoaded", start)

async function start() {
  let searchform = document.querySelector("#search-form");
  let searcbox = document.querySelector("#search-box");

  let addBooksForm = document.querySelector("#addBooksForm");
  let booklist = document.querySelector(".bookContainer");
  let freeContainers = document.querySelector(".freeContainers");
  let bookstationContainers = document.querySelector(".bookstation-Containers");

  // Fetch data from the JSON file
  let books = await getBook();


  // Populate cards with existing books
  populateBooks(books);

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

    // Populate the books with the filtered results
    populateBooks(filteredBooks);
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

    // Add new book to the JSON file
    await addBook({ title, author, year_publish, image_source, num_pages, status });

    // Clear the form fields
    addBooksForm.reset();

    // Refresh the book list
    books = await getBook();
    populateBooks(books);
  });

}

function populateBooks(books) {
  let booklist = document.querySelector(".bookContainer");

  // Clear existing content
  booklist.innerHTML = "";

  books.forEach((book) => {
    let bookItem = document.createElement("div");
    bookItem.classList.add("card-container"); // Add the class to the div
    bookItem.style.background="#f237"; 

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async () => {
      await deleteBook(book.id); // Assuming each book object has an 'id' property

      // Refresh the book list after deletion
      books = await getBook();
      populateBooks(books);
    });

    // Append the delete button to the bookItem
    bookItem.appendChild(deleteButton);

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

    // Append child elements to the bookItem
    bookItem.appendChild(imgElement);
    bookItem.appendChild(h2Element);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(yearElement);
    bookItem.appendChild(pagesElement);
    bookItem.appendChild(statusElement);

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



   













