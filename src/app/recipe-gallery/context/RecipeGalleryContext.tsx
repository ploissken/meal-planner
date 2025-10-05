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
import { useRecipeFilters } from "@/app/hooks/useRecipeFilters";
export type RecipeGalleryContextType = {
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
  getRecipeById: (id: string | null) => Recipe | undefined;
};

export const RecipeGalleryContext = createContext<
  RecipeGalleryContextType | undefined
>(undefined);

export function RecipeGalleryProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);

  const {
    filteredRecipes,
    selectedCuisines,
    setSelectedCuisines,
    selectedRestrictions,
    setSelectedRestrictions,
    maxCookingTime,
    maxCookingTimeFromRecipe,
    setMaxCookingTime,
    searchInput,
    setSearchInput,
    resetFilters,
    cuisines,
    restrictions,
  } = useRecipeFilters(recipes);

  const getRecipeById = (id: string | null) => {
    if (!id) return;
    return recipes.find((r) => r.id === id);
  };

  useEffect(() => {
    setLoading(true);
    mockFetch<Recipe[]>(mockRecipes as Recipe[], 1500).then((data) => {
      const sorted = data.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
      setRecipes(sorted);
      setLoading(false);
    });
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
        getRecipeById,
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
