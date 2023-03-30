import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Breed, CatImage, Vote } from "../../models/models";

type SearchImagesQueryParams = {
  limit?: number;
  page?: number;
  breed_ids?: string[];
  sub_id?: string;
  order?: "ASC" | "DESC";
};

export interface VoteDTO {
  image_id: string;
  sub_id: string;
  value: boolean;
}

export const thecatApi = createApi({
  reducerPath: "thecat/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1",
    prepareHeaders: (headers) => {
      const apiKey = process.env.REACT_APP_API_KEY;
      if (apiKey) {
        headers.set("x-api-key", apiKey);
      }
      return headers;
    },
  }),
  tagTypes: ["ImagesList"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchImages: build.query<CatImage[], SearchImagesQueryParams>({
      query: ({ limit, page, breed_ids, sub_id }) => ({
        url: "images/search",
        params: {
          limit,
          page,
          breed_ids,
          sub_id,
        },
      }),
      providesTags: (result) => ["ImagesList"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData, { arg }) => {
        if (arg?.page! > 0) {
          currentCacheData.push(...responseData);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getBreeds: build.query<Breed[], void>({
      query: () => ({
        url: "breeds",
      }),
    }),
    getVotes: build.query<CatImage[], SearchImagesQueryParams>({
      query: ({ limit, page, sub_id }) => ({
        url: "votes",
      }),
    }),
    voteForImage: build.mutation<void, VoteDTO>({
      query: (voteData: VoteDTO) => ({
        url: "votes",
        method: "POST",
        body: voteData,
      }),
      // TODO: Can't invalidate list properly because API always returns random set of pictures
      // invalidatesTags: ['ImagesList']
    }),
    getFavourites: build.query<CatImage[], SearchImagesQueryParams>({
      query: ({ limit, page, sub_id }) => ({
        url: "favourites",
        params: {
          limit,
          page,
          sub_id,
        },
      }),
    }),
    favoriteImage: build.mutation<void, Partial<VoteDTO>>({
      query: (favouriteData: Partial<VoteDTO>) => ({
        url: "favourites",
        method: "POST",
        body: favouriteData,
      }),
      // invalidatesTags: ['ImagesList']
    }),
    unfavoriteImage: build.mutation<void, number | string>({
      query: (id: number | string) => ({
        url: `favourites/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ['ImagesList']
    }),
  }),
});

export const {
  useSearchImagesQuery,
  useLazySearchImagesQuery,
  useGetBreedsQuery,
  useGetVotesQuery,
  useVoteForImageMutation,
  useFavoriteImageMutation,
  useUnfavoriteImageMutation,
  useGetFavouritesQuery,
} = thecatApi;
