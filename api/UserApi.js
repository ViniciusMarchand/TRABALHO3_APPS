import { GetFetch, PostFetch } from "./ApiBase"

export const createUser = async (userData) => {
    return await PostFetch("/users", userData);
}

export const loginUser = async (credentials) => {
    return await PostFetch("/login", credentials);
}

export const getUsers = async (page, limit) => {
    return await GetFetch("/users?page=" + page + "&limit=" + limit);
}