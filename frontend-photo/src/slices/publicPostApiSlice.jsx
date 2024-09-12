import { apiSlice } from "./apiSlice.jsx";

export const publicPostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPublicPosts: builder.mutation({
      query: (data) => ({
        url: `/api/allposts?${data}`,
        method: "GET",
      }),
    }),
    getAPublicPost: builder.mutation({
      query: (data) => ({
        url: `/api/allposts/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPublicPostsMutation,
  useGetAPublicPostMutation,
} = publicPostApiSlice;
