import { gql } from "apollo-server-core";

const direction = `
    _id
    owner
    name
    state
    town
    neighborhood
    street
    outdoorNumber
    zipCode
    extraIndications
    normalizedFullDirection
`;
const directionById = gql`
  query DirectionById($directionByIdId: String!) {
    directionById(id: $directionByIdId) {
     ${direction}
    }
  }
`;
const paginate = gql`
  query DirectionPaginate(
    $page: Int, 
    $limit: Int, 
    $owner: String, 
    $search: String
  ) {
    directionPaginate(
      page: $page, 
      limit: $limit, 
      search: $search, 
      owner: $owner,  
    ) {
      info {
        page
        pages
        total
      }
      results {
        ${direction}
      }
    }
  }`;

const directionCreate = gql`
  mutation DirectionCreate($data: DirectionInputCreate!) {
    directionCreate(data: $data) {
     ${direction}
    }
  }
`;

const directionUpdate = gql`
  mutation DirectionUpdate(
    $data: DirectionInputUpdate!
    $directionUpdateId: String!
  ) {
    directionUpdate(data: $data, id: $directionUpdateId) {
       ${direction}
    }
  }
`;
export default { directionById, paginate, directionCreate, directionUpdate };
