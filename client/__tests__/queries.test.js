import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { QUERY_USERS } from '../src/utils/queries';

const mocks = [
  {
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: [
          {
            _id: '1',
            username: 'user1',
            password: 'Password1!',
            location: 'New York',
            dogReference: {
              _id: '1',
            },
            dog: {
              bio: 'A friendly dog',
              dog_name: 'Buddy',
              play_style: 'Fetch',
              breed: 'Golden Retriever',
              userReference: {
                _id: '1',
              },
            },
          },
          {
            _id: '2',
            username: 'user2',
            password: 'Password2!',
            location: 'San Francisco',
            dogReference: {
              _id: '2',
            },
            dog: {
              bio: 'A loyal companion',
              dog_name: 'Max',
              play_style: 'Tug-of-war',
              breed: 'German Shepherd',
              userReference: {
                _id: '2',
              },
            },
          },
        ],
      },
    },
  },
];

describe('QUERY_USERS', () => {
  it('renders the list of users and their dogs', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyComponent />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });
});
