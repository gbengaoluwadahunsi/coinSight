import PropTypes from "prop-types";
import { useState } from "react";
import CryptoDataPanel from "./CryptoDatapanel";
import loader from "../assets/images/loader.svg";

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDateNDaysAgo(n) {
  const now = new Date(); // current date and time
  now.setDate(now.getDate() - n);
  return formatDate(now);
}

const dates = {
  startDate: getDateNDaysAgo(4),
  endDate: getDateNDaysAgo(1),
};

const ActionPanel = ({ clicked, setReportPage, setClicked }) => {
  const [tickersArr, setTickersArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [report, setReport] = useState("");

  const handleAddTicker = () => {
    const tickerSelect = document.getElementById("ticker-select");
    const selectedTicker = tickerSelect.value;
    if (selectedTicker && !tickersArr.includes(selectedTicker)) {
      setTickersArr([...tickersArr, selectedTicker]);
    } else {
      alert("Please select a valid ticker that is not already selected.");
    }
  };

  const handleClearTickers = () => {
    setTickersArr([]);
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setClicked(true);
    setReportPage(true);

    try {
      const promises = tickersArr.map(async (ticker) => {
        const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
        const url = `https://api.polygon.io/v2/aggs/ticker/X:${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });

      const cryptoData = await Promise.all(promises);
      setCryptoData(cryptoData);

      // Fetching report using Groq
      const summary = await fetchReport(cryptoData);
      setReport(summary);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async (cryptoData) => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

    const messages = [
      {
        role: "system",
        content:
          "You are a crypto guru. Given data on share prices over the past 3 days, write a report of no more than 100 words describing the crypto performance and recommending whether to buy, hold or sell.",
      },
      {
        role: "user",
    content: `${JSON.stringify(cryptoData)}`,
      },
    ];

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: messages,
            temperature: 1.1
          }),
        }
      );

      const data = await response.json();
      return data.choices[0]?.message?.content || "No advice available";
    } catch (err) {
      console.error("Error fetching report:", err);
      return "Unable to access AI. Please refresh and try again.";
    }
  };

  return (
    <main>
      {!clicked ? (
        <section className="action-panel">
          <form id="ticker-input-form">
            <label htmlFor="ticker-input">
              Select one or more cryptocurrency ticker(s) to get real-time
              report:
            </label>
            <div className="form-input-control">
              <div className="ticker-select-container">
                <select id="ticker-select">
                  <option value="">Select a ticker...</option>
                  <option value="BTCUSD">BTC - Bitcoin</option>
                  <option value="ETHUSD">ETH - Ethereum</option>
                  <option value="BNBUSD">BNB - Binance Coin</option>
                  <option value="USDTUSD">USDT - Tether</option>
                  <option value="ADAUSD">ADA - Cardano</option>
                  <option value="XRPUSD">XRP - Ripple</option>
                  <option value="DOGEUSD">DOGE - Dogecoin</option>
                  <option value="DOTUSD">DOT - Polkadot</option>
                  <option value="USDCUSD">USDC - USD Coin</option>
                  <option value="UNIUSD">UNI - Uniswap</option>
                  <option value="BCHUSD">BCH - Bitcoin Cash</option>
                  <option value="LTCUSD">LTC - Litecoin</option>
                  <option value="LINKUSD">LINK - Chainlink</option>
                  <option value="SOLUSD">SOL - Solana</option>
                  <option value="MATICUSD">MATIC - Polygon</option>
                  <option value="XLMUSD">XLM - Stellar</option>
                  <option value="VETUSD">VET - VeChain</option>
                  <option value="THETAUSD">THETA - Theta</option>
                  <option value="FILUSD">FIL - Filecoin</option>
                  <option value="TRXUSD">TRX - TRON</option>
                </select>
              </div>
              <button
                className="add-ticker-btn"
                type="button"
                onClick={handleAddTicker}
              >
                Add Ticker
              </button>
              <button
                className="clear-ticker-btn"
                type="button"
                onClick={handleClearTickers}
              >
                Clear
              </button>
            </div>
          </form>
          <p className="ticker-choice-display">
            Selected ticker(s): {tickersArr.join(", ")}
          </p>
          <button
            className="generate-report-btn"
            type="button"
            onClick={handleGenerateReport}
            disabled={tickersArr.length === 0 || loading}
          >
            {loading ? "Generating Report..." : "Generate Report"}
          </button>
        </section>
      ) : loading ? (
        <img
          src={loader}
          width={100}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          alt="loading"
        />
      ) : (
        <CryptoDataPanel data={cryptoData} report={report} />
      )}
    </main>
  );
};

ActionPanel.propTypes = {
  setReportPage: PropTypes.func,
  setClicked: PropTypes.func,
  clicked: PropTypes.bool,
};

export default ActionPanel;
