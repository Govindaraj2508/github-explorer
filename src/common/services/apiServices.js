import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiServices = createApi({
 reducerPath: 'apiServices',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.github.com/'}),
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
  }),
});

export const { useGetUserQuery, useGetUserByUsernameQuery, useGetReposByUsernameQuery } = apiServices;
 