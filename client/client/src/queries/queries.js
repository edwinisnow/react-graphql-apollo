import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

const getBooksAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

export { getBooksQuery, getBooksAuthors }