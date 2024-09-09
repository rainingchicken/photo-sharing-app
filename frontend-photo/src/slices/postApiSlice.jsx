import { apiSlice } from "./apiSlice.jsx";

export const PostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.mutation({
      query: () => ({
        url: `/api/posts`,
        method: "GET",
      }),
    }),
    getAPost: builder.mutation({
      query: (data) => ({
        url: `/api/posts/${data}`,
        method: "GET",
        body: data,
      }),
    }),
    createAPost: builder.mutation({
      query: () => ({
        url: `/api/posts`,
        method: "POST",
        body: data,
      }),
    }),
    editAPost: builder.mutation({
      query: (data) => ({
        url: `/api/posts/${data}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAPost: builder.mutation({
      query: (data) => ({
        url: `/api/posts/${data}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPostsMutation,
  useGetAPostMutation,
  useCreateAPostMutation,
  useEditAPostMutation,
  useDeleteAPostMutation,
} = PostApiSlice;
