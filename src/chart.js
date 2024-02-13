import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries,
  BarSeries,
  BollingerSeries,
  AreaSeries,
  LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateY,
  CurrentCoordinate,
  MouseCoordinateX,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, HoverTooltip } from "react-stockcharts/lib/tooltip";
import { bollingerBand, ema, sma } from "react-stockcharts/lib/indicator";

import { fitWidth } from "react-stockcharts/lib/helper";
import {
  InteractiveText,
  DrawingObjectSelector,
  StandardDeviationChannel,
  TrendLine,
} from "react-stockcharts/lib/interactive";
import { getMorePropsForChart } from "react-stockcharts/lib/interactive/utils";
import { head, last, toObject } from "react-stockcharts/lib/utils";
import {
  saveInteractiveNodes,
  getInteractiveNodes,
} from "./utils/interactiveutils";

import { Label } from "react-stockcharts/lib/annotation";
import { ReactSketchCanvas } from "react-sketch-canvas";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
    });
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  handleSave() {
    this.props.onSave(this.state.text, this.props.chartId);
  }
  render() {
    const { showModal, onClose } = this.props;
    const { text } = this.state;

    return (
      <Modal
        show={showModal}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your text here</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup controlId="text">
            <FormControl
              type="text"
              value={text}
              onChange={this.handleChange}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class CandleStickChartWithText extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onDrawComplete = this.onDrawComplete.bind(this);
    this.onDrawStandardDeviationComplete =
      this.onDrawStandardDeviationComplete.bind(this);
    this.handleChoosePosition = this.handleChoosePosition.bind(this);

    this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
    this.getInteractiveNodes = getInteractiveNodes.bind(this);

    this.handleSelection = this.handleSelection.bind(this);

    this.saveCanvasNode = this.saveCanvasNode.bind(this);
    this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.state = {
      enableInteractiveObject: true,
      textList_1: this.props.setting.textList_1,
      showModal: false,
      channels_1: [],
      enableTrendLine: true,
      toggleTextBox: false,
      trends_1: [
        {
          start: [1606, 56],
          end: [1711, 53],
          appearance: {
            stroke: "blue",
            border: "5px solid red",
            backgroundColor: "red",
          },
          type: "XLINE",
        },
      ],
      trends_3: [],
    };
  }

  onDrawCompleteChart1(trends_1) {
    this.setState({
      enableTrendLine: false,
      trends_1,
    });
  }

  onDrawStandardDeviationComplete(channels_1) {
    this.setState({
      enableInteractiveObject: false,
      channels_1,
    });
  }
  saveCanvasNode(node) {
    console.log("node", node);
    debugger;
    this.canvasNode = node;
  }
  handleSelection(interactives, moreProps, e) {
    try {
      const { setting } = this.props;
      if (setting.textBox) {
        if (this.state.enableInteractiveObject) {
          const independentCharts = moreProps.currentCharts.filter(
            (d) => d !== 2
          );
          if (independentCharts.length > 0) {
            const first = head(independentCharts);

            const morePropsForChart = getMorePropsForChart(moreProps, first);
            const {
              mouseXY: [, mouseY],
              chartConfig: { yScale },
              xAccessor,
              currentItem,
            } = morePropsForChart;

            const position = [xAccessor(currentItem), yScale.invert(mouseY)];
            const newText = {
              // ...InteractiveText.defaultProps.defaultText,
              ...setting.textBoxFeat,
              position,
            };
            this.handleChoosePosition(newText, morePropsForChart, e);
          }
        } else {
          const state = toObject(interactives, (each) => {
            return [`textList_${each.chartId}`, each.objects];
          });
          this.setState({ state, toggleTextBox: !this.state.toggleTextBox });
        }
      } else {
        const state = toObject(interactives, (each) => {
          return [`channels_${each.chartId}`, each.objects];
        });
        this.setState(state);
      }
    } catch (error) {
      console.log("Error occurred while processing chart", error);
    }
  }
  handleChoosePosition(text, moreProps) {
    this.componentWillUnmount();
    const { id: chartId } = moreProps.chartConfig;

    this.setState({
      [`textList_${chartId}`]: [...this.state[`textList_${chartId}`], text],
      showModal: true,
      text: text.text,
      chartId,
      toggleTextBox: !this.state.toggleTextBox,
    });
  }
  handleTextChange(text, chartId) {
    const textList = this.state[`textList_${chartId}`];
    const allButLast = textList.slice(0, textList.length - 1);

    const lastText = {
      ...last(textList),
      text,
    };

    this.setState({
      [`textList_${chartId}`]: [...allButLast, lastText],
      showModal: false,
      enableInteractiveObject: false,
      toggleTextBox: !this.state.toggleTextBox,
    });
    // this.componentDidMount();
  }
  handleDialogClose() {
    this.setState({
      showModal: false,
    });
  }

  componentDidMount() {
    const { setting } = this.props;
    document.addEventListener("keyup", this.onKeyPress);
    if (setting) {
      this.setState({ textList_1: setting.textList_1 });
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.toggleTextBox !== this.state.toggleTextBox) {
      this.props.setSetting((prevValue) => ({
        ...prevValue,
        textList_1: this.state.textList_1,
      }));
    }
  }

  onDrawComplete(textList, moreProps) {
    const { id: chartId } = moreProps.chartConfig;

    this.setState({
      enableInteractiveObject: false,
      [`textList_${chartId}`]: textList,
    });
  }
  onKeyPress(e) {
    try {
      const keyCode = e.which;
      switch (keyCode) {
        case 46: {
          // DEL

          this.setState({
            textList_1: this.state.textList_1.filter((d) => !d.selected),
            toggleTextBox: !this.state.toggleTextBox,
          });

          const channels_1 = this.state.channels_1.filter(
            (each) => !each.selected
          );

          this.canvasNode.cancelDrag();
          this.setState({
            channels_1,
          });

          break;
        }
        case 27: {
          // ESC
          // this.node.terminate();
          this.canvasNode.cancelDrag();
          this.setState({
            enableInteractiveObject: false,
            enableTrendLine: false,
          });
          break;
        }
        case 68: // D - Draw drawing object
        case 69: {
          // E - Enable drawing object
          this.setState({
            enableInteractiveObject: true,
            enableTrendLine: true,
          });
          break;
        }
      }
    } catch (error) {
      console.log("Error occured in onKeyPress", error);
    }
  }
  render() {
    const {
      type,
      data: initialData,
      width,
      ratio,
      gridSetting,
      setting,
      drawingCanva,
    } = this.props;
    const { showModal, text, channels_1 } = this.state;

    const ema20 = ema()
      .options({
        windowSize: 20,
        sourcePath: "close",
      })
      .skipUndefined(true)
      .merge((d, c) => {
        d.ema20 = c;
      })
      .accessor((d) => d?.ema20)
      .stroke("blue");

    const sma20 = sma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.sma20 = c;
      })
      .accessor((d) => d?.sma20)
      .stroke("green");

    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor((d) => d.ema50);

    const smaVolume50 = sma()
      .options({ windowSize: 20, sourcePath: "volume" })
      .merge((d, c) => {
        d.smaVolume50 = c;
      })
      .accessor((d) => d.smaVolume50)
      .stroke("#153A5B")
      .fill("#4682B4");

    const bb = bollingerBand()
      .merge((d, c) => {
        d.bb = c;
      })
      .accessor((d) => d.bb);

    const calculatedData = ema20(sma20(ema50(smaVolume50(bb(initialData)))));

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d?.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    const bbStroke = {
      top: setting.bbt,
      middle: setting.bbm,
      bottom: setting.bbb,
    };

    const bbFill = setting.bbfill;
    const height = 550;
    var margin = { left: 70, right: 70, top: 20, bottom: 30 };
    var gridHeight = height - margin.top - margin.bottom;
    var gridWidth = width - margin.left - margin.right;

    var showGrid = gridSetting.grid;
    var yGrid = showGrid
      ? {
          innerTickSize: -1 * gridWidth,
          tickStrokeDasharray: gridSetting.style,
          tickStrokeOpacity: gridSetting.opacity,
          tickStrokeWidth: gridSetting.strokeWidth,
        }
      : {};
    var xGrid = showGrid
      ? {
          innerTickSize: -1 * gridHeight,
          tickStrokeDasharray: gridSetting.style,
          tickStrokeOpacity: gridSetting.opacity,
          tickStrokeWidth: gridSetting.strokeWidth,
        }
      : {};

    const numberFormat = format(".2f");
    const dateFormat = timeFormat("%Y-%m-%d");

    function tooltipContent(ys) {
      try {
        return ({ currentItem, xAccessor }) => {
          return {
            x: dateFormat(xAccessor(currentItem)),
            y: [
              {
                label: "open",
                value: currentItem.open && numberFormat(currentItem.open),
              },
              {
                label: "high",
                value: currentItem.high && numberFormat(currentItem.high),
              },
              {
                label: "low",
                value: currentItem.low && numberFormat(currentItem.low),
              },
              {
                label: "close",
                value: currentItem.close && numberFormat(currentItem.close),
              },
            ]
              .concat(
                ys.map((each) => ({
                  label: each.label,
                  value: each.value(currentItem),
                  stroke: each.stroke,
                }))
              )
              .filter((line) => line.value),
          };
        };
      } catch (error) {
        console.log("error", error);
      }
    }

    const [yAxisLabelX, yAxisLabelY] = [
      width - margin.left - 40,
      (height - margin.top - margin.bottom) / 2,
    ];

    const styles = {
      position: "absolute",
      top: 0,
      bottom: 0,
      borderRadius: "0.25rem",
      width: "100%",
      zIndex: 999,
      opacity: 0.2,
    };

    console.log("ration", ratio);
    return (
      <div
        style={
          setting.colorMode === "light"
            ? { backgroundColor: "white", position: "relative" }
            : { backgroundColor: "#00000096", position: "relative" }
        }
      >
        <ChartCanvas
          ref={this.saveCanvasNode}
          height={600}
          width={width}
          ratio={1}
          // margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
          type={type}
          data={data}
          xScale={xScale}
          mouseMoveEvent={false}
          panEvent={true}
          zoomEvent={true}
          clamp={false}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents || [16, 0]}
        >
          {setting?.title && (
            <Label
              x={(width - margin.left - margin.right) / 2}
              y={30}
              fontSize="30"
              text={setting?.titleText}
            />
          )}

          <Chart
            id={1}
            height={400}
            yExtents={[(d) => [d?.high, d?.low]]}
            padding={{ top: 10, bottom: 20 }}
          >
            <YAxis axisAt="left" orient="left" ticks={5} {...yGrid} />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".2f")}
            />

            <CandlestickSeries />
            <BollingerSeries
              yAccessor={(d) => d?.bb}
              stroke={bbStroke}
              fill={bbFill}
            />
            <LineSeries
              yAccessor={sma20?.accessor()}
              stroke={sma20?.stroke()}
            />

            <OHLCTooltip origin={[-40, 0]} />

            <HoverTooltip
              yAccessor={ema50.accessor()}
              tooltipContent={tooltipContent([
                {
                  label: `${ema20?.type()}(${ema20?.options().windowSize})`,
                  value: (d) => numberFormat(ema20?.accessor()(d)),
                  stroke: ema20?.stroke(),
                },
                {
                  label: `${ema50?.type()}(${ema50?.options().windowSize})`,
                  value: (d) => numberFormat(ema50?.accessor()(d)),
                  stroke: ema50?.stroke(),
                },
              ])}
              fontSize={15}
            />

            {setting?.xLabel && (
              <Label
                x={(width - margin.left - margin.right) / 2}
                y={height + 29}
                fontSize="15"
                text={setting?.xLabelText}
              />
            )}

            {setting?.yLabel && (
              <Label
                x={yAxisLabelX}
                y={yAxisLabelY}
                rotate={-90}
                fontSize="15"
                text={setting?.yLabelText}
              />
            )}

            {setting.textBox && (
              <InteractiveText
                ref={this.saveInteractiveNodes("InteractiveText", 1)}
                enabled={this.state.enableInteractiveObject}
                text="Enter Text ..."
                onDragComplete={this.onDrawComplete}
                textList={this.state.textList_1}
              />
            )}

            {setting.standardDeviation && (
              <StandardDeviationChannel
                ref={this.saveInteractiveNodes("StandardDeviationChannel", 1)}
                enabled={true}
                onComplete={this.onDrawStandardDeviationComplete}
                channels={channels_1}
              />
            )}

            {setting.trendLine && (
              <TrendLine
                ref={this.saveInteractiveNodes("Trendline", 1)}
                enabled={this.state.enableTrendLine}
                type="RAY"
                snap={false}
                snapTo={(d) => [d.high, d.low]}
                onComplete={this.onDrawCompleteChart1}
                trends={this.state.trends_1}
              />
            )}

            {/* features */}

            <MouseCoordinateX
              at="top"
              orient="top"
              displayFormat={timeFormat("%Y-%m-%d")}
            />

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".2f")}
            />
          </Chart>

          <Chart
            id={2}
            yExtents={[(d) => d?.volume, smaVolume50?.accessor()]}
            height={150}
            origin={(w, h) => [0, h - 150]}
          >
            <YAxis
              axisAt="left"
              orient="left"
              ticks={5}
              zoomEnabled={true}
              tickFormat={format(".2s")}
            />

            <XAxis
              axisAt="bottom"
              orient="bottom"
              showTicks={true}
              ticks={5}
              {...xGrid}
            />

            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")}
            />

            <BarSeries
              yAccessor={(d) => d?.volume}
              fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
            />
            <AreaSeries
              yAccessor={smaVolume50?.accessor()}
              stroke={smaVolume50.stroke()}
              fill={smaVolume50?.fill()}
            />
            <CurrentCoordinate
              yAccessor={smaVolume50?.accessor()}
              fill={smaVolume50?.stroke()}
            />
            <CurrentCoordinate yAccessor={(d) => d?.volume} fill="#9B0A47" />

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".2f")}
            />
          </Chart>

          <CrossHairCursor />
          {(setting.standardDeviation ||
            setting.trendLine ||
            setting.textBox) && (
            <DrawingObjectSelector
              enabled
              getInteractiveNodes={this.getInteractiveNodes}
              drawingObjectMap={{
                ...(setting.standardDeviation
                  ? { StandardDeviationChannel: "channels" }
                  : setting.trendLine
                  ? { Trendline: "trends" }
                  : { InteractiveText: "textList" }),
              }}
              onSelect={this.handleSelection}
            />
          )}
        </ChartCanvas>

        {setting.drawMode && (
          <ReactSketchCanvas
            style={styles}
            width="600"
            height="400"
            ref={drawingCanva}
            eraserWidth={setting.eraserWidth}
            strokeWidth={setting.strokeWidth}
            strokeColor={setting.stokeColor}
          />
        )}
        <Dialog
          showModal={showModal}
          text={text}
          chartId={this.state.chartId}
          onClose={this.handleDialogClose}
          onSave={this.handleTextChange}
        />
      </div>
    );
  }
}

CandleStickChartWithText.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
  gridSetting: PropTypes.object.isRequired,
};

CandleStickChartWithText.defaultProps = {
  type: "svg",
};

const CandleStickChart = fitWidth(CandleStickChartWithText);

export default CandleStickChart;
