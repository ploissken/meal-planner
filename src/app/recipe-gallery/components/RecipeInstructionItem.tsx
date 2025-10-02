import { InstructionStep } from "@/types";
import { PlayArrow, AccessAlarm } from "@mui/icons-material";
import {
  ListItem,
  Box,
  Fab,
  CircularProgress,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

export default function RecipeInstructionItem({
  instruction,
}: {
  instruction: InstructionStep;
}) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const displayTimer = (instruction?.timeInMinutes || 0) > 1;
  const timerTooltip = `Setup a ${instruction?.timeInMinutes} minutes timer`;

  const handleTimerStart = (item: InstructionStep) => {
    const timeInSeconds = item.timeInMinutes! * 60;
    const percentagePerSecond = 100 / timeInSeconds;
    let elapsedSeconds = 0;

    intervalRef.current = setInterval(() => {
      elapsedSeconds += 1;

      setProgress((prev) => prev + percentagePerSecond);

      if (elapsedSeconds >= timeInSeconds) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // clear on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <ListItem
      key={instruction.label}
      disablePadding
      secondaryAction={
        displayTimer && (
          <Box
            sx={{
              m: 1,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Tooltip title={timerTooltip}>
              <Fab
                size="small"
                aria-label="start timer"
                color="primary"
                onClick={() => handleTimerStart(instruction)}
                disabled={!!intervalRef.current}
              >
                {!!intervalRef.current ? <AccessAlarm /> : <PlayArrow />}
              </Fab>
            </Tooltip>
            {!!intervalRef.current && (
              <CircularProgress
                variant="determinate"
                size={52}
                value={progress}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        )
      }
    >
      <ListItemText
        primary={instruction.label}
        secondary={displayTimer && `${instruction.timeInMinutes} minutes`}
      />
    </ListItem>
  );
}
