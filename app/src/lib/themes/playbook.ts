import { StylesheetStyle } from "cytoscape";

import { defaultFontSize, Theme } from "./constants";

const colors = {
  black: "#000000",
  white: "#ffffff",
  green: "#3cae5a",
  yellow: "#e3ca0b",
  blue: "#3634ba",
  orange: "#edae4e",
  purple: "#7256f0",
  red: "#ef4a33",
  gray: "#a3a69d",
};

const fontFamily = "Karla";
const backgroundColor = colors.white;
const nodeBackgroundColor = backgroundColor;
const edgeLabelBackgroundColor = "#EDECF9";
const arrowColor = colors.blue;
const nodeLabelColor = colors.black;
const arrowLabelColor = colors.black;
const lineHeight = 1.33;
const padding = "0px";
const arrowWidth = 1;
const distanceFromNode = 5;

const playbook: Theme = {
  value: "playbook",
  bg: backgroundColor,
  fg: nodeLabelColor,
  minWidth: 0,
  minHeight: 0,
  font: {
    fontFamily,
    fontSize: defaultFontSize,
    lineHeight,
    files: [{ name: fontFamily, url: "Karla-Regular.woff2" }],
  },
  colors,
  styles: [
    {
      selector: "node[label!='']",
      style: {
        width: "data(shapeWidth)",
        height: "data(shapeHeight)",
        "text-margin-y": "data(textMarginY)" as any,
        "text-margin-x": "data(textMarginX)" as any,
      },
    },
    {
      selector: "node",
      style: {
        "font-family": fontFamily,
        backgroundColor: nodeBackgroundColor,
        "border-color": arrowColor,
        color: nodeLabelColor,
        label: "data(label)",
        "text-wrap": "wrap",
        "text-max-width": "data(width)",
        "text-valign": "center",
        shape: "roundrectangle",
        "padding-left": padding,
        "padding-right": padding,
        "padding-top": padding,
        "padding-bottom": padding,
        "line-height": lineHeight,
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "edge-distances": "intersection",
        "control-point-distances": "-45",
        width: arrowWidth,
        "line-color": arrowColor,
        label: "data(label)",
        color: arrowLabelColor,
        "text-valign": "bottom",
        "text-wrap": "wrap",
        "font-family": fontFamily,
        "text-background-opacity": 1,
        "text-background-color": edgeLabelBackgroundColor,
        "text-background-padding": "4.5px",
        "text-border-opacity": 1,
        "text-background-shape": "roundrectangle",
        // @ts-ignore
        "edge-text-rotation": "autorotate",
        "source-distance-from-node": distanceFromNode,
        "target-distance-from-node": distanceFromNode,
        "target-arrow-shape": "triangle",
        "target-arrow-color": arrowColor,
        "source-arrow-color": arrowColor,
        "arrow-scale": 0.45,
        ghost: "yes",
        "ghost-offset-x": 0.5,
        "ghost-offset-y": 1,
        "ghost-opacity": 0.1,
      },
    },
    {
      selector: ":parent",
      style: {
        "text-valign": "top",
        "text-halign": "center",
        // @ts-ignore
        "text-margin-y": `-6px`,
        "text-wrap": "none",
        padding: "6px",
      },
    },
    ...Object.entries(colors).map<StylesheetStyle>(([color, value]) => ({
      selector: `node.${color}`,
      style: {
        color: `${value}`,
        ...(color === "white"
          ? {
              "background-color": colors.blue,
            }
          : {}),
      },
    })),
  ],
};

export default playbook;
