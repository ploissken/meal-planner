import { useEffect, useState, useMemo } from "react";
import {
  DailyPlan,
  FullRecipeIngredient,
  Ingredient,
  MealType,
  Recipe,
  RecipeNote,
} from "@/types";
import mockIngredients from "@/mock-data/ingredients.json";
import {
  MEAL_PLANNER_KEY,
  SHOPPING_LIST_KEY,
  RECIPE_NOTES_KEY,
} from "@/consts";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";

type UpdateMealData = {
  selectedDayIndex: number;
  selectedMealIndex: MealType;
  recipeId: string | null;
};

const defaultValue: DailyPlan[] = Array.from({ length: 7 }, () => ({
  breakfast: null,
  lunch: null,
  dinner: null,
}));

export function useLocalStorage() {
  const [mealPlan, setMealPlan] = useState<DailyPlan[]>(defaultValue);
  const [shoplist, setShoplist] = useState<FullRecipeIngredient[]>([]);
  const [notes, setNotes] = useState<RecipeNote[]>([]);
  const { recipes } = useRecipeGalleryContext();

  const weekdays = useMemo(
    () =>
      [...Array(7).keys()].map((day) =>
        new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
          new Date(Date.UTC(2021, 0, day + 4))
        )
      ),
    []
  );

  const getIngredientCategories = () =>
    Array.from(
      new Set(mockIngredients.map((ingredient) => ingredient.category))
    );

  const getRequiredIngredientsForPlan = (
    plan = mealPlan
  ): FullRecipeIngredient[] => {
    const weekMeals: Recipe[] = [];
    plan.forEach((weekDay) => {
      const breakfast = recipes.find((r) => r.id === weekDay.breakfast);
      const lunch = recipes.find((r) => r.id === weekDay.lunch);
      const dinner = recipes.find((r) => r.id === weekDay.dinner);
      if (breakfast) weekMeals.push(breakfast);
      if (lunch) weekMeals.push(lunch);
      if (dinner) weekMeals.push(dinner);
    });

    // todo: this is technically misplaced, shoud be a helper elsewhere
    return weekMeals.flatMap((meal) => {
      return meal.ingredients.map((recipeIngredient) => {
        const ingredient = mockIngredients.find(
          (ing) => ing.id === recipeIngredient.id
        );
        if (!ingredient) {
          throw new Error("ingredient not found " + recipeIngredient.id);
        }
        return { ...recipeIngredient, ...ingredient, recipeName: meal.title };
      });
    });
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
    setShoplist(newShoppingList);
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newShoppingList));
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

  // Load initial data from localStorage
  useEffect(() => {
    const savedWeekPlan = localStorage.getItem(MEAL_PLANNER_KEY);
    const savedShoppingList = localStorage.getItem(SHOPPING_LIST_KEY);
    const savedNotes = localStorage.getItem(RECIPE_NOTES_KEY);

    if (savedWeekPlan) {
      setMealPlan(JSON.parse(savedWeekPlan));
    } else {
      localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(mealPlan));
    }

    if (savedShoppingList) {
      setShoplist(JSON.parse(savedShoppingList));
    } else {
      localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify([]));
    }

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      localStorage.setItem(RECIPE_NOTES_KEY, JSON.stringify([]));
    }
  }, []);

  return {
    mealPlan,
    shoplist,
    notes,
    weekdays,
    ingredients: mockIngredients as Ingredient[],
    getIngredientCategories,
    updateMealPlan,
    updateShopList,
    updateNotes,
  };
}
