import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class BrowsePage extends Component {
  
  //stores states of an input in a search box and the books that already match this input
  state = {
  	query: '',
    searched: []
  }

  //updates displayed (matching) books
  updateQuery = (query) => {
  	this.setState({ query })
    this.displayMatching(query)
  }

  //displays books that match the input in a search box; if none match it, none are shown
  displayMatching = (query) => {   
    if (query) {
      BooksAPI.search(query).then((searched) => {
        if (searched.error) {
          this.setState({ searched: [] })
        } else {
          this.setState({ searched })
        }
      })
    } else {
      this.setState({ searched: [] })
    }
  }
  
  render () {
	
  	return (
      <div className="search-books">
      	<div className="search-books-bar">
      		<Link 
       			to="/"
       			className="close-search">Close</Link>
			<div className="search-books-input-wrapper">
				<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
			</div>
      	</div>
      	<div className="search-books-results">
  			<ol className="books-grid">
				{
                  this.state.searched.map(searched => {
                    //default shelf value for a searched book that isn't on any of my shelves is "none"
                    let shelf = 'none'
                    this.props.myBooks.map(book => (
                      book.id === searched.id ? shelf = book.shelf : ''
                    ))
                  
                    return (
                     <li key={searched.id}>
						<Book 
							book={searched}
							moveBook={this.props.moveBook} 
							bookOnShelf={shelf}
						/>
					</li>
                    )

                  })
                }
			</ol>
  		</div>
      </div>
  	)
  }
}

export default BrowsePage