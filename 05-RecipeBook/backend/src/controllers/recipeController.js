import Recipe from "../models/Recipe.js";



export const getAllRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });

        res.json(recipes);
    }
    catch(err) {
        res.status(500).json({ message: `Server error, ${err.message}` });
    }
}



export const getSingleRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("createdBy", "name"); 
        
        if (!recipe) {
            return res.status(404).json({ message: "Recipe does not exist" });
        }

        res.json(recipe);
    }
    catch(err) {
        res.status(500).json({ message: `Server error, ${err.message}` });
    }
}



export const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions } = req.body;

        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ message: "All feilds are required" });
        }

        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            instructions,
            createdBy: req.user._id,
        });

        res.status(201).json(recipe);
    }
    catch(err) {
        res.status(500).json({ message: `Server error, ${err.message}` });
    }
}



export const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(400).json({ message: "Recipe cannot found" });
        }

        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized" });
        }

        const { title, description, ingredients, instructions } = req.body;

        recipe.title = title || recipe.title;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;

        const updateRecipe = await recipe.save();
        res.json(updateRecipe);
    }
    catch(err) {
        res.status(500).json({ message: `Server error, ${err.message}` });
    }
}



export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized" });
        }

        await recipe.deleteOne();
        res.json({ message: "Recipe deleted successfully" });
    }
    catch(err) {
        res.status(500).json({ message: `Server error, ${err.message}` });
    }
}