import { createAttributes } from "./create-attributes.js";
import { createEvents } from "./create-events.js";

export const domNode = (node) => {
  let createdNode = node;
  if (typeof node === "function") {
    createdNode = node();
  } else if (typeof node.type === "function") {
    createdNode = node.type({ ...node.props, children: node.children });
  } else if (typeof node.type === "string") {
    createdNode = node;
  }
  let element;
  if (createdNode.type) {
    if (createdNode.type.match(/(svg|path)/g)) {
      element = document.createElementNS(
        `http://www.w3.org/2000/svg`,
        createdNode.type
      );
    } else {
      element = document.createElement(createdNode.type);
    }
  }

  createAttributes(createdNode.props, element, createdNode);
  createEvents(createdNode.synth, element);

  return { node: createdNode, element };
};
