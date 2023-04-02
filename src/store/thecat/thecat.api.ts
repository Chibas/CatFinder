import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { BasicImage, Breed, CatImage, Vote } from "../../models/models";

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

export interface DataWithPagination<T> {
  items: T[];
  totalPages: number;
}

const calculateTotalPages = (meta?: FetchBaseQueryMeta) => {
  if (!meta) return 0;
  const paginationCount = meta.response?.headers.get("pagination-count");
  const paginationLimit = meta.response?.headers.get("pagination-limit");
  return paginationCount && paginationLimit
    ? Math.ceil(parseInt(paginationCount) / parseInt(paginationLimit))
    : 0;
};

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
  tagTypes: ["ImagesList", "FavoritesList", "VotesList"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchImages: build.query<
      DataWithPagination<CatImage>,
      SearchImagesQueryParams
    >({
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
        if (arg?.page! > 0 && arg?.breed_ids!.length > 0) {
          currentCacheData.items.push(...responseData.items);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: CatImage[], meta) => {
        return { items: response, totalPages: calculateTotalPages(meta) };
      },
    }),
    getBreeds: build.query<Breed[], void>({
      query: () => ({
        url: "breeds",
      }),
    }),
    getVotes: build.query<
      DataWithPagination<CatImage>,
      SearchImagesQueryParams
    >({
      query: ({ limit, page, sub_id }) => ({
        url: "votes",
        params: {
          limit,
          page,
          sub_id,
        },
      }),
      providesTags: (result) => ["VotesList"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData, { arg }) => {
        if (arg?.page! > 0) {
          currentCacheData.items.push(...responseData.items);
          return currentCacheData;
        }
        return responseData;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: Vote[]) => {
        const items = response.map((item: any) => ({
          ...item,
          id: item.image_id,
          url: item.image.url,
          vote: { value: item.value },
        }));
        return { items, totalPages: 0 };
      },
    }),
    voteForImage: build.mutation<PostResponse, VoteDTO>({
      query: (voteData: VoteDTO) => ({
        url: "votes",
        method: "POST",
        body: voteData,
      }),
      invalidatesTags: ["ImagesList", "VotesList"],
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
      transformResponse: (response: BasicImage[], meta) => {
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
