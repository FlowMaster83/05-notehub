import type { Note } from "../types/note"
import axios from "axios"

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    }
})

// get
export const fetchNotes = async (
    search: string = '', 
    page: number = 1, 
    perPage: number = 12
): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>('/notes', {
        params: {search, page, perPage}
    });
    return response.data
};

// post
export const createNote = async (newNoteData: {title: string, content: string, tag: string}): Promise<Note> => {
    const response = await api.post<Note>('/notes', newNoteData);
    return response.data
}

// delete
export const deleteNote = async (id: string):Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data
}