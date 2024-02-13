import { isNotDefined, isDefined } from "react-stockcharts/lib/utils";

export function saveInteractiveNode(chartId) {
  try {
    return (node) => {
      this[`node_${chartId}`] = node;
    };
  } catch (error) {
    console.log("error occured", error);
  }
}

export function handleSelection(type, chartId) {
  try {
    return (selectionArray) => {
      const key = `${type}_${chartId}`;
      const interactive = this.state[key].map((each, idx) => {
        return {
          ...each,
          selected: selectionArray[idx],
        };
      });
      this.setState({
        [key]: interactive,
      });
    };
  } catch (error) {
    console.log("Error in saveInteractiveNodes", error);
  }
}

export function saveInteractiveNodes(type, chartId) {
  try {
    return (node) => {
      if (isNotDefined(this.interactiveNodes)) {
        this.interactiveNodes = {};
      }
      const key = `${type}_${chartId}`;
      if (isDefined(node) || isDefined(this.interactiveNodes[key])) {
        this.interactiveNodes = {
          ...this.interactiveNodes,
          [key]: { type, chartId, node },
        };
      }
    };
  } catch (error) {
    console.log("Error in saveInteractiveNodes", error);
  }
}

export function getInteractiveNodes() {
  return this.interactiveNodes;
}
