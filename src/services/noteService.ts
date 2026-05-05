import type { Note } from "../types/note"
import axios from "axios"

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (search: string): Promise<FetchNotesResponse> => {
    const config = {
    params: {
        search
    },
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    }
}

    const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', config)

    return response.data
}