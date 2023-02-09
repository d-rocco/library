const myLibrary = [];

function Book(title, author, numPages, hasBeenRead, index) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasBeenRead = hasBeenRead;
  const finishedBtn = null;
  const removeBtn = null;
  this.index = index;
}

Book.prototype.setButtons = function setButtons(book, bookCard) {
  const finishedButton = document.createElement('button');
  finishedButton.classList.add("finished-btn");
  if (book.hasBeenRead) {
    finishedButton.textContent = "Finished";
  } else {
    finishedButton.textContent = "Unfinished";
  }
  
  const removeButton = document.createElement('button');
  removeButton.classList.add("remove-btn");
  removeButton.textContent = "Remove";

  bookCard.appendChild(finishedButton);
  bookCard.appendChild(removeButton);
  book.finishedBtn = finishedButton;
  book.removeBtn = removeButton;
} 

const library = document.querySelector(".library");

function displayLibrary() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i] !== '') {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      const book = myLibrary[i];

      const bookTitle = document.createElement("div");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("div");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = book.author;

      const pages = document.createElement("div");
      pages.classList.add("number-of-pages");
      pages.textContent = `${book.numPages} Pages`;


      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(pages);
      book.setButtons(book, bookCard);
      library.appendChild(bookCard);
    }
  }

  myLibrary.forEach((book) => {
    if (book !== '') {
      book.finishedBtn.addEventListener('click', e => {
      e.preventDefault();
      if (book.hasBeenRead) {
        book.hasBeenRead = false;
        book.finishedBtn.textContent = "Unfinished";
      } else {
        book.hasBeenRead = true;
        book.finishedBtn.textContent = "Finished";
      }
    })
    }
  })

  myLibrary.forEach((book) => {
    if (book !== '') {
      book.removeBtn.addEventListener('click', e => {
        e.preventDefault();
        const card = book.removeBtn.parentNode
        card.parentNode.removeChild(card);
        myLibrary.splice(book.index, 1, '');
        console.log(myLibrary);
      })
    }
  })
}

function addBookToLibrary(title, author, numPages, hasBeenRead) {
  const book = new Book(title, author, numPages, hasBeenRead, myLibrary.length);
  myLibrary.push(book);
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

