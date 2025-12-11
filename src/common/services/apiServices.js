import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getToken from './token'

const PATToken = `Bearer ${getToken()}` ;
export const apiServices = createApi({
 reducerPath: 'apiServices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': PATToken
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'users',
    }),
    getUserByUsername: builder.query({
      query: (username) => `users/${username}`,
    }),
    getReposByUsername: builder.query({
      query: (username) => `users/${username}/repos`,
    }),
    searchUsers: builder.query({
      query: (searchTerm) => ({
        url: '/search/users',
        params: {
          q: `${searchTerm} in:login`,
          per_page: 100,
        },
      }),
      transformResponse: (response) => response.items, // Extract items array
    }),
  }),
});

export const { useGetUserQuery, useGetUserByUsernameQuery, useGetReposByUsernameQuery, useSearchUsersQuery } = apiServices;
 