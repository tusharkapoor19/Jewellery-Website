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

const TROY_OUNCE_TO_GRAM = 31.1035;

const GOLD_PREMIUM = 15.3;
const SILVER_PREMIUM = 27.6;
const PLATINUM_PREMIUM = 15.3;

const TopBar = () => {
  const [gold24, setGold24] = useState("--");
  const [silver, setSilver] = useState("--");
  const [platinum, setPlatinum] = useState("--");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [
          goldResponse,
          silverResponse,
          platinumResponse,
          currencyResponse,
        ] = await Promise.all([
          fetch("https://api.gold-api.com/price/XAU"),
          fetch("https://api.gold-api.com/price/XAG"),
          fetch("https://api.gold-api.com/price/XPT"),
          fetch("https://open.er-api.com/v6/latest/USD"),
        ]);

        if (
          !goldResponse.ok ||
          !silverResponse.ok ||
          !platinumResponse.ok ||
          !currencyResponse.ok
        ) {
          throw new Error("Unable to fetch metal prices");
        }

        const [
          goldData,
          silverData,
          platinumData,
          currencyData,
        ] = await Promise.all([
          goldResponse.json(),
          silverResponse.json(),
          platinumResponse.json(),
          currencyResponse.json(),
        ]);

        const usdToInr = Number(currencyData?.rates?.INR);

        if (!usdToInr) {
          throw new Error("USD to INR rate unavailable");
        }

        /* ================================
           USD / TROY OUNCE → INR / GRAM
        ================================= */
        const goldSpot =
          (Number(goldData.price) * usdToInr) /
          TROY_OUNCE_TO_GRAM;

        const silverSpot =
          (Number(silverData.price) * usdToInr) /
          TROY_OUNCE_TO_GRAM;

        const platinumSpot =
          (Number(platinumData.price) * usdToInr) /
          TROY_OUNCE_TO_GRAM;

        /* ================================
           INDIA MARKET ADJUSTMENT
        ================================= */

        const goldRate =
          goldSpot * (1 + GOLD_PREMIUM / 100);

        const silverRate =
          silverSpot * (1 + SILVER_PREMIUM / 100);

        const platinumRate =
          platinumSpot * (1 + PLATINUM_PREMIUM / 100);

        /* ================================
           DISPLAY
        ================================= */

        setGold24(goldRate.toFixed(2));

        // Silver → ₹ / KG
        setSilver((silverRate * 1000).toFixed(2));

        // Platinum → ₹ / GRAM
        setPlatinum(platinumRate.toFixed(2));

        /* ================================
           STORE RATES
        ================================= */

        localStorage.setItem(
          "goldRate",
          goldRate.toString()
        );

        localStorage.setItem(
          "silverRate",
          silverRate.toString()
        );

        localStorage.setItem(
          "platinumRate",
          platinumRate.toString()
        );

      } catch (error) {
        console.error("Metal price error:", error);
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

        {/* LEFT */}
        <div className="topbar-left">

          <div className="topbar-item shipping-item">

            <Truck size={14} />

            <span>
              FREE INSURED SHIPPING ON ALL ORDERS
            </span>

          </div>

        </div>


        {/* CENTER */}
        <div className="topbar-center">

          <div className="topbar-item">

            <Gem size={14} />

            <span>
              100% HALLMARKED
            </span>

          </div>

          <span className="separator">|</span>

          <span className="certified">
            CERTIFIED JEWELLERY
          </span>

          <span className="separator">|</span>


          {/* GOLD */}
          <div className="topbar-item metal gold-rate">

            <Coins size={14} />

            <span>
              24K ₹{gold24}/g
            </span>

          </div>

          <span className="separator">|</span>


          {/* SILVER */}
          <div className="topbar-item metal silver-rate">

            <Coins size={14} />

            <span>
              Silver ₹{silver}/kg
            </span>

          </div>

          <span className="separator">|</span>


          {/* PLATINUM */}
          <div className="topbar-item metal platinum-rate">

            <Coins size={14} />

            <span>
              Platinum ₹{platinum}/g
            </span>

          </div>

        </div>


        {/* RIGHT */}
        <div className="topbar-right">

          <Link
            to="/store-locator"
            className="topbar-item store-link"
          >

            <MapPin size={14} />

            <span>
              LOCATE OUR STORES
            </span>

          </Link>


          <div className="topbar-item track-item">

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