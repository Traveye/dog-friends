import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
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
            dog_name
            play_style
            breed
            userReference{
                _id
            }
        }
    }
  }
`;

export const QUERY_USER = gql`
    query getUser($userId: ID!) {
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
