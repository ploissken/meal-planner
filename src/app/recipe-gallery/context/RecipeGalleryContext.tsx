"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import mockRecipes from "../../../mock-data/recipes.json";
import { mockFetch } from "@/mockFetch";
import { Recipe } from "@/types";

type RecipeGalleryContextType = {
  recipes: Recipe[];
  loading: boolean;
  applyTextSearch: (input: string) => void;
};

const RecipeGalleryContext = createContext<
  RecipeGalleryContextType | undefined
>(undefined);

export function RecipeGalleryProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockFetch<Array<Recipe>>(mockRecipes as Array<Recipe>, 1500).then(
      (data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      }
    );
  }, []);

  const applyTextSearch = (input: string) => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        const normalizedInput = input.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(normalizedInput);
        const ingredientsMatch = recipe.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(normalizedInput)
        );
        return titleMatch || ingredientsMatch;
      })
    );
  };

  return (
    <RecipeGalleryContext.Provider
      value={{ recipes: filteredRecipes, loading, applyTextSearch }}
    >
      {children}
    </RecipeGalleryContext.Provider>
  );
}

export function useRecipeGalleryContext() {
  const context = useContext(RecipeGalleryContext);
  if (!context)
    throw new Error(
      "useRecipeGallery must be used within an RecipeGalleryContext"
    );
  return context;
}
