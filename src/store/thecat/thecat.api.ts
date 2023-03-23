import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Breed, CatImage } from "../../models/models";

type SearchImagesQueryParams = {
  limit: number;
  breed_ids?: string[];
}

export const thecatApi = createApi({
  reducerPath: 'thecat/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1',
    prepareHeaders: (headers) => {
      const apiKey = process.env.REACT_APP_API_KEY;
      if (apiKey) {
        headers.set('x-api-key', apiKey)
      }
      return headers
    }
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchImages: build.query<CatImage[], SearchImagesQueryParams>({
      query: ({limit, breed_ids }) => ({
        url: 'images/search',
        params: {
          limit, breed_ids
        }
      })
    }),
    getBreeds: build.query<Breed[], void>({
      query: () => ({
        url: 'breeds'
      })
    })
  })
});

export const { useSearchImagesQuery, useLazySearchImagesQuery, useGetBreedsQuery } = thecatApi;