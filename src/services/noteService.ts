import type { Note } from "../types/note"
import axios from "axios"

export interface notes {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (search: string) => {
    const config = {
    params: {
        search
    },
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    }
}

    const response = await axios.get('https://notehub-public.goit.study/api/notes', config)

    console.log(response.data.notes);
    return response.data.notes
}