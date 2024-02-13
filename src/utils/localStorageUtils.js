// localStorageUtils.js
const localStorageKey = "chartSettings";

export const getInitialState = () => {
  const storedSettings = JSON.parse(localStorage.getItem(localStorageKey));
  return (
    storedSettings || {
      standardDeviation: false,
      colorMode: "light",
      trendLine: false,
      textBox: false,
      xLabel: false,
      xLabelText: "",
      yLabel: false,
      yLabelText: "",
      title: false,
      titleText: "",
      bbm: "#000000",
      bbb: "964B00",
      bbt: "#964B00",
      bbfill: "#F5EEE6",
      symbol: "AAPL",
      startDate: "2023-09-01",
      period: 90,
      drawMode: false,
      stokeColor: "red",
      strokeWidth: 2,
      eraserWidth: 5,
      textBoxFeat: {
        bgFill: "#D3D3D3",
        bgOpacity: 1,
        bgStrokeWidth: 1,
        fontSize: 12,
        fontWeight: "normal",
        text: "Enter Your Text...",
        textFill: "#F10040",
      },
      textList_1: [],
    }
  );
};

export const saveStateToLocalStorage = (state) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};
