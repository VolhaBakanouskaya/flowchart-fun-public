// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Theme } from "./constants";

const backgroundColor = "#14141C";
const borderColor = "#9CADFF";
const darkBlue = "#9AADFD";
const nodeLabelColor = borderColor;
const fontFamily = '"Fira Mono", monospace';
const lineHeight = 1.4;
const nodeBackgroundColor = backgroundColor;
const fontSize = 11;
const padding = "5px";

const edgeWidth = 1;
const monospace: Theme = {
  value: "monospace",
  bg: backgroundColor,
  minHeight: 0,
  minWidth: 0,
  font: {
    fontFamily,
    files: [{ url: "FiraMono-Regular.woff2", name: "Fira Mono" }],
    lineHeight,
    fontSize,
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
        label: "data(label)",
        color: nodeLabelColor,
        "text-valign": "center",
        "text-halign": "center",
        "text-wrap": "wrap",
        "text-max-width": "data(width)",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        "line-height": lineHeight,
        "text-justification": "left",
        "padding-left": padding,
        "padding-right": padding,
        "padding-top": padding,
        "padding-bottom": padding,
        backgroundColor: nodeBackgroundColor,
        "border-color": borderColor,
        "border-width": edgeWidth,
        "border-opacity": 1,
        shape: "rectangle",
      },
    },
    {
      selector: "edge",
      style: {
        "font-family": fontFamily,
        "curve-style": "segments",
        "font-size": fontSize,
        opacity: 1,
        width: edgeWidth,
        label: "data(label)",
        color: nodeLabelColor,
        "target-arrow-shape": "triangle",
        "target-arrow-fill": "filled",
        "target-arrow-color": borderColor,
        "target-distance-from-node": 5,
        "source-distance-from-node": 5,
        "arrow-scale": 1.25,
        "text-background-shape": "roundrectangle",
        "text-background-color": backgroundColor,
        "text-background-opacity": 1,
        "text-background-padding": "2px",
        "line-style": "solid",
        "line-fill": "linear-gradient",
        "line-gradient-stop-colors": `${darkBlue} ${borderColor}`,
        "line-gradient-stop-positions": "0% 100%",
      },
    },
  ],
};

export default monospace;