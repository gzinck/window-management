import React from "react";
import styled from "@emotion/styled";
import useWindowDimensions from "../hooks/useWindowDimensions";
import LeftPaneIcon from "./icons/LeftPaneIcon";
import RightPaneIcon from "./icons/RightPaneIcon";
import CenterPaneIcon from "./icons/CenterPaneIcon";
import XPaneIcon from "./icons/XPaneIcon";

const numSVGs = 4;

const Box = styled.div`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ isHidden, isDragging }) =>
    isHidden ? "#fff" : isDragging ? "#99f" : "#bbf"};
  transition: all 0.05s;
`;

const State = {
  FOLLOW: "FOLLOW",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
  TOP_LEFT: "TOP_LEFT",
  BOT_LEFT: "BOT_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOT_RIGHT: "BOT_RIGHT",
  FULL: "FULL",
  HIDDEN: "HIDDEN",
};

const crossUpStates = [
  State.TOP_LEFT,
  State.TOP,
  State.HIDDEN,
  State.TOP_RIGHT,
];
const crossDownStates = [
  State.BOT_LEFT,
  State.BOTTOM,
  State.HIDDEN,
  State.BOT_RIGHT,
];

function DraggableBox() {
  const ref = React.useRef(null);
  const { width, height } = useWindowDimensions();
  const [state, setState] = React.useState(State.TOP);
  const [isDragging, setIsDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let isDragging = false;
    let state = State.TOP;
    let pos = { x: 0, y: 0 };

    const getPos = e => {
      if (e.x && e.y) return { x: e.x, y: e.y };
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onStart = e => {
      if (!isDragging) {
        isDragging = true;
        setIsDragging(true);
        setState(State.FOLLOW);
      }
      pos = getPos(e);
      setPos(pos);
    };

    const hingeY = height / 2;
    const bounds = [
      [0, width / 4],
      [width / 4, width / 2],
      [width / 2, (3 * width) / 4],
      [(3 * width) / 4, width],
    ];

    const onMove = e => {
      if (!isDragging) return;
      const prvPos = pos;
      pos = getPos(e);
      setPos(pos);

      // If cross down
      if (prvPos.y < hingeY && pos.y >= hingeY) {
        bounds.forEach((b, i) => {
          if (b[0] <= pos.x && b[1] > pos.x) {
            state = crossDownStates[i];
            setState(state);
          }
        });
      }
      // If cross up
      if (prvPos.y >= hingeY && pos.y < hingeY) {
        bounds.forEach((b, i) => {
          if (b[0] <= pos.x && b[1] > pos.x) {
            state = crossUpStates[i];
            setState(state);
          }
        });
      }
    };

    const onEnd = e => {
      if (!isDragging) return;
      if ((e.x && e.y) || e.touches.length === 0) {
        isDragging = false;
        setIsDragging(false);
        // Keep the same state, or revert if nothing changed
        setState(state);
      }
    };

    const el = ref.current;
    el.addEventListener("touchstart", onStart);
    el.addEventListener("mousedown", onStart);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onEnd);
    window.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("mousedown", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [width, height]);

  let boxWidth = width / 2;
  switch (state) {
    case State.FOLLOW:
      boxWidth = width / 4;
      break;
    case State.TOP:
    case State.BOTTOM:
    case State.FULL:
    case State.HIDDEN:
      boxWidth = width;
      break;
    default:
  }

  let boxHeight = height / 2;
  switch (state) {
    case State.FOLLOW:
      boxHeight = height / 4;
      break;
    case State.FULL:
    case State.HIDDEN:
      boxHeight = height;
      break;
    default:
  }

  let x = pos.x - boxWidth / 2;
  let y = pos.y - boxHeight / 2;
  switch (state) {
    case State.FULL:
    case State.HIDDEN:
    case State.TOP:
    case State.TOP_LEFT:
      x = 0;
      y = 0;
      break;
    case State.TOP_RIGHT:
      x = width / 2;
      y = 0;
      break;
    case State.BOTTOM:
    case State.BOT_LEFT:
      x = 0;
      y = height / 2;
      break;
    case State.BOT_RIGHT:
      x = width / 2;
      y = height / 2;
      break;
    default:
  }

  return (
    <>
      <Box
        ref={ref}
        x={x}
        y={y}
        width={boxWidth}
        height={boxHeight}
        isDragging={isDragging}
        isHidden={state === State.HIDDEN}
      />
      <LeftPaneIcon
        opacity={
          !isDragging
            ? 0
            : state === State.BOT_LEFT || state === State.TOP_LEFT
            ? 1
            : 0.4
        }
        index={0}
        numSVGs={numSVGs}
      />
      <CenterPaneIcon
        opacity={
          !isDragging
            ? 0
            : state === State.TOP || state === State.BOTTOM
            ? 1
            : 0.4
        }
        index={1}
        numSVGs={numSVGs}
      />
      <XPaneIcon
        opacity={!isDragging ? 0 : state === State.HIDDEN ? 1 : 0.4}
        index={2}
        numSVGs={numSVGs}
      />
      <RightPaneIcon
        opacity={
          !isDragging
            ? 0
            : state === State.BOT_RIGHT || state === State.TOP_RIGHT
            ? 1
            : 0.4
        }
        index={3}
        numSVGs={numSVGs}
      />
    </>
  );
}

export default DraggableBox;