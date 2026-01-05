import { useState, useEffect } from "react";
import api from "../lib/axios";
import RecipeCard from "../components/RecipeCard";



export default function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get("/recipes");
                setRecipes(res.data);
            }
            catch(err) {
                console.error("Failed to load recipe: ", err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, []);

    return(
        <section className="max-w-6xl mx-auto px-4 py-12">

            <header className="mb-14">
                <span className="text-xs uppercase tracking-widest text-neutral-500">
                    Community recipes
                </span>
                <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
                    Recipes worth sharing.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-neutral-600 leading-relaxed">
                    Thoughtfully written recipes shared by home cooks and food lovers.
                    Browse, learn, and save ideas you’ll want to come back to.
                </p>
            </header>


            {loading && (
                <p className="text-sm text-neutral-500">
                    Loading...
                </p>
            )}

            {!loading && recipes.length === 0 && (
                <p className="text-sm text-neutral-500">
                    No recipes yet. Be the first to share one.
                </p>
            )}

            {!loading && recipes.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            )}

        </section>
    );
}