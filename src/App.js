import React from 'react'
import HomePage from './HomePage'
import BrowsePage from './BrowsePage'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  //stores state of books on my shelves
  state = {
  	myBooks: []
  }
  
  //fetches books from API and makes sure the state is ok 
  refreshBooks = () => {
    BooksAPI.getAll().then((myBooks) => {this.setState({ myBooks })})
  }
                               
  componentDidMount() {
  	this.refreshBooks()
  }

  //moves book to another shelf
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
 	this.refreshBooks()
  }

  render() {
    
    return (
      <div className="app">
         <Route exact path="/search" render={() => (
            <BrowsePage
                myBooks={this.state.myBooks}
                moveBook={this.moveBook} 
            />
		)} />
       <Route exact path="/" render={() => (
           <HomePage
                myBooks={this.state.myBooks}
                moveBook={this.moveBook} 
           />
		)} />
      </div>
    )

  }

}

export default BooksApp
