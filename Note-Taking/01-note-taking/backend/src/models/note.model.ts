import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
}


const noteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

export const Note = mongoose.model<INote>("Note", noteSchema);