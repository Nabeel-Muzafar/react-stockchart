import axios from "axios";
const API_KEY = "asdf1234567890";

const getBollingerBandsData = async (
  symbol,
  startDate,
  period,
  length,
  standardDeviation
) => {
  const endpoint = `http://3.84.200.180/api/bollinger?symbol=${
    symbol || "AAPL"
  }&start_date=${startDate || "2023-09-01"}&period=${period || "90"}&length=${
    length || "5"
  }&standard_deviation=${standardDeviation || 2}`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        APIKEY: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Bollinger Bands data:", error);
    throw error;
  }
};

const getCandlestickData = async (symbol, startDate, period) => {
  const endpoint = `http://3.84.200.180/api/candlestick?symbol=${
    symbol || "AAPL"
  }&start_date=${startDate || "2023-09-01"}&period=${period || "90"}`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        APIKEY: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Candlestick data:", error);
    throw error;
  }
};

export { getBollingerBandsData, getCandlestickData };
