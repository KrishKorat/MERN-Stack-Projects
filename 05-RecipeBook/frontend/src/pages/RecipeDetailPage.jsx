import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";




export default function RecipeDetailPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get(`/recipes/${id}`);
                setRecipe(res.data);
            }
            catch(err) {
                console.error("Failed to load recipe: ", err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this?")) return;

        try {
            await api.delete(`/recipes/${id}`);
            navigate("/");
        }
        catch(err) {
            alert("Failed to delete recipe");
        }
    };

    if (loading) {
        return(
            <section className="max-w-3xl mx-auto px-4 py-12">
                <p className="text-sm text-neutral-500">Loading recipe...</p>
            </section>
        )
    }

    if (!recipe) {
        return (
            <section className="max-w-3xl mx-auto px-4 py-12">
                <p className="text-sm text-neutral-500">Recipe not found.</p>
            </section>
        );
    }

    const isOwner = user && recipe.createdBy && recipe.createdBy._id === user.id;
    
    return(
        <article className="max-w-3xl mx-auto px-4 py-12">
            <header className="mb-10">
                <p className="text-xs uppercase tracking-wider text-neutral-500">
                    By {recipe.createdBy.name}
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
                    {recipe.title}
                </h1>

                <p className="mt-4 text-neutral-600">
                    {recipe.description}
                </p>

                {isOwner && (
                    <div className="mt-6 flex gap-4 text-sm">
                        <Link
                            to={`/recipes/${id}/edit`}
                            className="hover:underline text-neutral-900"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="hover:underline text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </header>

            <hr className="border-neutral-200" />

            <section className="my-10">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">
                    Ingredients
                </h2>

                <ul className="space-y-2 text-neutral-700 list-disc list-inside">
                    {recipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-lg font-medium text-neutral-900 mb-4">
                    Instructions
                </h2>

                <p className="whitespace-pre-line text-neutral-700 leading-relaxed">
                    {recipe.instructions}
                </p>
            </section>
        </article>
    );
}