let myLibrary = [];
const library = document.querySelector('table');
const body = document.querySelector('body');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function addBookToLibrary(book) {
    myLibrary.push(book);
};


function displayBooks(lib) {
    for (let book in lib) {
        let newBook = document.createElement('tr');
        let newValues = Object.values(lib[book]);
        for (value in newValues) {
            let newValue = document.createElement('td');
            newValue.textContent = newValues[value];
            newBook.appendChild(newValue);
        }
        library.appendChild(newBook);
    }
};



// Testers
const theHobbit = new Book('The Hobbit', 'JRR Tolkein', 295, 'not read');
const warbreaker = new Book('Warbreaker', 'Brandon Sanderson', 1210, 'read');
addBookToLibrary(warbreaker);
addBookToLibrary(theHobbit);
//
displayBooks(myLibrary);




const newBookButton = document.createElement('button');
newBookButton.classList.toggle('new-book');
newBookButton.textContent = 'New Book';
body.appendChild(newBookButton);


newBookButton.addEventListener('click', () => {
    
});