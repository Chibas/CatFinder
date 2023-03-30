import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BasicImage, Breed, CatImage, Favourite } from "../../models/models";

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

export interface PostResponse {
  id: number;
  message: string;
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
  tagTypes: ["ImagesList", "FavoritesList"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchImages: build.query<CatImage[], SearchImagesQueryParams>({
      query: ({ limit, page, breed_ids, sub_id, order = "DESC" }) => ({
        url: "images/search",
        params: {
          limit,
          page,
          breed_ids,
          sub_id,
          order,
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
    voteForImage: build.mutation<PostResponse, VoteDTO>({
      query: (voteData: VoteDTO) => ({
        url: "votes",
        method: "POST",
        body: voteData,
      }),
      // TODO: Can't invalidate list if ORDER is set to RANDOM
      invalidatesTags: ["ImagesList"],
    }),
    getFavourites: build.query<BasicImage[], SearchImagesQueryParams>({
      query: ({ limit, page, sub_id }) => ({
        url: "favourites",
        params: {
          limit,
          page,
          sub_id,
        },
      }),
      providesTags: (result) => ["FavoritesList"],
      transformResponse: (response: Favourite[]) => {
        return response.map((item: any) => ({
          id: item.image_id,
          url: item.image.url,
          favourite: { id: item.id },
        }));
      },
    }),
    favouriteImage: build.mutation<PostResponse, Partial<VoteDTO>>({
      query: (favouriteData: Partial<VoteDTO>) => ({
        url: "favourites",
        method: "POST",
        body: favouriteData,
      }),
      invalidatesTags: ["ImagesList", "FavoritesList"],
    }),
    unfavouriteImage: build.mutation<PostResponse, number | string>({
      query: (id: number | string) => ({
        url: `favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImagesList", "FavoritesList"],
    }),
  }),
});

export const {
  useSearchImagesQuery,
  useLazySearchImagesQuery,
  useGetBreedsQuery,
  useGetVotesQuery,
  useVoteForImageMutation,
  useFavouriteImageMutation,
  useUnfavouriteImageMutation,
  useGetFavouritesQuery,
} = thecatApi;
