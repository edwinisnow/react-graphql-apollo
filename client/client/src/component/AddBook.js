import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksAuthors } from '../queries/queries'

class AddBook extends Component {
    displayAuthors() {
        var data = this.props.data;
        if (data.loading) {
            return (<option>Loading Authors</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }

    }

    render() {
        console.log('this.props', this.props);
        return (
            <div>
                <form id="add-book">
                    <div className="field">
                        <label htmlFor="">Book Name</label>
                        <input type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="">Genre</label>
                        <input type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="">Author</label>
                        <select>
                            <option>Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                </form>
                <button type="submit">+</button>
            </div>
        )
    }
}

export default graphql(getBooksAuthors)(AddBook)
