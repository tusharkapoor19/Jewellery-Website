import "./LocationModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string, pin: string) => void;
};

const cities = [
  { city: "Delhi", pin: "110085" },
  { city: "Mumbai", pin: "400001" },
  { city: "Bengaluru", pin: "560001" },
  { city: "Hyderabad", pin: "500001" },
  { city: "Jaipur", pin: "302001" },
  { city: "Chennai", pin: "600001" },
  { city: "Kolkata", pin: "700001" },
  { city: "Pune", pin: "411001" },
];

const LocationModal = ({ isOpen, onClose, onSelect }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="location-overlay" onClick={onClose}>
      <div
        className="location-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="location-header">
          <h2>Select Delivery Location</h2>

          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <button
          className="detect-btn"
          onClick={() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state_district ||
          data.address.state ||
          "Unknown";

        const pin = data.address.postcode || "";

        onSelect(city, pin);

        localStorage.setItem(
          "hiranya_location",
          JSON.stringify({
            city,
            pin,
          })
        );

        onClose();
      } catch (err) {
        console.error(err);
        alert("Unable to detect location.");
      }
    },
    (err) => {
      console.error(err);

      alert("Please allow location permission.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
}}
        >
          <i className="bi bi-crosshair"></i>
          Detect My Current Location
        </button>

        <div className="divider">Popular Cities</div>

        <div className="city-list">
          {cities.map((item) => (
            <button
              key={item.city}
              onClick={() => {
                onSelect(item.city, item.pin);
                onClose();
              }}
            >
              <i className="bi bi-geo-alt-fill"></i>

              {item.city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;