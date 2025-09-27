/**
 * Sketched by chatGPT
 * prompt:
 * give me a react context that keeps its state synced with localStorage
 */
"use client";
import { DailyPlan, MealType } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type MealPlannerContextType = {
  mealPlan: DailyPlan[];
  updateMealPlan: (data: UpdateMealData) => void;
  weekdays: string[];
};

type UpdateMealData = {
  selectedDayIndex: number;
  selectedMealIndex: MealType;
  recipeId: string;
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

export const MealPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [mealPlan, setMealPlan] = useState<DailyPlan[]>(defaultValue);
  const weekdays = [...Array(7).keys()].map((day) =>
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(Date.UTC(2021, 0, day + 4)) // ensures Sunday = 0
    )
  );

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
  };

  useEffect(() => {
    const saved = localStorage.getItem(MEAL_PLANNER_KEY);
    if (saved) {
      // if value exists, load from localStorage to context
      try {
        setMealPlan(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse localStorage settings", e);
      }
    } else {
      // if not, set default value
      localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(mealPlan));
    }
  }, []);

  return (
    <MealPlannerContext.Provider value={{ mealPlan, updateMealPlan, weekdays }}>
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
