// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Theme } from "./constants";

const fontFamily = "Gaegu";
const fontSize = 13;
const backgroundColor = "#fffa96";
const arrowColor = "#000000";
const lineHeight = 1;
const padding = "14px";
const borderWidth = 1.5;

const eggs: Theme = {
  value: "eggs",
  bg: backgroundColor,
  minWidth: 0,
  minHeight: 0,
  font: {
    fontFamily,
    fontSize,
    lineHeight,
    files: [{ name: "Gaegu", url: "Gaegu-Regular.woff2" }],
  },
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
        "font-size": fontSize,
        backgroundColor: "white",
        "border-color": arrowColor,
        color: arrowColor,
        label: "data(label)",
        "text-wrap": "wrap",
        "text-max-width": "data(width)",
        "text-valign": "center",
        shape: "ellipse",
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
        "curve-style": "unbundled-bezier",
        "loop-direction": "10deg",
        "loop-sweep": "20deg",
        width: borderWidth,
        "line-color": arrowColor,
        label: "data(label)",
        color: arrowColor,
        "font-size": fontSize,
        "text-valign": "bottom",
        "text-wrap": "wrap",
        "font-family": fontFamily,
        "target-arrow-color": arrowColor,
        "target-arrow-shape": "triangle",
        "text-background-opacity": 1,
        "text-background-color": backgroundColor,
        "text-background-padding": "3px",
        "text-background-shape": "roundrectangle",
        "text-border-style": "solid",
        "edge-text-rotation": "autorotate",
      },
    },
  ],
};

export default eggs;