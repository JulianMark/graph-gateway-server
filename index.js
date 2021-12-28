const { ApolloServer, gql } = require('apollo-server');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Character {
      id: ID
      name: String
  }

  type Person {
      id: ID
      name: String
      surname: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    characters: [Character!]!
    people: [Person!]!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      characters: () => fetchCaracters(),
      people: () => fetchPeople()
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const fetchCaracters = () => {
    return fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(json => json.results)
}

const fetchPeople = () => {
    return fetch('http://localhost:9090/api/')
    .then(res => res.json())
}

const characters = [
    {
        id: '1',
        name: 'Juan'
    },
    {
        id: '2',
        name: 'Pedro'
    },
]
