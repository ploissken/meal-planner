import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Multiselect from "./Multiselect";

describe("Multiselect", () => {
  const options = ["Option1", "Option2", "Option3"];
  const label = "Test Multiselect";

  it("renders selected values and calls handleChange on selection", async () => {
    const handleChange = jest.fn();

    render(
      <Multiselect
        id="test-multiselect"
        label={label}
        value={["Option1"]}
        handleChange={handleChange}
        options={options}
      />
    );

    // Initially selected chip is rendered
    expect(screen.getByText("Option1")).toBeInTheDocument();

    // Open the select dropdown
    const selectInput = screen.getByLabelText(label);
    fireEvent.click(selectInput);

    // The dropdown options should appear
    waitFor(async () => {
      const option2 = await screen.findByText("Option2");
      expect(option2).toBeInTheDocument();
      // Click on Option2 to select it
      fireEvent.click(option2);
      // handleChange should be called with the new selected value(s)
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
