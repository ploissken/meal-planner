/**
 * Sketched by chatGPT
 * prompt:
 * give me a react context that keeps its state synced with localStorage
 */
"use client";
import {
  DailyPlan,
  FullRecipeIngredient,
  Ingredient,
  MealType,
  Recipe,
  RecipeNote,
} from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import mockIngredients from "../../../mock-data/ingredients.json";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";

type MealPlannerContextType = {
  mealPlan: DailyPlan[];
  updateMealPlan: (data: UpdateMealData) => void;
  weekdays: string[];
  getIngredientCategories: () => string[];
  shoplist: FullRecipeIngredient[];
  updateShopList: (data: FullRecipeIngredient[]) => void;
  ingredients: Ingredient[];
  notes: RecipeNote[];
  updateNotes: (note: RecipeNote) => void;
};

type UpdateMealData = {
  selectedDayIndex: number;
  selectedMealIndex: MealType;
  recipeId: string | null;
};

const defaultValue: DailyPlan[] = [...Array(7)].map(() => ({
  breakfast: null,
  lunch: null,
  dinner: null,
}));

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(
  undefined
);

const MEAL_PLANNER_KEY = "meal_planner";
const SHOPPING_LIST_KEY = "shopping_list";
const RECIPE_NOTES_KEY = "recipe_notes";

export const MealPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [mealPlan, setMealPlan] = useState<DailyPlan[]>(defaultValue);
  const [shoplist, setShoplist] = useState<FullRecipeIngredient[]>([]);
  const [notes, setNotes] = useState<RecipeNote[]>([]);

  const { recipes } = useRecipeGalleryContext();

  const weekdays = [...Array(7).keys()].map((day) =>
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(Date.UTC(2021, 0, day + 4)) // ensures Sunday = 0
    )
  );

  const getRequiredIngredientsForPlan = (
    newDailyPlan?: DailyPlan[]
  ): FullRecipeIngredient[] => {
    const weekMeals: Recipe[] = [];
    const plan = newDailyPlan || mealPlan;
    plan.forEach((weekDay) => {
      const breakfast = recipes.find((r) => r.id === weekDay.breakfast);
      const lunch = recipes.find((r) => r.id === weekDay.lunch);
      const dinner = recipes.find((r) => r.id === weekDay.dinner);
      if (breakfast) {
        weekMeals.push(breakfast);
      }
      if (lunch) {
        weekMeals.push(lunch);
      }
      if (dinner) {
        weekMeals.push(dinner);
      }
    });

    return weekMeals.flatMap((meal) => {
      return meal.ingredients.map((recipeIngredient) => {
        const ingredient = mockIngredients.find(
          (ing) => ing.id === recipeIngredient.id
        );
        if (!ingredient) {
          throw new Error("ingredient not found" + recipeIngredient.id);
        }
        return { ...recipeIngredient, ...ingredient, recipeName: meal.title };
      });
    });
  };

  const getIngredientCategories = () => {
    return [
      ...new Set(mockIngredients.map((ingredient) => ingredient.category)),
    ];
  };

  const updateMealPlan = ({
    selectedDayIndex,
    selectedMealIndex,
    recipeId,
  }: UpdateMealData) => {
    const newPlan = mealPlan.map((dayPlan, index) =>
      index === selectedDayIndex
        ? { ...dayPlan, [selectedMealIndex]: recipeId }
        : dayPlan
    );

    setMealPlan(newPlan);
    localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(newPlan));

    const newShoppingList = getRequiredIngredientsForPlan(newPlan);
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newShoppingList));
    setShoplist(newShoppingList);
  };

  const updateShopList = (newList: FullRecipeIngredient[]) => {
    setShoplist(newList);
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newList));
  };

  const updateNotes = (newNote: RecipeNote) => {
    const newNotes = notes.filter((note) => note.recipeId !== newNote.recipeId);
    newNotes.push(newNote);
    setNotes(newNotes);
    localStorage.setItem(RECIPE_NOTES_KEY, JSON.stringify(newNotes));
  };

  useEffect(() => {
    const savedWeekPlan = localStorage.getItem(MEAL_PLANNER_KEY);
    const savedShoppingList = localStorage.getItem(SHOPPING_LIST_KEY);
    const savedNotes = localStorage.getItem(RECIPE_NOTES_KEY);

    if (savedWeekPlan) {
      // if value exists, load from localStorage to context
      try {
        setMealPlan(JSON.parse(savedWeekPlan));
      } catch (e) {
        console.warn("Failed to parse MEAL_PLANNER_KEY localStorage", e);
      }
    } else {
      // if not, set default value
      localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(mealPlan));
    }

    if (savedShoppingList) {
      // if value exists, load from localStorage to context
      try {
        setShoplist(JSON.parse(savedShoppingList));
      } catch (e) {
        console.warn("Failed to parse SHOPPING_LIST_KEY localStorage", e);
      }
    } else {
      // if not, set default value
      localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify({}));
    }

    if (savedNotes) {
      // if value exists, load from localStorage to context
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.warn("Failed to parse RECIPE_NOTES_KEY localStorage", e);
      }
    } else {
      // if not, set default value
      localStorage.setItem(RECIPE_NOTES_KEY, JSON.stringify([]));
    }
  }, []);

  return (
    <MealPlannerContext.Provider
      value={{
        mealPlan,
        updateMealPlan,
        weekdays,
        getIngredientCategories,
        shoplist,
        updateShopList,
        ingredients: mockIngredients as Ingredient[],
        updateNotes,
        notes,
      }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
};

export const useMealPlannerContext = (): MealPlannerContextType => {
  const ctx = useContext(MealPlannerContext);
  if (!ctx) {
    throw new Error(
      "useMealPlannerContext must be used within a MealPlannerProvider"
    );
  }
  return ctx;
};
