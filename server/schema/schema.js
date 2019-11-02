const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');
const _ = require('lodash')

const graphql = require('graphql')

// const [GraphQLObjectType, GraphQLString] = require('graphql')

var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1' },
    { name: 'The final Empire', genre: 'Fantasy', id: '2', authorid: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorid: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorid: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorid: '3' },
]

var authors = [
    { name: 'Patrick Rothfuse', age: 44, id: '1' },
    { name: 'Brandan Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchet', age: 66, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(authors, { id: parent.authorid })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                const _books = _.filter(books, { authorid: parent.id })
                return _books
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db
                const _book = _.find(books, { id: args.id })
                // console.log("Log: -----> : resolve -> _book", _book)
                return _book
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db
                const _author = _.find(authors, { id: args.id })
                return _author

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }

        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }



    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})