import { Link } from "react-router-dom";



export default function RecipeCard({ recipe }) {
    return(
        <article className="border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition">

            <p className="text-xs uppercase tracking-wider text-neutral-500">
                By {recipe.createdBy?.name}
            </p>

            <h3 className="mt-3 text-lg font-medium text-neutral-900 leading-snug">
                {recipe.title}
            </h3>

            <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                {recipe.description}
            </p>

            <Link
                to={`/recipes/${recipe._id}`}
                className="inline-block mt-4 text-sm text-neutral-900 underline underline-offset-4"
            >
                Read recipe →
            </Link>
        </article>
    );
}