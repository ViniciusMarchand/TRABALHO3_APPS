import { DeleteFetch, GetFetch, PostFetchMultiform } from "./ApiBase";

export const fetchPosts = async () => {
    return await GetFetch("/posts");
}

export const getPosts = async (page, limit) => {
    return await GetFetch(`/posts?page=${page}&limit=${limit}`);
}

export const createPost = async (postData) => {
    return await PostFetchMultiform("/posts", postData);
}

export const deletePost = async (postId) => {
    return await DeleteFetch(`/posts/${postId}`, "DELETE");
}