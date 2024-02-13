import "./App.css";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { useEffect, useRef, useState } from "react";
import CandleStickChartWithBollingerBandOverlay from "./chart";
import "bootstrap/dist/css/bootstrap.min.css";
import GridSettingCard from "./components/setting/GridSettingCard";
import ThemeModeCard from "./components/setting/ThemeModeCard";
import { getBollingerBandsData, getCandlestickData } from "./utils/apiUtils";
import { Spinner } from "react-bootstrap";
import ChartSettingsControl from "./components/setting/ChartSettingsControl";
import {
  getInitialState,
  saveStateToLocalStorage,
} from "./utils/localStorageUtils";
import { Draw } from "./components/setting/Draw";
import { Params } from "./components/setting/Params";
import Drawing from "./components/setting/Drawing";
import { TextBoxSet } from "./components/setting/TextBoxSet";
import ErrorBoundary from "./ErrorBoundry";

function App() {
  const [data, setData] = useState([]);
  const [gridSetting, setGridSetting] = useState({
    style: "Solid",
    opacity: "0.1",
    strokeWidth: "1",
    grid: true,
  });
  const [setting, setSetting] = useState(getInitialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [bollingerBand, setBollingerBand] = useState([]);
  const [candleStick, setCandleStick] = useState([]);
  const [loader, setloader] = useState(false);
  const drawingCanva = useRef();
  const [error, seterror] = useState("");

  const bollingerParams = {
    symbol: "AAPL",
    startDate: "2023-09-01",
    period: 90,
    length: 5,
    standardDeviation: 2,
  };

  const candlestickParams = {
    symbol: setting.symbol,
    startDate: setting.startDate,
    period: setting.period,
  };

  useEffect(() => {
    const fetchBollingerData = async () => {
      try {
        setloader(false);
        const data = await getBollingerBandsData(
          ...Object.values(bollingerParams)
        );
        setBollingerBand(data);
      } catch (error) {
        setBollingerBand([]);
        setloader(true);
        seterror(error?.message);
        console.error("Error fetching Bollinger Bands data:", error);
      }
    };

    fetchBollingerData();
  }, []);

  useEffect(() => {
    const fetchCandlestickData = async () => {
      try {
        setloader(false);
        const data = await getCandlestickData(
          ...Object.values(candlestickParams)
        );
        setCandleStick(data);
        setloader(false);
      } catch (error) {
        setCandleStick([]);
        seterror(error?.message);
        setloader(true);
        console.error("Error fetching Candlestick data:", error);
      }
    };

    fetchCandlestickData();
  }, [isSubmit]);

  useEffect(() => {
    saveStateToLocalStorage(setting);
  }, [setting]);

  useEffect(() => {
    try {
      if (
        Object.keys(bollingerBand).length > 0 &&
        Object.keys(candleStick).length > 0
      ) {
        const mergedResponse = [];
        const getArrayResult = candleStick.Date.length || 9;
        for (let index = 0; index < getArrayResult; index++) {
          mergedResponse.push({
            absoluteChange: "",
            close: candleStick.Close[index] || null,
            bb: {
              top: bollingerBand?.BBU[index] || null,
              middle: bollingerBand?.BBM[index] || null,
              bottom: bollingerBand?.BBL[index] || null,
            },
            date: new Date(candleStick?.Date[index]) || null,
            dividend: "",
            high: candleStick.High[index] || null,
            low: candleStick.Low[index] || null,
            open: candleStick.Open[index] || null,
            percentChange: "",
            split: "",
            volume: candleStick.Volume[index] || null,
          });
        }
        setData(mergedResponse);
        setloader(false);
      }
    } catch (error) {
      seterror(error?.message);
      setloader(true);
      console.error("Error occured while getting correct formate", error);
    }
  }, [bollingerBand, candleStick]);

  return (
    <>
      {data && data?.length > 0 ? (
        <div>
          <div>
            <div>
              <Params
                setting={setting}
                setSetting={setSetting}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                loader={loader}
              />
            </div>
            <div>
              <Drawing
                setting={setting}
                setSetting={setSetting}
                drawingCanva={drawingCanva}
              />
            </div>
            <div>
              {data?.length > 0 && (
                <ErrorBoundary>
                  <TypeChooser>
                    {(type) => (
                      <CandleStickChartWithBollingerBandOverlay
                        type={type}
                        data={data}
                        gridSetting={gridSetting}
                        setting={setting}
                        drawingCanva={drawingCanva}
                        setSetting={setSetting}
                      />
                    )}
                  </TypeChooser>
                </ErrorBoundary>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "95%",
              justifyContent: "center",
              justifyItems: "center",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            <GridSettingCard
              gridSetting={gridSetting}
              setGridSetting={setGridSetting}
            />
            <ThemeModeCard setting={setting} setSetting={setSetting} />
            <ChartSettingsControl setting={setting} setSetting={setSetting} />
            <Draw setting={setting} setSetting={setSetting} />
            {setting.textBox && (
              <TextBoxSet setting={setting} setSetting={setSetting} />
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Spinner animation="grow" />
          <p>Please Wait we are loading graph</p>
          {loader && (
            <>
              <p>Error: {error}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
