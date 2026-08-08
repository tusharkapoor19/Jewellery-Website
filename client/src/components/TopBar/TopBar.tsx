import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Gem,
  MapPin,
  PackageSearch,
  Coins,
} from "lucide-react";

import "./TopBar.css";

const TopBar = () => {
  const [gold24, setGold24] = useState("--");
  const [silver, setSilver] = useState("--");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Gold & Silver Price (USD per Troy Ounce)
        const goldRes = await fetch(
          "https://api.gold-api.com/price/XAU"
        );

        const silverRes = await fetch(
          "https://api.gold-api.com/price/XAG"
        );

        // USD -> INR Exchange Rate
        const currencyRes = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        const currencyData = await currencyRes.json();

        const usdToInr = currencyData.rates.INR;

        // Troy Ounce → Gram
        const goldPerGramReal =
          (goldData.price * usdToInr) / 31.1035;

       const silverPerGramReal =
    (silverData.price * usdToInr) / 31.1035;

        // India Approximation
        const goldPerGram =
          goldPerGramReal +
          (goldPerGramReal * 3.91) / 100;

        const silverPerGram =
          silverPerGramReal +
          (silverPerGramReal * 11.4) / 100;

        setGold24(goldPerGram.toFixed(2));
        setSilver((silverPerGram * 1000).toFixed(2));

        localStorage.setItem(
    "goldRate",
    goldPerGram.toString()
);

localStorage.setItem(
    "silverRate",
    silverPerGram.toString()
);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();

    const interval = setInterval(
      fetchRates,
      60000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar">

      <div className="topbar-container">

        {/* Left */}

        <div className="topbar-left topbar-item">

          <Truck size={14} />

          <span>
            FREE INSURED SHIPPING ON ALL ORDERS
          </span>

        </div>

        {/* Center */}

        <div className="topbar-center">

          <div className="topbar-item">

            <Gem size={14} />

            <span>
              100% HALLMARKED
            </span>

          </div>

          <span>|</span>

          <span>
            CERTIFIED JEWELLERY
          </span>

          <span>|</span>

          <div className="topbar-item gold-rate">

            <Coins size={14} />

            <span>
              24K ₹{gold24}/g
            </span>

          </div>

          <span>|</span>

          <div className="topbar-item silver-rate">

            <Coins size={14} />

            <span>
              Silver ₹{silver}/kg
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="topbar-right">

          <Link
            to="/store-locator"
            className="topbar-item topbar-link"
          >

            <MapPin size={14} />

            <span>
              LOCATE OUR STORES
            </span>

          </Link>

          <div className="topbar-item">

            <PackageSearch size={14} />

            <span>
              TRACK YOUR ORDER
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TopBar;