const myLibrary = [];

function Book(title, author, numPages, hasBeenRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasBeenRead = hasBeenRead;
}

function displayLibrary() {
  const library = document.querySelector(".library");
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = myLibrary[i].title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = myLibrary[i].author;

    const pages = document.createElement("div");
    pages.classList.add("number-of-pages");
    pages.textContent = myLibrary[i].numPages;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(pages);
    library.appendChild(bookCard);
  }
}

function addBookToLibrary(title, author, numPages, hasBeenRead) {
  const book = new Book(title, author, numPages, hasBeenRead);
  myLibrary.push(book);
  console.log(myLibrary);
  displayLibrary();
}

const bookForm = document.querySelector(".book-info");
const addBookBtn = document.querySelector(".add-book-btn");
const hasReadBtn = document.querySelector(".has-read-btn");
const submitBtn = document.querySelector(".submit-book-btn");

function makeFormVisible() {
  bookForm.style.display = "grid";
  addBookBtn.style.display = "none";
}

function changeHasReadBtn() {
  if (hasReadBtn.textContent === "No") {
    hasReadBtn.textContent = "Yes";
  } else {
    hasReadBtn.textContent = "No";
  }
}

addBookBtn.addEventListener("click", makeFormVisible);
hasReadBtn.addEventListener("click", changeHasReadBtn);
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const formData = bookForm.querySelectorAll('input');
  if (formData[0].value === "" || formData[1].value === "" || formData[2].value === "") {
    // do nothing
  } else {
    if (hasReadBtn.textContent === "Yes") {
      addBookToLibrary(formData[0].value, formData[1].value, formData[2].value, true); 
    } else {
      addBookToLibrary(formData[0].value, formData[1].value, formData[2].value, false); 
    }
    for (let i = 0; i < formData.length; i += 1) {
      formData[i].value = "";
    }
    hasReadBtn.textContent = "No";
    bookForm.style.display = 'none';
    addBookBtn.style.display = 'inline-block';
  }
});
