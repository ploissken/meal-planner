import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import RecipeInstructionItem from "./RecipeInstructionItem";
import { InstructionStep } from "@/types";

jest.useFakeTimers();

describe("RecipeInstructionItem", () => {
  const instructionWithTimer: InstructionStep = {
    label: "Boil water",
    timeInMinutes: 2,
  };

  const instructionWithoutTimer: InstructionStep = {
    label: "Chop vegetables",
    timeInMinutes: 1,
  };

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders instruction label and time", () => {
    render(<RecipeInstructionItem instruction={instructionWithTimer} />);
    expect(screen.getByText("Boil water")).toBeInTheDocument();
    expect(screen.getByText("2 minutes")).toBeInTheDocument();
  });

  it("does not render timer button if timeInMinutes <= 1", () => {
    render(<RecipeInstructionItem instruction={instructionWithoutTimer} />);
    expect(screen.getByText("Chop vegetables")).toBeInTheDocument();
    expect(screen.queryByLabelText("start timer")).not.toBeInTheDocument();
  });

  it("starts timer on button click and disables button", async () => {
    render(<RecipeInstructionItem instruction={instructionWithTimer} />);
    const timerButton = screen.getByLabelText("start timer");

    // Initially button enabled and shows PlayArrow icon
    expect(timerButton).toBeEnabled();
    expect(timerButton.querySelector("svg")).toBeInTheDocument();

    // Click to start timer
    fireEvent.click(timerButton);

    // Button should now be disabled
    await waitFor(() => {
      expect(timerButton).toBeDisabled();
    });

    // Icon should switch to AccessAlarm while timer runs
    const alarmIcon = timerButton.querySelector("svg");
    expect(alarmIcon).toBeInTheDocument();

    // Fast-forward timer halfway
    act(() => {
      jest.advanceTimersByTime(60 * 1000); // 1 minute
    });

    // Progress should have updated, but timer still running (button disabled)
    expect(timerButton).toBeDisabled();

    // Fast-forward to end of timer
    act(() => {
      jest.advanceTimersByTime(60 * 1000); // remaining 1 minute
    });

    // Timer finished, button should be enabled again
    expect(timerButton).toBeEnabled();
  });

  it("clears interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(
      <RecipeInstructionItem instruction={instructionWithTimer} />
    );

    // Start the timer to set intervalRef.current
    const timerButton = screen.getByLabelText("start timer");
    fireEvent.click(timerButton);

    // Unmount the component (which should call clearInterval)
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore(); // cleanup spy after test
  });
});
