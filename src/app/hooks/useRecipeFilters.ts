import { useMemo, useState } from "react";
import { Recipe } from "@/types";

export function useRecipeFilters(recipes: Recipe[]) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const [maxCookingTime, setMaxCookingTime] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    if (selectedCuisines.length) {
      result = result.filter((recipe) =>
        selectedCuisines.includes(recipe.cuisine)
      );
    }

    if (selectedRestrictions.length) {
      result = result.filter((recipe) =>
        recipe.dietaryTags.some((tag) => selectedRestrictions.includes(tag))
      );
    }

    if (maxCookingTime > 0) {
      result = result.filter(
        (recipe) => recipe.cookingTimeInMin <= maxCookingTime
      );
    }

    if (searchInput.trim()) {
      const query = searchInput.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(query)
          )
      );
    }

    return result;
  }, [
    recipes,
    selectedCuisines,
    selectedRestrictions,
    maxCookingTime,
    searchInput,
  ]);

  const resetFilters = () => {
    setSelectedCuisines([]);
    setSelectedRestrictions([]);
    setMaxCookingTime(0);
    setSearchInput("");
  };

  const maxCookingTimeFromRecipe = useMemo(() => {
    return recipes.length
      ? Math.max(...recipes.map((r) => r.cookingTimeInMin))
      : 0;
  }, [recipes]);

  const cuisines = useMemo(() => {
    return Array.from(new Set(recipes.map((r) => r.cuisine)));
  }, [recipes]);

  const restrictions = useMemo(() => {
    return Array.from(new Set(recipes.flatMap((r) => r.dietaryTags)));
  }, [recipes]);

  return {
    filteredRecipes,
    selectedCuisines,
    setSelectedCuisines,
    selectedRestrictions,
    setSelectedRestrictions,
    maxCookingTime,
    setMaxCookingTime,
    maxCookingTimeFromRecipe,
    searchInput,
    setSearchInput,
    resetFilters,
    cuisines,
    restrictions,
  };
}
