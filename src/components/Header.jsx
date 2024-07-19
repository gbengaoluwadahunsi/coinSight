import PropTypes from "prop-types";
import logo from "../assets/images/download.webp";

const Header = ({ reportPage, setReportPage, setClicked }) => {
  const handleClick = () => {
    setReportPage(false);
    setClicked(false);
  };

  return (
    <>
      <header>
        <img src={logo} className="logo" alt="CoinSight Crypto Predictions" />
        <h1>COINSIGHT</h1>
        {reportPage && (
          <button style={{ cursor: "pointer" }} onClick={handleClick}>
            {" "}
            Back to Home
          </button>
        )}
      </header>
    </>
  );
};

Header.propTypes = {
  reportPage: PropTypes.bool.isRequired,
  setReportPage: PropTypes.func,
  setClicked: PropTypes.func,
};
export default Header;
