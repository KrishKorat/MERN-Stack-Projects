import express from "express";
import protect from "../middleware/authMiddleware.js";

import { 
    getAllRecipe,
    getSingleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipeController.js";


const router = express.Router();

router.get("/", getAllRecipe);
router.get("/:id", getSingleRecipe);

router.post("/", protect, createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);


export default router;