import PropTypes from "prop-types";

const CryptoDataPanel = ({ data, report }) => {
  const coinList = {
    BTCUSD: "Bitcoin",
    ETHUSD: "Ethereum",
    BNBUSD: "Binance Coin",
    USDTUSD: "Tether",
    ADAUSD: "Cardano",
    XRPUSD: "Ripple",
    DOGEUSD: "Dogecoin",
    DOTUSD: "Polkadot",
    USDCUSD: "USD Coin",
    UNIUSD: "Uniswap",
    BCHUSD: "Bitcoin Cash",
    LTCUSD: "Litecoin",
    LINKUSD: "Chainlink",
    SOLUSD: "Solana",
    MATICUSD: "Polygon",
    XLMUSD: "Stellar",
    VETUSD: "VeChain",
    THETAUSD: "Theta",
    FILUSD: "Filecoin",
    TRXUSD: "TRON",
  };

  const renderReport = (output) => {
    return output.map((dataItem) => {
      const name = dataItem.ticker.slice(2); // Slice off the prefix "X:"
      const cryptoName = coinList[name] || name; // Get the cryptocurrency name or use ticker itself
      

      return (
        <div
          key={dataItem.ticker}
          style={{ border: "1px solid black", padding: "10px" , marginTop: "2.8em" }}
        >
          <div className="crypto-data-header">
            <h2>Cryptocurrency Data for</h2>
            <h2
              style={{ color: "orange", fontSize: "2em", fontWeight: "bold" }}
              id="crypto-name"
            >
              {cryptoName}
            </h2>
          </div>
          <div className="crypto-data-container">
            {dataItem.results.map((dayData, index) => (
              <div className="crypto-data-row" key={index}>
                <div className="crypto-data-label">
                  Day {index + 1} ({new Date(dayData.t).toDateString()}) Opening
                  Price:
                </div>
                <div className="crypto-data-value">${dayData.o.toFixed(2)}</div>
              </div>
            ))}
            <div className="crypto-data-row crypto-data-label">
              Average Closing Price:
            </div>
            <div className="crypto-data-average">
              $
              {(
                dataItem.results.reduce((sum, dayData) => sum + dayData.c, 0) /
                dataItem.results.length
              ).toFixed(2)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="crypto-data-panel">
      <div className="crypto-data-section">{renderReport(data)}</div>
      <div className="report-section">
        <h2>Your AI-Powered Report ♣♟🎖</h2>
        <p>{report}</p>
      </div>
    </section>
  );
};

CryptoDataPanel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          t: PropTypes.number.isRequired,
          o: PropTypes.number.isRequired,
          c: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  report: PropTypes.string.isRequired,
};

export default CryptoDataPanel;
