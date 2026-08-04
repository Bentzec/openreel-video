import React from "react";
import type { HandlePosition } from "./types";

/**
 * The eight resize grips drawn around a selected clip in the preview.
 *
 * Extracted because the media, text and shape overlays each carried their own
 * copy of this markup; they only ever differed by accent colour, so keeping
 * three copies meant any sizing tweak had to be repeated three times and drift
 * was inevitable.
 *
 * Sizing note: the grips are deliberately small (10px, hairline border). They
 * sit on top of the frame the user is judging, and a subtitle's box is only a
 * few dozen pixels tall — grips heavy enough to read as chrome end up covering
 * the very content being positioned.
 *
 * The pointer target is intentionally the visible square, with no invisible
 * padding around it. Padding the targets out to a comfier size makes the eight
 * regions overlap on a short box (a one-line subtitle is barely taller than two
 * stacked grips), and then the last grip in DOM order silently swallows clicks
 * meant for its neighbours.
 */

const GRIP_BASE =
  "absolute rounded-[2px] bg-white pointer-events-auto transition-colors";

/** Corner grips are square; edge grips stretch along the edge they control. */
const GRIP_GEOMETRY: Record<HandlePosition, string> = {
  nw: "-left-[5px] -top-[5px] w-2.5 h-2.5 cursor-nw-resize",
  ne: "-right-[5px] -top-[5px] w-2.5 h-2.5 cursor-ne-resize",
  sw: "-left-[5px] -bottom-[5px] w-2.5 h-2.5 cursor-sw-resize",
  se: "-right-[5px] -bottom-[5px] w-2.5 h-2.5 cursor-se-resize",
  n: "left-1/2 -translate-x-1/2 -top-[5px] w-4 h-2.5 cursor-n-resize",
  s: "left-1/2 -translate-x-1/2 -bottom-[5px] w-4 h-2.5 cursor-s-resize",
  w: "top-1/2 -translate-y-1/2 -left-[5px] w-2.5 h-4 cursor-w-resize",
  e: "top-1/2 -translate-y-1/2 -right-[5px] w-2.5 h-4 cursor-e-resize",
};

const HANDLE_ORDER: HandlePosition[] = [
  "nw",
  "ne",
  "sw",
  "se",
  "n",
  "s",
  "w",
  "e",
];

export interface SelectionHandlesProps {
  /** Tailwind border colour utility, e.g. "border-cyan-500". */
  borderClass: string;
  /** Tailwind background utility used on hover, e.g. "hover:bg-cyan-500". */
  hoverFillClass: string;
  onHandleMouseDown: (e: React.MouseEvent, handle: HandlePosition) => void;
}

export const SelectionHandles: React.FC<SelectionHandlesProps> = ({
  borderClass,
  hoverFillClass,
  onHandleMouseDown,
}) => (
  <>
    {HANDLE_ORDER.map((handle) => (
      <div
        key={handle}
        className={`${GRIP_BASE} border-[1.5px] ${borderClass} ${hoverFillClass} hover:border-white ${GRIP_GEOMETRY[handle]}`}
        onMouseDown={(e) => onHandleMouseDown(e, handle)}
      />
    ))}
  </>
);
