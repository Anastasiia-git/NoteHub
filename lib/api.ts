import axios from "axios";
import type { Note, CreateNoteDto } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const getToken = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string | undefined;
  if (!token)
    throw new Error("Missing env variable: NEXT_PUBLIC_NOTEHUB_TOKEN");
  return token;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>("/notes", {
    params: {
      search: params.search,
      page: params.page ?? 1,
      perPage: params.perPage ?? 10,
      tag: params.tag,
    },
  });
  return response.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};
