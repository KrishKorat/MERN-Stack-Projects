import axios from "axios";
import type { Note } from "../types/note";

const API_URL = "http://localhost:5000/api/notes";


export const getNotes = async (): Promise<Note[]> => {
    const res = await axios.get(API_URL);
    return res.data;
};


export const createNote = async (
    data: {
        title: string,
        content: string
}) => {
    const res = await axios.post(API_URL, data);
    return res.data;
};


export const updateNote = async (
    id: string,
    data: { title: string, content: string }
) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
}


export const deleteNote = async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
}