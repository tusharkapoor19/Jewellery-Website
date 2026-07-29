import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  const [gold24, setGold24] = useState("--");
  const [silver, setSilver] = useState("--");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Gold & Silver Price (USD per Troy Ounce)
        const goldRes = await fetch("https://api.gold-api.com/price/XAU");
        const silverRes = await fetch("https://api.gold-api.com/price/XAG");

        // USD -> INR Exchange Rate (New API)
        const currencyRes = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        const currencyData = await currencyRes.json();

        console.log(goldData);
        console.log(silverData);
        console.log(currencyData);

        const usdToInr = currencyData.rates.INR;

        // Convert USD/Ounce → INR/Gram
        const goldPerGramReal = (goldData.price * usdToInr) / 28.35;
        const silverPerGramReal = (silverData.price * usdToInr*1000) / 28.35;
        const goldPerGram = ((goldPerGramReal * 15) / 100) + goldPerGramReal 
        const silverPerGram = ((silverPerGramReal * 18) / 100) + silverPerGramReal

        setGold24(goldPerGram.toFixed(2));
        setSilver(silverPerGram.toFixed(2));
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();

    const interval = setInterval(fetchRates, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-left">
          <span>🚚 FREE INSURED SHIPPING ON ALL ORDERS</span>
        </div>

        <div className="topbar-center">
          <span>💎 100% HALLMARKED</span>
          <span>|</span>
          <span>CERTIFIED JEWELLERY</span>
          <span>|</span>

          <span className="gold-rate">
            🟢 24K ₹{gold24}/g
          </span>

          <span>|</span>

          <span className="silver-rate">
            ⚪ Silver ₹{silver}/kg
          </span>
        </div>

        <div className="topbar-right">
          
          <Link to="/store-locator">
              📍 LOCATE OUR STORES
            </Link>
          {/*<span>📍 LOCATE OUR STORES</span>*/}
          <span>📦 TRACK YOUR ORDER</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;