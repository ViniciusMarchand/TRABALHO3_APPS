import { Axios } from "./Axios"



export const PostFetch = async (url, params) => {
  return Axios
  .post(url, params)
    .then((data) => data)
    .catch((error) => {
      console.log({
        msg: "Error in PostFetch --> " + url,
        error,
        params
      })
      throw error
    })
}

export const GetFetch = async (url, params) => {
  try {
    const data = await Axios.get(url, {params})
    return data.data
  } catch (error) {
    throw error
  }
}

export const PutFetch = async (url, params) => {
  try {
    const data = await Axios.put(url, params)
    return data.data
  } catch (error) {
    throw error
  }
}

export const DeleteFetch = async (url, params) => {
  try {
    const data = await Axios.delete(url, params)
    return data.data
  } catch (error) {
    throw error
  }
}

export const PostFetchMultiform = async (url, params) => {
  return Axios
    .post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => data)
    .catch((error) => {
      console.log({
        msg: "Error in PostFetchMultiform --> " + url,
        error,
        params
      })
      throw error
    })
}