// Create empty library & set html constants
let myLibrary = [];
const tbody = document.querySelector("tbody");
const body = document.querySelector("body");
const form = document.createElement("form");

// Create book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    if (this.read == "✓") {
      this.read = "";
    } else {
      this.read = "✓";
    }
  }

  addToLibrary() {
    myLibrary.push(this);
  }
}

// Show books in library with buttons to remove and change read status
function displayBooks(library) {
  tbody.innerHTML = "";
  for (let book in library) {
    const newBook = document.createElement("tr");
    const newValues = Object.values(library[book]);
    const newIndex = library.indexOf(library[book]);
    for (value in newValues) {
      let newValue = document.createElement("td");
      newValue.textContent = newValues[value];
      newBook.appendChild(newValue);
    }

    const changeReadButtonContainer = document.createElement("td");
    const changeReadButton = document.createElement("button");
    changeReadButton.textContent = "Change read status";
    changeReadButton.type = "button";
    changeReadButtonContainer.appendChild(changeReadButton);
    newBook.appendChild(changeReadButtonContainer);
    changeReadButton.addEventListener("click", () => {
      library[book].changeReadStatus();
      displayBooks(library);
    });

    const removeButtonContainer = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.type = "button";
    removeButtonContainer.appendChild(removeButton);
    newBook.appendChild(removeButtonContainer);
    removeButton.addEventListener("click", () => {
      library.splice(newIndex, 1);
      displayBooks(library);
    });

    tbody.appendChild(newBook);
  }
}

// Define structure of form
function generateBookForm() {
  const form = document.createElement("form");

  const formTitle = document.createElement("h2");
  formTitle.textContent = "Book Information";
  form.appendChild(formTitle);

  const title = document.createElement("input");
  title.placeholder = "Title";
  title.id = "title";
  title.required = true;
  title.addEventListener("input", () => {
    title.setCustomValidity("");
    title.checkValidity();
  });
  title.addEventListener("invalid", () => {
    title.setCustomValidity("Enter a title.");
  });
  form.appendChild(title);

  const author = document.createElement("input");
  author.placeholder = "Author";
  author.id = "author";
  author.required = true;
  author.addEventListener("input", () => {
    author.setCustomValidity("");
    author.checkValidity();
  });
  author.addEventListener("invalid", () => {
    author.setCustomValidity("Enter an author.");
  });
  form.appendChild(author);

  const pages = document.createElement("input");
  pages.placeholder = "Pages";
  pages.type = "number";
  pages.id = "pages";
  pages.required = true;
  pages.min = 1;
  pages.addEventListener("input", () => {
    pages.setCustomValidity("");
    pages.checkValidity();
  });
  pages.addEventListener("invalid", () => {
    pages.setCustomValidity("Enter a number above 0.");
  });
  form.appendChild(pages);

  const read = document.createElement("input");
  read.type = "checkbox";
  read.id = "read";
  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Have you read it?";
  form.appendChild(readLabel);
  form.appendChild(read);

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Submit";
  confirmButton.type = "submit";
  form.appendChild(confirmButton);

  body.appendChild(form);

  // Add new book to library on button press
  confirmButton.addEventListener("click", () => {
    if (
      title.checkValidity() &&
      author.checkValidity() &&
      pages.checkValidity()
    ) {
      let readValue = "";
      if (document.getElementById("read").checked) {
        readValue += "✓";
      }
      const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        readValue
      );
      newBook.addToLibrary();
      displayBooks(myLibrary);
      form.remove();
    }
  });
}

// Create add book form on button press
const addBookButton = document.createElement("button");
addBookButton.classList.toggle("new-book");
addBookButton.textContent = "Add Book";
body.appendChild(addBookButton);
addBookButton.addEventListener("click", () => {
  if (!document.querySelector("form")) {
    generateBookForm();
  }
});

// Testers
const warbreaker = new Book("Warbreaker", "Brandon Sanderson", 1210, "✓");
warbreaker.addToLibrary();
displayBooks(myLibrary);
