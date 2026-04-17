export const validateNote = async (data: any) => {
    const { type, content, checklist } = data;
    console.log("CONTENT 👉", JSON.stringify(content));

    if (!type) {
        return "Type is required";
    }

    if (type === "text") {
        if (!content) {
            return "Text note must have content";
        }
    }

    if (type === "checklist") {
        if (!checklist || checklist.length === 0) {
            return "Checklist note must have items";
        }
    }

    if (type === "hybrid") {
        if (!content && (!checklist || checklist.length === 0)) {
            return "Hybrid note must have content and checklist";
        }
    }

    return null;
}