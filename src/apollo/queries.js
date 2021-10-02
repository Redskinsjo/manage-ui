import { gql } from "@apollo/client";

export const FETCH_TABLES = gql`
  query fetchTables {
    tables {
      _id
      numero
      seats
      indoor
      outdoor
      active
      guests {
        count
        profiles {
          fullname
          firstname
          lastname
        }
      }
      orders {
        name
      }
    }
  }
`;

export const FETCH_TABLE = gql`
  query ($id: ID) {
    table(id: $id) {
      numero
      seats
    }
  }
`;

export const DELETE_TABLE = gql`
  mutation ($id: ID) {
    deleteTable(id: $id) {
      numero
      seats
      _id
    }
  }
`;

export const CREATE_TABLE = gql`
  mutation ($data: TableInput) {
    createTable(data: $data) {
      _id
      numero
      seats
      indoor
      outdoor
      active
      guests {
        count
        profiles {
          fullname
          firstname
          lastname
        }
      }
      orders {
        name
      }
    }
  }
`;

// continuer ici
// const FETCH_ORDERS_BY_TABLE = gql`
//   query($tableId: ID) {
//     ordersByTable(tableId: $tableId) {

//     }
//   }
// `

// export const CREATE_DISH = gql``;
