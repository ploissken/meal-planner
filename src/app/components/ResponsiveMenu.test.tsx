import { render, screen, fireEvent } from "@testing-library/react";
import ResponsiveMenu from "./ResponsiveMenu";
import { usePathname, useRouter } from "next/navigation";

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("ResponsiveMenu", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("renders with correct selected tab and navigates on tab click", () => {
    (usePathname as jest.Mock).mockReturnValue("/meal-planner");

    render(<ResponsiveMenu />);

    // Check selected tab is correct
    const selectedTab = screen.getByRole("tab", { selected: true });
    expect(selectedTab).toHaveTextContent("Meal Planner");

    // Simulate tab click
    const recipeTab = screen.getByRole("tab", { name: "Recipe Gallery" });
    fireEvent.click(recipeTab);

    // Should navigate to "recipe-gallery"
    expect(pushMock).toHaveBeenCalledWith("recipe-gallery");
  });

  it("opens drawer when menu icon is clicked", () => {
    (usePathname as jest.Mock).mockReturnValue("/recipe-gallery");

    render(<ResponsiveMenu />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    // Drawer becomes visible — presence of vertical tabs indicates it's open
    const drawerTab = screen.getByRole("tab", { name: "Meal Planner" });
    expect(drawerTab).toBeInTheDocument();
  });
});
