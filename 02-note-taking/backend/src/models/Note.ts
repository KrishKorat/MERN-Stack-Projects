import mongoose, { Document, mongo } from "mongoose";


interface IChecklistItem {
    text: string,
    completed: boolean
}

interface INote extends Document {
    title: string;
    content?: string;
    checklist?: IChecklistItem[];
    type: "text" | "checklist" | "hybrid";
    category: string;
    importance: "low" | "medium" | "high";
    userId: mongoose.Types.ObjectId;
}


const checklistSchema = new mongoose.Schema<IChecklistItem>({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});


const noteSchema = new mongoose.Schema<INote>({
    title: { type: String, required: true },
    content: { type: String },

    checklist: [checklistSchema],

    type: {
        type: String,
        enum: ["text", "checklist", "hybrid"],
        default: "text"
    },

    category: { type: String, default: "general" },

    importance: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true}
);


export default mongoose.model<INote>("Note", noteSchema);