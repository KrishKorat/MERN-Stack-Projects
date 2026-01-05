import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import useAuthRedirect from "../hooks/useAuthRedirect";


export default function CreateRecipePage() {
    useAuthRedirect();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/recipes", {
                title,
                description,
                ingredients: ingredients.split("\n").filter(Boolean),
                instructions
            });

            navigate("/");
        }
        catch(err) {
            alert(err.response?.data?.message || "Failed to create recipe");
        }
        finally {
            setLoading(false);
        }
    }


    return(
        <section className="max-w-3xl mx-auto px-4 py-12">
            <header className="mb-10">
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
                    Create a recipe
                </h1>
                <p className="mt-3 text-neutral-600 max-w-xl">
                    Share a recipe you love. Be clear, thoughtful, and concise.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Recipe Title
                    </label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Classic Mushroom Risotto"
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Short description
                    </label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="A creamy Italian risotto perfect for slow evenings."
                        rows={3}
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900 resize-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Ingredients
                    </label>
                    <p className="mt-1 text-xs text-neutral-500">
                        One ingredient per line
                    </p>
                    <textarea 
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder={`Arborio rice\nMushrooms\nOnion\nVegetable stock\nParmesan`}
                        rows={6}
                        className="mt-3 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Instructions
                    </label>
                    <textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Heat stock. Sauté onions. Add rice. Slowly add stock..."
                        rows={8}
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-neutral-900 text-white px-6 py-2 text-sm hover:bg-neutral-800 transition disabled:opacity-60"
                    >
                        {loading ? "Publishing..." : "Publish recipe"}
                    </button>
                </div>
            </form>
        </section>
    );
}