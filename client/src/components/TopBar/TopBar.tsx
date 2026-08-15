import { Link } from "react-router-dom";
import {
  Truck,
  Gem,
  MapPin,
  PackageSearch,
  Coins,
} from "lucide-react";

import { useLiveMetalRates } from "../../services/pricing/liveMetalRates";
import "./TopBar.css";

// Rate fetching itself lives in services/pricing/liveMetalRates.ts, shared
// with the Custom Design configurator (Material/Purity steps, cost
// breakdown, AI estimator) so every live price shown across the app comes
// from the exact same feed and never drifts apart between pages.
const TopBar = () => {
  const { rates, loading } = useLiveMetalRates();

  const gold24 = loading ? "--" : rates.gold.toFixed(2);
  const silver = loading ? "--" : (rates.silver * 1000).toFixed(2); // ₹/kg
  const platinum = loading ? "--" : rates.platinum.toFixed(2); // ₹/g

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