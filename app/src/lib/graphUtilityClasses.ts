import { Stylesheet } from "cytoscape";

import { fontSizeScalars } from "./getGetSize";
import { defaultFontSize } from "./themes/constants";

export const shapes: cytoscape.Css.Node["shape"][] = [
  "rectangle",
  "roundrectangle",
  "ellipse",
  "triangle",
  "pentagon",
  "hexagon",
  "heptagon",
  "octagon",
  "star",
  "barrel",
  "diamond",
  "vee",
  "rhomboid",
  // @ts-ignore
  "right-rhomboid",
  "polygon",
  "tag",
  "round-rectangle",
  "cut-rectangle",
  "bottom-round-rectangle",
  "concave-hexagon",
];

const circle: Stylesheet = {
  selector: ".circle",
  style: {
    shape: "ellipse",
    height: "data(width)",
  },
};
export const arrowSuffixes = [
  "triangle",
  "triangle-tee",
  "circle-triangle",
  "triangle-cross",
  "triangle-backcurve",
  "vee",
  "tee",
  "square",
  "circle",
  "diamond",
  "chevron",
  "none",
];

export const sourceArrowSuffixes = arrowSuffixes.map(
  (suffix) => `source-${suffix}` as cytoscape.Css.ArrowShape
);

export const targetArrowSuffixes = arrowSuffixes.map(
  (suffix) => `target-${suffix}` as cytoscape.Css.ArrowShape
);

export const edgeLineStyles: Stylesheet[] = [
  {
    selector: "edge.dashed",
    style: {
      "line-style": "dashed",
    },
  },
  {
    selector: "edge.dotted",
    style: {
      "line-style": "dotted",
    },
  },
  {
    selector: "edge.solid",
    style: {
      "line-style": "solid",
    },
  },
];

export const lineStyles: Stylesheet[] = [
  ...edgeLineStyles,
  ...(arrowSuffixes as cytoscape.Css.ArrowShape[]).reduce<Stylesheet[]>(
    (acc, arrow) => {
      acc.push({
        selector: `edge.source-${arrow}`,
        style: {
          "source-arrow-shape": arrow,
          "source-arrow-color": "inherit",
        },
      });
      acc.push({
        selector: `edge.target-${arrow}`,
        style: {
          "target-arrow-shape": arrow,
        },
      });
      return acc;
    },
    []
  ),
];

export const borderStyles: Stylesheet[] = [
  {
    selector: "node.border-solid",
    style: {
      "border-style": "solid",
    },
  },
  {
    selector: "node.border-dashed",
    style: {
      "border-style": "dashed",
    },
  },
  {
    selector: "node.border-dotted",
    style: {
      "border-style": "dotted",
    },
  },
  {
    selector: "node.border-double",
    style: {
      "border-style": "double",
    },
  },
  {
    selector: "node.border-none",
    style: {
      "border-width": 0,
    },
  },
];

const textSizeStyles: Stylesheet[] = [
  {
    selector: ".text-sm",
    style: {
      "font-size": defaultFontSize * fontSizeScalars["text-sm"],
    },
  },
  {
    selector: ".text-lg",
    style: {
      "font-size": defaultFontSize * fontSizeScalars["text-lg"],
    },
  },
  {
    selector: ".text-xl",
    style: {
      "font-size": defaultFontSize * fontSizeScalars["text-xl"],
    },
  },
];

export const graphUtilityClasses: Stylesheet[] = shapes
  .map<Stylesheet>((shape) => ({
    selector: `.${shape}`,
    style: {
      shape,
    },
  }))
  .concat(circle)
  .concat(lineStyles)
  .concat(borderStyles)
  .concat(textSizeStyles);

export const baseStyles: Stylesheet[] = [
  {
    selector: ".nodeHovered, .edgeHovered, node:selected",
    style: {
      // @ts-ignore
      "underlay-opacity": 0.1,
      "underlay-color": "black",
      "underlay-padding": "5px",
    },
  },
  {
    selector: "node",
    style: {
      "font-size": defaultFontSize,
    },
  },
  {
    selector: "edge",
    style: {
      "font-size": defaultFontSize,
    },
  },
];

/**
 * These are styles we want to take precedence over themes, utility classes, user styles
 */
export const importantBaseStyles: Stylesheet[] = [
  {
    selector: "node[w]",
    style: {
      width: "data(w)",
    },
  },
  {
    selector: "node[h]",
    style: {
      height: "data(h)",
    },
  },
  {
    selector: "node[src]",
    style: {
      "background-image": "data(src)",
      "background-fit": "cover",
      "border-width": 0,
      "text-valign": "bottom",
      "text-margin-y": 5,
    },
  },
];
