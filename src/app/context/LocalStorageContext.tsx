/**
 * Sketched by chatGPT
 * prompt:
 * give me a react context that keeps its state synced with localStorage
 *
 * When dev was complete, refactored with prompt:
 * this context doesnt respect separation of concerns. refactor extracting logic to hooks
 */
"use client";
import {
  DailyPlan,
  FullRecipeIngredient,
  Ingredient,
  MealType,
  RecipeNote,
} from "@/types";
import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type LocalStorageContextType = {
  mealPlan: DailyPlan[];
  weekdays: string[];
  shoplist: FullRecipeIngredient[];
  ingredients: Ingredient[];
  notes: RecipeNote[];
  updateMealPlan: (data: UpdateMealData) => void;
  getIngredientCategories: () => string[];
  updateShopList: (data: FullRecipeIngredient[]) => void;
  updateNotes: (note: RecipeNote) => void;
};

type UpdateMealData = {
  selectedDayIndex: number;
  selectedMealIndex: MealType;
  recipeId: string | null;
};

export const LocalStorageContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const {
    mealPlan,
    weekdays,
    shoplist,
    ingredients,
    notes,
    getIngredientCategories,
    updateMealPlan,
    updateShopList,
    updateNotes,
  } = useLocalStorage();

  return (
    <LocalStorageContext.Provider
      value={{
        mealPlan,
        updateMealPlan,
        weekdays,
        getIngredientCategories,
        shoplist,
        updateShopList,
        ingredients,
        updateNotes,
        notes,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = (): LocalStorageContextType => {
  const ctx = useContext(LocalStorageContext);
  if (!ctx) {
    throw new Error(
      "useLocalStorageContext must be used within a LocalStorageProvider"
    );
  }
  return ctx;
};
