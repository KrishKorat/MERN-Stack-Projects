import axios from "axios";
import type { Note } from "../types/note";

const API_URL = "http://localhost:5000/api/notes";

export const getNotes = async (): Promise<Note[]> => {
    const res = await axios.get(API_URL);
    return res.data;
}