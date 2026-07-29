import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Plus,
  Search,
  SlidersHorizontal,
  MapPin,
  Home,
  Building2
} from "lucide-react";

import toast from "react-hot-toast";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useAddress } from "../../context/AddressContext";
import { Address } from "../../types/address";

import AddressCard from "../../components/AddressCard/AddressCard";
import AddressModal from "../../components/AddressModal/AddressModal";
import DeleteAddressModal from "../../components/DeleteAddressModal/DeleteAddressModal";
import EmptyAddress from "../../components/EmptyAddress/EmptyAddress";
import AddressSkeleton from "../../components/AddressSkeleton/AddressSkeleton";

import "./MyAddresses.css";

const MyAddresses: React.FC = () => {
  const {
    addresses,
    loading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    refreshAddresses
  } = useAddress();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Home" | "Office" | "Other"
  >("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    refreshAddresses();
  }, []);

  const filteredAddresses = useMemo(() => {
    let data = [...addresses];

    if (filter !== "All") {
      data = data.filter((item) => item.addressType === filter);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase().trim();
      data = data.filter(
        (item) =>
          item.fullName.toLowerCase().includes(keyword) ||
          item.city.toLowerCase().includes(keyword) ||
          item.area.toLowerCase().includes(keyword) ||
          item.pincode.includes(keyword)
      );
    }

    data.sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return 0;
    });

    return data;
  }, [addresses, filter, search]);

  const handleAddAddress = async (data: any) => {
    try {
      setSubmitting(true);
      await addAddress(data);
      toast.success("Address added successfully.");
      setModalOpen(false);
    } catch {
      toast.error("Failed to add address.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAddress = async (data: any) => {
    if (!selectedAddress) return;

    try {
      setSubmitting(true);
      await updateAddress(selectedAddress._id, data);
      toast.success("Address updated successfully.");
      setSelectedAddress(null);
      setModalOpen(false);
    } catch {
      toast.error("Failed to update address.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;

    try {
      setDeleting(true);
      await deleteAddress(selectedAddress._id);
      toast.success("Address deleted.");
      setDeleteOpen(false);
      setSelectedAddress(null);
    } catch {
      toast.error("Unable to delete address.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDefault = async (id: string) => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated.");
    } catch {
      toast.error("Unable to update.");
    }
  };

  const openAddModal = () => {
    setSelectedAddress(null);
    setModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setSelectedAddress(address);
    setModalOpen(true);
  };

  const openDeleteModal = (address: Address) => {
    setSelectedAddress(address);
    setDeleteOpen(true);
  };

  return (
    <div className="hiranya-page-wrapper">
      <TopBar />
      <Navbar />

      <div className="hiranya-address-page">
        <div className="hiranya-address-container">
          {/* ================= HEADER / HERO ================= */}
          <div className="hiranya-address-page-header">
            <div>
              <span className="hiranya-page-badge">
                <MapPin size={15} />
                HIRANYA
              </span>
              <h1>My Addresses</h1>
              <p>
                Manage your saved delivery addresses securely for faster
                checkout.
              </p>
            </div>

            <button
              className="hiranya-add-address-btn"
              onClick={openAddModal}
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>

          {/* ================= TOOLBAR ================= */}
          <div className="hiranya-address-toolbar">
            <div className="hiranya-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="hiranya-filter-group">
              <button
                className={filter === "All" ? "active" : ""}
                onClick={() => setFilter("All")}
              >
                <SlidersHorizontal size={16} />
                All
              </button>

              <button
                className={filter === "Home" ? "active" : ""}
                onClick={() => setFilter("Home")}
              >
                <Home size={16} />
                Home
              </button>

              <button
                className={filter === "Office" ? "active" : ""}
                onClick={() => setFilter("Office")}
              >
                <Building2 size={16} />
                Office
              </button>

              <button
                className={filter === "Other" ? "active" : ""}
                onClick={() => setFilter("Other")}
              >
                <MapPin size={16} />
                Other
              </button>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          {loading ? (
            <AddressSkeleton />
          ) : filteredAddresses.length === 0 ? (
            <EmptyAddress onAddAddress={openAddModal} />
          ) : (
            <div className="hiranya-address-grid">
              {filteredAddresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  onSetDefault={handleDefault}
                />
              ))}
            </div>
          )}

          {/* ================= ADD / EDIT MODAL ================= */}
          <AddressModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedAddress(null);
            }}
            editAddress={selectedAddress}
            onSubmit={
              selectedAddress ? handleUpdateAddress : handleAddAddress
            }
          />

          {/* ================= DELETE MODAL ================= */}
          <DeleteAddressModal
            open={deleteOpen}
            loading={deleting}
            addressName={selectedAddress?.fullName}
            onClose={() => {
              setDeleteOpen(false);
              setSelectedAddress(null);
            }}
            onConfirm={handleDeleteAddress}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyAddresses;