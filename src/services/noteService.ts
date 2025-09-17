import axios from "axios";
import { Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const FetchNotes = async (
  search: string,
  perPage: number,
  page: number
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/docs",
    {
      params: {
        search: search,
        perPage,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return response.data;
};
