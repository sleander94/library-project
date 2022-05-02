let myLibrary = [];
const tbody = document.querySelector('tbody');
const body = document.querySelector('body');
const form = document.createElement('form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function addBookToLibrary(book) {
    myLibrary.push(book);
};


function displayBooks(library) {
    tbody.innerHTML = '';
    for (let book in library) {
        let newBook = document.createElement('tr');
        let newValues = Object.values(library[book]);
        for (value in newValues) {
            let newValue = document.createElement('td');
            newValue.textContent = newValues[value];
            newBook.appendChild(newValue);
        }
        tbody.appendChild(newBook);
    }
};


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


    confirmButton.addEventListener('click', () => {
        let newRead = '';
        if (document.getElementById('read').checked) {
            newRead += '✓';
        }
        let newTitle = document.getElementById('title').value;
        let newAuthor = document.getElementById('author').value;
        let newPages = document.getElementById('pages').value;
        const newBook = new Book(newTitle, newAuthor, newPages, newRead);
        addBookToLibrary(newBook);
        displayBooks(myLibrary);
        form.innerHTML = '';
    });

};

// Testers
const theHobbit = new Book('The Hobbit', 'JRR Tolkein', 295, 'not read');
const warbreaker = new Book('Warbreaker', 'Brandon Sanderson', 1210, 'read');
addBookToLibrary(warbreaker);
addBookToLibrary(theHobbit);
//
displayBooks(myLibrary);


const addBookButton = document.createElement('button');
addBookButton.classList.toggle('new-book');
addBookButton.textContent = 'Add Book';
body.appendChild(addBookButton);


addBookButton.addEventListener('click', () => {
    if (form.innerHTML == '') {
        generateBookForm();
    };
});