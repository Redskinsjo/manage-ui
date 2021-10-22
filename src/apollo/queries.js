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
    }
  }
`;

export const FETCH_TABLE = gql`
  query fetchSingleTable($id: ID) {
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

// export const FETCH_ORDERS = gql`
//   query fetchOrders {
//     orders
//   }
// `

// continuer ici
export const FETCH_ORDERS_BY_TABLE = gql`
  query fetchOrdersByTable($tableId: Int) {
    ordersByTable(tableId: $tableId) {
      _id
      table
      name
      main {
        name
        piece
        origin
      }
      side {
        name
        origin
      }
      salt
      pepper
      herbsAndSpices {
        name
        origin
        spicy
      }
      sauce {
        name
        main
        side1
        side2
        ratio
      }
      cooking
    }
  }
`;

export const CREATE_DISH = gql`
  mutation createOrder($data: OrderInput) {
    createOrder(data: $data) {
      _id
    }
  }
`;

export const SEARCH_GUEST = gql`
  query searchGuest($input: String) {
    searchGuest(input: $input) {
      _id
      fullname
      firstname
      lastname
      returningGuest
      previousDishes {
        name
      }
      anniversary
    }
  }
`;
