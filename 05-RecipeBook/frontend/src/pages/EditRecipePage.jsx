import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import useAuthRedirect from "../hooks/useAuthRedirect";
import api from "../lib/axios";




export default function EditRecipePage() {
    useAuthRedirect();
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get(`/recipes/${id}`);

                setTitle(res.data.title);
                setDescription(res.data.description);
                setIngredients(res.data.ingredients.join("\n"));
                setInstructions(res.data.instructions);
            }
            catch(err) {
                alert("Load to fail data: ", err.message);
                navigate("/");
            }
            finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, [id, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await api.put(`/recipes/${id}`, {
                title,
                description,
                ingredients: ingredients.split("\n").filter(Boolean),
                instructions
            });

            navigate(`/recipes/${id}`);
        }
        catch(err) {
            alert("Failed to update recipe: ", err.message);
        }
        finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
        <section className="max-w-3xl mx-auto px-4 py-12">
            <p className="text-sm text-neutral-500">Loading recipe...</p>
        </section>
        );
    }

    return(
        <section className="max-w-3xl mx-auto px-4 py-12">

            <header className="mb-10">
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
                    Edit recipe
                </h1>
                <p className="mt-3 text-neutral-600 max-w-xl">
                    Make changes and save when you’re ready.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Recipe title
                    </label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        rows={8}
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div className="pt-4 flex gap-4">
                    <button 
                        type="submit"
                        disabled={saving}
                        className="bg-neutral-900 text-white px-6 py-2 text-sm hover:bg-neutral-800 transition disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-sm text-neutral-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}