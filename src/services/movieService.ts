import axios from "axios";
import type { AxiosResponse } from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TOKEN) {
  console.error("❌ TMDB token is missing! Add VITE_TMDB_TOKEN to your .env file.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
  try {
    const response: AxiosResponse<MoviesResponse> = await axiosInstance.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}