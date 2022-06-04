// Book Class: Represents a Book
class Book {
	constructor(title, subject, link) {
	  this.title = title;
	  this.subject = subject;
	  this.link = link;
	}
  }
  
  // UI Class: Handle UI Tasks
  class UI {
	static displayBooks() {
	  const books = Store.getBooks();
  
	  books.forEach((book) => UI.addBookToList(book));
	}
  
	static addBookToList(book) {
	  const list = document.querySelector('#book-list');
  
	  const row = document.createElement('tr');
  
	  row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.subject}</td>
		<td>${book.link}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
	  `;
  
	  list.appendChild(row);
	}
  
	static deleteBook(el) {
	  if(el.classList.contains('delete')) {
		el.parentElement.parentElement.remove();
	  }
	}
  
	static showAlert(message, className) {
	  const div = document.createElement('div');
	  div.className = `alert alert-${className}`;
	  div.appendChild(document.createTextNode(message));
	  const container = document.querySelector('.container');
	  const form = document.querySelector('#book-form');
	  container.insertBefore(div, form);
  
	  // Vanish in 3 seconds
	  setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}
  
	static clearFields() {
	  document.querySelector('#title').value = '';
	  document.querySelector('#subject').value = '';
	  document.querySelector('#link').value = '';
	}
  }
  
  // Store Class: Handles Storage
  class Store {
	static getBooks() {
	  let books;
	  if(localStorage.getItem('books') === null) {
		books = [];
	  } else {
		books = JSON.parse(localStorage.getItem('books'));
	  }
  
	  return books;
	}
  
	static addBook(book) {
	  const books = Store.getBooks();
	  books.push(book);
	  localStorage.setItem('books', JSON.stringify(books));
	}
  
	static removeBook(link) {
	  const books = Store.getBooks();
  
	  books.forEach((book, index) => {
		if(book.link === link) {
		  books.splice(index, 1);
		}
	  });
  
	  localStorage.setItem('books', JSON.stringify(books));
	}
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();
  
	// Get form values
	const title = document.querySelector('#title').value;
	const subject = document.querySelector('#subject').value;
	const link = document.querySelector('#link').value;
  
	// Validate
	if(title === '' || subject === '' || link === '') {
	  UI.showAlert('Please fill in all fields', 'danger');
	} else {
	  // Instatiate book
	  const book = new Book(title, subject, link);
  
	  // Add Book to UI
	  UI.addBookToList(book);
  
	  // Add book to store
	  Store.addBook(book);
  
	  // Show success message
	  UI.showAlert('Book Added', 'success');
  
	  // Clear fields
	  UI.clearFields();
	}
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
	// Remove book from UI
	UI.deleteBook(e.target);
  
	// Remove book from store
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
	// Show success message
	UI.showAlert('Book Removed', 'success');
  });


// Accordion text box javascript
let accordion = document.querySelectorAll('.readings .accordion-container .accordion');

accordion.forEach(acco =>{
  acco.onclick = () =>{
    accordion.forEach(dion => dion.classList.remove('active'));
    acco.classList.toggle('active');
  };
});

document.querySelector('.load-more .btn').onclick = () =>{
  document.querySelectorAll('.courses .box-container .hide').forEach(show =>{
    show.style.display = 'block';
  });
  document.querySelector('.load-more .btn').style.display = 'none';
};

// Pop up tabs
let popup = document.getElementById("popup");

function openPopup(){
  popup.classList.add("open-popup");
}

function closePopup(){
  popup.classList.remove("open-popup");
}