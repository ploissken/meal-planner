"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import mockRecipes from "../../../mock-data/recipes.json";
import { mockFetch } from "@/mockFetch";
import { Recipe } from "@/types";

type RecipeGalleryContextType = {
  recipes: Recipe[];
  loading: boolean;
  cuisines: string[];
  restrictions: string[];
  selectedCuisines: string[];
  setSelectedCuisines: Dispatch<SetStateAction<string[]>>;
  maxCookingTime: number;
  maxCookingTimeFromRecipe: number;
  setMaxCookingTime: Dispatch<SetStateAction<number>>;
  selectedRestrictions: string[];
  setSelectedRestrictions: Dispatch<SetStateAction<string[]>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  resetFilters: () => void;
};

const RecipeGalleryContext = createContext<
  RecipeGalleryContextType | undefined
>(undefined);

export function RecipeGalleryProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<Recipe>>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxCookingTime, setMaxCookingTime] = useState(0);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const maxCookingTimeFromRecipe = Math.max(
    ...recipes.map(({ cookingTimeInMin }) => cookingTimeInMin)
  );

  const cuisines = [...new Set(recipes.map(({ cuisine }) => cuisine))];
  const restrictions = [
    ...new Set(recipes.flatMap(({ dietaryTags }) => dietaryTags)),
  ];

  const updateFilteredRecipes = () => {
    let newRecipesSet = [...recipes];

    if (selectedCuisines.length > 0) {
      newRecipesSet = newRecipesSet.filter(({ cuisine }) =>
        selectedCuisines.includes(cuisine)
      );
    }

    if (selectedRestrictions.length > 0) {
      newRecipesSet = newRecipesSet.filter(({ dietaryTags }) =>
        dietaryTags.some((restriction) =>
          selectedRestrictions.includes(restriction)
        )
      );
    }

    if (maxCookingTime > 0) {
      newRecipesSet = newRecipesSet.filter(
        ({ cookingTimeInMin }) => cookingTimeInMin <= maxCookingTime
      );
    }

    if (searchInput) {
      newRecipesSet = newRecipesSet.filter((recipe) => {
        const normalizedInput = searchInput.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(normalizedInput);
        const ingredientsMatch = recipe.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(normalizedInput)
        );
        return titleMatch || ingredientsMatch;
      });
    }

    setFilteredRecipes(newRecipesSet);
  };

  const resetFilters = () => {
    setMaxCookingTime(0);
    setSelectedCuisines([]);
    setSelectedRestrictions([]);
    setSearchInput("");
  };

  // todo: avoid this use effect
  useEffect(() => {
    updateFilteredRecipes();
  }, [searchInput, maxCookingTime, selectedRestrictions, selectedCuisines]);

  useEffect(() => {
    setLoading(true);
    mockFetch<Array<Recipe>>(mockRecipes as Array<Recipe>, 1500).then(
      (data) => {
        setRecipes(
          data.sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
          )
        );
        setFilteredRecipes(data);
        setLoading(false);
      }
    );
  }, []);

  return (
    <RecipeGalleryContext.Provider
      value={{
        recipes: filteredRecipes,
        loading,
        cuisines,
        restrictions,
        setSearchInput,
        selectedCuisines,
        setSelectedCuisines,
        maxCookingTime,
        maxCookingTimeFromRecipe,
        setMaxCookingTime,
        selectedRestrictions,
        setSelectedRestrictions,
        resetFilters,
        searchInput,
      }}
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
