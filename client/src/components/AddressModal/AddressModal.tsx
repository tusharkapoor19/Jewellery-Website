import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  X,
  Home,
  Building2,
  MapPin,
  User,
  Phone,
  MapPinned,
  Landmark,
  Map,
  Building,
  Hash,
  Globe,
  Check
} from "lucide-react";

import { Address } from "../../types/address";

import "./AddressModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editAddress?: Address | null;
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry"
];

const emptyForm = {
  fullName: "",
  phone: "",
  houseNumber: "",
  street: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  addressType: "Home",
  isDefault: false
};

const AddressModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  editAddress
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<any>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editAddress) {
      setForm(editAddress);
    } else {
      setForm(emptyForm);
    }
  }, [editAddress, open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Enter a valid full name.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid mobile number.";
    }

    if (form.houseNumber.trim().length < 2) {
      newErrors.houseNumber = "House number required.";
    }

    if (form.street.trim().length < 5) {
      newErrors.street = "Street required.";
    }

    if (form.area.trim().length < 3) {
      newErrors.area = "Area required.";
    }

    if (form.city.trim().length < 2) {
      newErrors.city = "Enter city.";
    }

    if (!form.state) {
      newErrors.state = "Select state.";
    }

    if (!/^[1-9][0-9]{5}$/.test(form.pincode)) {
      newErrors.pincode = "Invalid PIN Code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const { _id, userId, createdAt, updatedAt, ...cleanForm } = form;

      await onSubmit({
        ...cleanForm,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        houseNumber: form.houseNumber.trim(),
        street: form.street.trim(),
        area: form.area.trim(),
        landmark: form.landmark.trim(),
        city: form.city.trim()
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="hiranya-modal-overlay">
      <div className="hiranya-address-modal" ref={modalRef}>
        <div className="hiranya-modal-header">
          <div>
            <h2>{editAddress ? "Edit Address" : "Add New Address"}</h2>
            <p>Securely save your delivery address.</p>
          </div>

          <button className="hiranya-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="hiranya-modal-body">
          <div className="hiranya-address-grid">
            {/* Full Name */}
            <div className="hiranya-field">
              <label>
                <User size={16} />
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                value={form.fullName}
                maxLength={50}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value
                  })
                }
              />

              {errors.fullName && (
                <span className="hiranya-error">{errors.fullName}</span>
              )}
            </div>

            {/* Phone */}
            <div className="hiranya-field">
              <label>
                <Phone size={16} />
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="10 digit mobile number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, "")
                  })
                }
              />

              {errors.phone && (
                <span className="hiranya-error">{errors.phone}</span>
              )}
            </div>

            {/* House */}
            <div className="hiranya-field">
              <label>
                <Hash size={16} />
                House / Flat No.
              </label>

              <input
                type="text"
                placeholder="A-203"
                value={form.houseNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    houseNumber: e.target.value
                  })
                }
              />

              {errors.houseNumber && (
                <span className="hiranya-error">{errors.houseNumber}</span>
              )}
            </div>

            {/* Street */}
            <div className="hiranya-field">
              <label>
                <Map size={16} />
                Street
              </label>

              <input
                type="text"
                placeholder="Street / Road"
                value={form.street}
                onChange={(e) =>
                  setForm({
                    ...form,
                    street: e.target.value
                  })
                }
              />

              {errors.street && (
                <span className="hiranya-error">{errors.street}</span>
              )}
            </div>

            {/* Area */}
            <div className="hiranya-field hiranya-full">
              <label>
                <MapPinned size={16} />
                Area / Locality
              </label>

              <input
                type="text"
                placeholder="Area"
                value={form.area}
                onChange={(e) =>
                  setForm({
                    ...form,
                    area: e.target.value
                  })
                }
              />

              {errors.area && (
                <span className="hiranya-error">{errors.area}</span>
              )}
            </div>

            {/* Landmark */}
            <div className="hiranya-field hiranya-full">
              <label>
                <Landmark size={16} />
                Landmark
              </label>

              <input
                type="text"
                placeholder="Optional"
                value={form.landmark}
                onChange={(e) =>
                  setForm({
                    ...form,
                    landmark: e.target.value
                  })
                }
              />
            </div>

            {/* City */}
            <div className="hiranya-field">
              <label>
                <Building size={16} />
                City
              </label>

              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value
                  })
                }
              />

              {errors.city && (
                <span className="hiranya-error">{errors.city}</span>
              )}
            </div>

            {/* State */}
            <div className="hiranya-field">
              <label>
                <MapPinned size={16} />
                State
              </label>

              <select
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value
                  })
                }
              >
                <option value="">Select State</option>

                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {errors.state && (
                <span className="hiranya-error">{errors.state}</span>
              )}
            </div>

            {/* Pincode */}
            <div className="hiranya-field">
              <label>
                <Hash size={16} />
                PIN Code
              </label>

              <input
                type="text"
                maxLength={6}
                placeholder="110001"
                value={form.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode: e.target.value.replace(/\D/g, "")
                  })
                }
              />

              {errors.pincode && (
                <span className="hiranya-error">{errors.pincode}</span>
              )}
            </div>

            {/* Country */}
            <div className="hiranya-field">
              <label>
                <Globe size={16} />
                Country
              </label>

              <input type="text" value="India" disabled />
            </div>
          </div>

          {/* Address Type */}
          <div className="hiranya-address-type-selector">
            <label>Address Type</label>

            <div className="hiranya-chip-group">
              <button
                type="button"
                className={
                  form.addressType === "Home"
                    ? "hiranya-chip active"
                    : "hiranya-chip"
                }
                onClick={() =>
                  setForm({
                    ...form,
                    addressType: "Home"
                  })
                }
              >
                <Home size={16} />
                Home
              </button>

              <button
                type="button"
                className={
                  form.addressType === "Office"
                    ? "hiranya-chip active"
                    : "hiranya-chip"
                }
                onClick={() =>
                  setForm({
                    ...form,
                    addressType: "Office"
                  })
                }
              >
                <Building2 size={16} />
                Office
              </button>

              <button
                type="button"
                className={
                  form.addressType === "Other"
                    ? "hiranya-chip active"
                    : "hiranya-chip"
                }
                onClick={() =>
                  setForm({
                    ...form,
                    addressType: "Other"
                  })
                }
              >
                <MapPin size={16} />
                Other
              </button>
            </div>
          </div>

          {/* Default Address */}
          <div className="hiranya-default-option">
            <label>
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isDefault: e.target.checked
                  })
                }
              />
              Make this my default address
            </label>
          </div>
        </div>

        <div className="hiranya-modal-footer">
          <button className="hiranya-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="hiranya-save-btn"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? "Saving..."
              : editAddress
              ? "Update Address"
              : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;