// Create empty library & set html constants 
let myLibrary = [];
const tbody = document.querySelector('tbody');
const body = document.querySelector('body');
const form = document.createElement('form');

// Create Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.changeReadStatus = function () {
    if (this.read == '✓') {
        this.read = '';
    } else {
        this.read = '✓';
    }
};

// Library functions
function addBookToLibrary(book) {
    myLibrary.push(book);
};


function displayBooks(library) {
    tbody.innerHTML = '';
    for (let book in library) {
        const newBook = document.createElement('tr');
        const newValues = Object.values(library[book]);
        const newIndex = library.indexOf(library[book]);
        for (value in newValues) {
            let newValue = document.createElement('td');
            newValue.textContent = newValues[value];
            newBook.appendChild(newValue);
        }

        const changeReadButton = document.createElement('button');
        changeReadButton.textContent = 'Mark as read';
        changeReadButton.type = 'button';
        newBook.appendChild(changeReadButton);
        changeReadButton.addEventListener('click', () => {
            library[book].changeReadStatus();
            displayBooks(library);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.type = 'button';
        newBook.appendChild(removeButton);
        removeButton.addEventListener('click', () => {
            library.splice(newIndex, 1);
            displayBooks(library);
        });

        tbody.appendChild(newBook);
    }
};

// Define structure of form
function generateBookForm() {
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Book Information';
    form.appendChild(formTitle);

    const getTitle = document.createElement('input');
    getTitle.placeholder = 'Title';
    getTitle.id = 'title';
    form.appendChild(getTitle);

    const getAuthor = document.createElement('input');
    getAuthor.placeholder = 'Author';
    getAuthor.id = 'author';
    form.appendChild(getAuthor);

    const getPages = document.createElement('input');
    getPages.placeholder = 'Pages';
    getPages.id = 'pages';
    form.appendChild(getPages);

    const getRead = document.createElement('input');
    getRead.type = 'checkbox';
    getRead.name = 'check-read';
    getRead.id = 'read';
    const readLabel = document.createElement('label');
    readLabel.for = 'check-read';
    readLabel.textContent = 'Have you read it?';
    form.appendChild(readLabel);
    form.appendChild(getRead);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Submit';
    confirmButton.type = 'button';
    form.appendChild(confirmButton);
    
    body.appendChild(form);

// Add new book to library on button press
    confirmButton.addEventListener('click', () => {
        let newRead = '';
        if (document.getElementById('read').checked) {
            newRead += '✓';
        }
        let newTitle = document.getElementById('title').value;
        let newAuthor = document.getElementById('author').value;
        let newPages = document.getElementById('pages').value;
        if (newTitle && newAuthor && newPages) {
            const newBook = new Book(newTitle, newAuthor, newPages, newRead);
            addBookToLibrary(newBook);
            displayBooks(myLibrary);
            form.innerHTML = '';
        } else {
            alert('Please complete the form.');
        }
    });

};

// Create add book form on button press
const addBookButton = document.createElement('button');
addBookButton.classList.toggle('new-book');
addBookButton.textContent = 'Add Book';
body.appendChild(addBookButton);
addBookButton.addEventListener('click', () => {
    if (form.innerHTML == '') {
        generateBookForm();
    };
});





// Testers
const theHobbit = new Book('The Hobbit', 'JRR Tolkein', 295, '');
const warbreaker = new Book('Warbreaker', 'Brandon Sanderson', 1210, '✓');

addBookToLibrary(warbreaker);
addBookToLibrary(theHobbit);
//
displayBooks(myLibrary);

