import axios from "axios";
import { CreateNoteRequest, Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface Options {
  params: {
    search: string;
    page: number;
    perPage: number;
  };
  headers: {
    Authorization: string;
  };
}

const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const FetchNotes = async (
  search: string,
  page: number
): Promise<FetchNotesResponse> => {
  const options: Options = {
    params: {
      search: search,
      page: page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  const response = await axios.get<FetchNotesResponse>("/notes", options);
  return response.data;
};

export const CreateNote = async (data: CreateNoteRequest) => {
  const response = await axios.post<CreateNoteRequest>("/notes", data);
  return response.data;
};

export const DeleteNote = async (id: string) => {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};
