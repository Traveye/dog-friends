import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
        _id
        username
        password
        location
        dogReference{
            _id
        }
        dog {
            bio
            name
            playStyle
            breed
            userReference{
                _id
            }
        }
    }
  }
`;

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            password
            location
            dogReference{
                _id
            }
        }
    }
`;

