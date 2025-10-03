import React from "react";
import { render, screen } from "@testing-library/react";
import TopBar from "./TopBar";
import { APP_TITLE } from "@/consts";

jest.mock("./ResponsiveMenu", () => ({
  __esModule: true,
  default: () =>
    React.createElement("div", { "data-testid": "responsive-menu" }),
}));

describe("TopBar", () => {
  it("renders the app title", () => {
    render(<TopBar />);
    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
  });

  it("renders the ResponsiveMenu component", () => {
    render(<TopBar />);
    expect(screen.getByTestId("responsive-menu")).toBeInTheDocument();
  });
});
