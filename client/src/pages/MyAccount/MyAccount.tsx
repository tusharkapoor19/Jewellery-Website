import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    UserRound,
    Mail,
    Phone,
    MapPinned,
    ShieldCheck,
    LockKeyhole,
    Eye,
    EyeOff,
    BadgeCheck,
    BadgeAlert,
    Save,
    PencilLine,
    Trash2,
    CircleCheckBig,
    CircleAlert,
    LoaderCircle,
    ChevronRight,
    KeyRound,
    SendHorizonal,
    Lock,
    ArrowRight,
    Plus,
    Home,
    Building2,
    MapPin,
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useAddress } from "../../context/AddressContext";
import { useAuth } from "../../context/AuthContext";

import "./MyAccount.css";

/* ===================================================
    This page talks to the following backend routes
    (mounted under /profile):

    GET     /profile/profile
    PATCH   /profile/name             { name }
    PATCH   /profile/email            { email }
    PATCH   /profile/phone            { phone }
    PATCH   /profile/password         { currentPassword, newPassword }
    DELETE  /profile/delete
    POST    /profile/send-email-otp
    POST    /profile/verify-email-otp { otp, newEmail }
    POST    /profile/send-phone-otp
    POST    /profile/verify-phone-otp { otp, newPhone }

    GET /profile/profile is the single source of truth
    for name / email / phone. Address management is handled
    exclusively via AddressContext.
=================================================== */

/* ===================================================
                CONFIG
=================================================== */

const REACT_APP_USER_SERVICE_URL = "http://localhost:5005"
console.log("User Service URL:", REACT_APP_USER_SERVICE_URL);
const API_BASE_URL = REACT_APP_USER_SERVICE_URL

const PROFILE_API = `${API_BASE_URL}/profile`;

const TOKEN_STORAGE_KEY = "token";

/* ===================================================
                API LAYER
=================================================== */

class ApiError extends Error {}

async function apiRequest<T>(
    path: string,
    method: "GET" | "PATCH" | "POST" | "DELETE",
    body?: unknown
): Promise<T> {

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    const res = await fetch(`${PROFILE_API}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let data: any = null;
    try {
        data = await res.json();
    } catch {
        // Some responses may not return a body; that's fine.
    }

    if (!res.ok) {
        throw new ApiError(
            data?.message || "Something went wrong. Please try again."
        );
    }

    return data as T;
}

interface ProfileResponse {
    success: boolean;
    user: {
        name: string;
        email: string;
        phone: string;
        role?: string;
    };
}

const api = {
    getProfile: () => apiRequest<ProfileResponse>("/profile", "GET"),

    updateName: (name: string) =>
        apiRequest<{ message: string }>(
            "/name",
            "PATCH",
            { name }
        ),

    updatePassword: (currentPassword: string, newPassword: string) =>
        apiRequest<{ message: string }>("/password", "PATCH", {
            currentPassword,
            newPassword,
        }),

    sendEmailOtp: (newEmail: string) =>
        apiRequest<{ message: string }>(
            "/send-email-otp",
            "POST",
            { newEmail }
        ),

    verifyEmailOtp: (otp: string, newEmail: string) =>
        apiRequest<{ message: string }>(
            "/verify-email-otp",
            "POST",
            { otp, newEmail }
        ),

    sendPhoneOtp: (newPhone: string) =>
        apiRequest<{ success: boolean; message: string }>(
            "/send-phone-otp",
            "POST",
            { newPhone }
        ),

    verifyPhoneOtp: (otp: string, newPhone: string) =>
        apiRequest<{ success: boolean; message: string }>(
            "/verify-phone-otp",
            "POST",
            { otp, newPhone }
        ),

    deleteAccount: () =>
        apiRequest<{ message: string }>("/delete", "DELETE"),
};

/* ===================================================
                VALIDATION HELPERS
=================================================== */

const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9][0-9]{9}$/;

const validateName = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Name is required.";
    if (/\s{2,}/.test(value)) return "Remove extra spaces between words.";
    if (trimmed.length < 3) return "Name must be at least 3 characters.";
    if (trimmed.length > 50) return "Name cannot exceed 50 characters.";
    if (!NAME_REGEX.test(trimmed))
        return "Only alphabets and single spaces are allowed.";
    return "";
};

const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required.";
    if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address.";
    return "";
};

const validatePhone = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Phone number is required.";
    if (!PHONE_REGEX.test(trimmed))
        return "Enter a valid 10-digit number starting with 6, 7, 8 or 9.";
    return "";
};

const validateOtp = (value: string): string => {
    if (!value.trim()) return "Enter the OTP.";
    if (!/^[0-9]{6}$/.test(value.trim())) return "OTP must be 6 digits.";
    return "";
};

const getPasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
};

const validateNewPassword = (value: string): string => {
    if (!value) return "New password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Include at least one lowercase letter.";
    if (!/[0-9]/.test(value)) return "Include at least one number.";
    if (!/[^A-Za-z0-9]/.test(value))
        return "Include at least one special character.";
    return "";
};

const maskEmail = (email: string): string => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(local.length - 2, 2))}@${domain}`;
};

const maskPhone = (phone: string): string => {
    if (!phone) return "";
    if (phone.length < 4) return phone;
    return `${"*".repeat(phone.length - 2)}${phone.slice(-2)}`;
};

/* ===================================================
                TYPES
=================================================== */

interface FieldErrors {
    [key: string]: string;
}

interface Profile {
    name: string;
    email: string;
    phone: string;
}

const EMPTY_PROFILE: Profile = {
    name: "",
    email: "",
    phone: "",
};

type OtpFlowStep = "idle" | "sent" | "verified";
type ContactKind = "email" | "phone";

/* ===================================================
                MAIN COMPONENT
=================================================== */

const MyAccount = () => {

    const navigate = useNavigate();
    const { authProvider } = useAuth();
    const { addresses, loading: addressLoading, refreshAddresses } = useAddress();

    /* ---------- Refs for smooth scroll ---------- */
    const profileRef = useRef<HTMLElement | null>(null);
    const addressRef = useRef<HTMLElement | null>(null);
    const securityRef = useRef<HTMLElement | null>(null);
    const verificationRef = useRef<HTMLElement | null>(null);

    const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    /* ===================================================
        PROFILE (name / email / phone)

        Single source of truth, fetched from
        GET /profile/profile on mount and re-fetched
        after every successful mutation below.
    =================================================== */

    const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileLoadError, setProfileLoadError] = useState(false);

    const fetchProfile = async () => {
        try {
            setProfileLoading(true);
            setProfileLoadError(false);
            const res = await api.getProfile();
            setProfile({
                name: res.user?.name || "",
                email: res.user?.email || "",
                phone: res.user?.phone || "",
            });
        } catch (err) {
            setProfileLoadError(true);
        } finally {
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        refreshAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const defaultAddress = useMemo(() => {
        if (!addresses || addresses.length === 0) return null;
        return addresses.find((addr) => addr.isDefault) || addresses[0];
    }, [addresses]);

    const renderAddressTypeIcon = (type?: string) => {
        switch (type) {
            case "Home":
                return <Home size={16} />;
            case "Office":
                return <Building2 size={16} />;
            default:
                return <MapPin size={16} />;
        }
    };

    /* ===================================================
                    NAME (Personal Information)
    =================================================== */

    const [nameEditing, setNameEditing] = useState(false);
    const [nameDraft, setNameDraft] = useState("");
    const [nameError, setNameError] = useState("");
    const [nameSaving, setNameSaving] = useState(false);

    const startNameEdit = () => {
        setNameDraft(profile.name);
        setNameError("");
        setNameEditing(true);
    };

    const cancelNameEdit = () => {
        setNameDraft(profile.name);
        setNameError("");
        setNameEditing(false);
    };

    const submitName = async () => {

        const error = validateName(nameDraft);
        setNameError(error);
        if (error) {
            toast.error("Please fix the highlighted field.");
            return;
        }

        if (nameSaving) return;

        const trimmedName = nameDraft.trim().replace(/\s+/g, " ");

        try {
            setNameSaving(true);
            await api.updateName(trimmedName);
            await fetchProfile();
            setNameEditing(false);
            toast.success("Name updated successfully.");
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Could not update name."
            );
        } finally {
            setNameSaving(false);
        }

    };

    /* ===================================================
                    PASSWORD
    =================================================== */

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<FieldErrors>({});
    const [passwordSaving, setPasswordSaving] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordStrength = useMemo(
        () => getPasswordStrength(newPassword),
        [newPassword]
    );

    const strengthLabel = useMemo(() => {
        if (!newPassword) return "";
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 4) return "Moderate";
        return "Strong";
    }, [passwordStrength, newPassword]);

    const submitPassword = async () => {

        const errors: FieldErrors = {
            currentPassword: currentPassword
                ? ""
                : "Current password is required.",
            newPassword: validateNewPassword(newPassword),
            confirmPassword:
                confirmPassword !== newPassword
                    ? "Passwords do not match."
                    : "",
        };

        setPasswordErrors(errors);

        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) {
            toast.error("Please fix the highlighted fields.");
            return;
        }

        if (passwordSaving) return;

        try {
            setPasswordSaving(true);
            await api.updatePassword(currentPassword, newPassword);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordErrors({});
            toast.success("Password changed successfully.");
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Could not change password."
            );
        } finally {
            setPasswordSaving(false);
        }

    };

    /* ===================================================
        EMAIL / PHONE VERIFICATION + UPDATE

        Email:
        New email -> OTP sent to current email -> verify -> saved

        Phone:
        New phone -> OTP sent to new phone -> verify -> saved
    =================================================== */

    const [pendingFlow, setPendingFlow] = useState<ContactKind | null>(null);

    // Email flow
    const [emailStep, setEmailStep] = useState<OtpFlowStep>("idle");
    const [emailOtp, setEmailOtp] = useState("");
    const [emailOtpError, setEmailOtpError] = useState("");
    const [emailSending, setEmailSending] = useState(false);
    const [emailVerifying, setEmailVerifying] = useState(false);
    const [emailTimer, setEmailTimer] = useState(0);
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState("");

    // Phone flow
    const [phoneStep, setPhoneStep] = useState<OtpFlowStep>("idle");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [phoneOtpError, setPhoneOtpError] = useState("");
    const [phoneSending, setPhoneSending] = useState(false);
    const [phoneVerifying, setPhoneVerifying] = useState(false);
    const [phoneTimer, setPhoneTimer] = useState(0);
    const [newPhone, setNewPhone] = useState("");
    const [newPhoneError, setNewPhoneError] = useState("");

    useEffect(() => {
        if (emailTimer <= 0) return;

        const interval = setInterval(() => {
            setEmailTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [emailTimer]);

    useEffect(() => {
        if (phoneTimer <= 0) return;

        const interval = setInterval(() => {
            setPhoneTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [phoneTimer]);

    const resetEmailFlow = () => {
        setEmailStep("idle");
        setEmailOtp("");
        setEmailOtpError("");
        setNewEmail("");
        setNewEmailError("");
        setEmailTimer(0);

        if (pendingFlow === "email") {
            setPendingFlow(null);
        }
    };

    const resetPhoneFlow = () => {
        setPhoneStep("idle");
        setPhoneOtp("");
        setPhoneOtpError("");
        setNewPhone("");
        setNewPhoneError("");
        setPhoneTimer(0);

        if (pendingFlow === "phone") {
            setPendingFlow(null);
        }
    };

    /* ---------------- EMAIL ---------------- */

    const sendEmailOtp = async () => {
        if (emailSending || emailTimer > 0) return;

        if (pendingFlow === "phone") {
            toast.error(
                "Finish or cancel your phone update first — verification is shared."
            );
            return;
        }

        const error = validateEmail(newEmail);
        setNewEmailError(error);

        if (error) return;

        const trimmedEmail = newEmail.trim().toLowerCase();

        if (
            profile.email &&
            trimmedEmail === profile.email.trim().toLowerCase()
        ) {
            setNewEmailError(
                "New email must be different from your current email."
            );
            return;
        }

        try {
            setEmailSending(true);

            await api.sendEmailOtp(trimmedEmail);

            setEmailStep("sent");
            setEmailTimer(30);
            setPendingFlow("email");

            toast.success("OTP sent to your current email address.");
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Failed to send email OTP."
            );
        } finally {
            setEmailSending(false);
        }
    };

    const verifyEmailOtp = async () => {
        const error = validateOtp(emailOtp);
        setEmailOtpError(error);

        if (error) return;

        try {
            setEmailVerifying(true);

            await api.verifyEmailOtp(
                emailOtp.trim(),
                newEmail.trim().toLowerCase()
            );
            await fetchProfile();

            toast.success("Email updated successfully.");
            resetEmailFlow();
        } catch (err) {
            setEmailOtpError("");

            toast.error(
                err instanceof Error ? err.message : "Incorrect OTP."
            );
        } finally {
            setEmailVerifying(false);
        }
    };

    /* ---------------- PHONE ---------------- */

    const sendPhoneOtp = async () => {
        if (phoneSending || phoneTimer > 0) return;

        if (pendingFlow === "email") {
            toast.error(
                "Finish or cancel your email update first — verification is shared."
            );
            return;
        }

        const error = validatePhone(newPhone);
        setNewPhoneError(error);

        if (error) return;

        const trimmedPhone = newPhone.trim();

        if (profile.phone && trimmedPhone === profile.phone.trim()) {
            setNewPhoneError(
                "New phone number must be different from your current number."
            );
            return;
        }

        try {
            setPhoneSending(true);

            await api.sendPhoneOtp(trimmedPhone);

            setPhoneStep("sent");
            setPhoneTimer(30);
            setPendingFlow("phone");

            toast.success("OTP sent to your new phone number.");
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Failed to send phone OTP."
            );
        } finally {
            setPhoneSending(false);
        }
    };

    const verifyPhoneOtp = async () => {
        const error = validateOtp(phoneOtp);
        setPhoneOtpError(error);

        if (error) return;

        try {
            setPhoneVerifying(true);

            await api.verifyPhoneOtp(
                phoneOtp.trim(),
                newPhone.trim()
            );
            await fetchProfile();

            toast.success("Phone number updated successfully.");
            resetPhoneFlow();
        } catch (err) {
            setPhoneOtpError("");

            toast.error(
                err instanceof Error ? err.message : "Incorrect OTP."
            );
        } finally {
            setPhoneVerifying(false);
        }
    };

    /* ===================================================
                    DANGER ZONE
    =================================================== */

    const [dangerAcknowledged, setDangerAcknowledged] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [deleting, setDeleting] = useState(false);

    const deleteEnabled =
        dangerAcknowledged && deleteConfirmText.trim() === "DELETE" && !deleting;

    const submitDeleteAccount = async () => {
        if (!deleteEnabled) return;
        try {
            setDeleting(true);
            await api.deleteAccount();
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            window.dispatchEvent(new Event("auth-change"));
            toast.success("Your account has been deleted.");
            navigate("/");
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Could not delete account."
            );
        } finally {
            setDeleting(false);
        }
    };

    /* ===================================================
                    RENDER HELPERS
    =================================================== */

    const renderBadge = (step: OtpFlowStep) => {
        if (step === "verified") {
            return (
                <span className="verify-badge verify-badge-success">
                    <BadgeCheck size={14} /> Verified
                </span>
            );
        }
        if (step === "sent") {
            return (
                <span className="verify-badge verify-badge-pending">
                    <BadgeAlert size={14} /> Code Sent
                </span>
            );
        }
        return (
            <span className="verify-badge verify-badge-pending">
                <BadgeAlert size={14} /> Not Started
            </span>
        );
    };

    /* ===================================================
                        JSX
    =================================================== */

    return (
        <>

            <TopBar />
            <Navbar />

            <section className="account-hero">

                <div className="hero-overlay"></div>
                <div className="hero-glow"></div>

                <div className="account-hero-content">

                    <span>HIRANYA • MY ACCOUNT</span>

                    <h1>
                        Welcome Back,
                        <br />
                        {profile.name
                            ? profile.name.split(" ")[0]
                            : "Valued Member"}
                    </h1>

                    <p>
                        Manage your account, addresses,
                        security and personal information
                        in one elegant, secure place.
                    </p>

                </div>

            </section>

            <section className="account-page">

                {/* =========================================
                        ACCOUNT OVERVIEW
                ========================================= */}

                <div className="overview-grid">

                    <button className="overview-card" onClick={() => scrollTo(profileRef)}>
                        <div className="overview-icon">
                            <UserRound size={26} />
                        </div>
                        <h3>Profile</h3>
                        <p>Name, email and phone details</p>
                        <ChevronRight size={16} className="overview-arrow" />
                    </button>

                    <button className="overview-card" onClick={() => scrollTo(addressRef)}>
                        <div className="overview-icon">
                            <MapPinned size={26} />
                        </div>
                        <h3>Address</h3>
                        <p>Manage your saved address</p>
                        <ChevronRight size={16} className="overview-arrow" />
                    </button>

                    {authProvider === "local" && (
                        <button className="overview-card" onClick={() => scrollTo(securityRef)}>
                            <div className="overview-icon">
                                <LockKeyhole size={26} />
                            </div>
                            <h3>Security</h3>
                            <p>Update your account password</p>
                            <ChevronRight size={16} className="overview-arrow" />
                        </button>
                    )}

                    <button className="overview-card" onClick={() => scrollTo(verificationRef)}>
                        <div className="overview-icon">
                            <ShieldCheck size={26} />
                        </div>
                        <h3>Verification</h3>
                        <p>Verify your email and phone</p>
                        <ChevronRight size={16} className="overview-arrow" />
                    </button>

                </div>

                {/* =========================================
                        PERSONAL INFORMATION
                ========================================= */}

                <section className="account-section" ref={profileRef}>

                    <div className="account-section-header">
                        <div>
                            <span className="account-section-tag">PERSONAL INFORMATION</span>
                            <h2>Your Profile</h2>
                        </div>

                        {!nameEditing && !profileLoading && !profileLoadError && (
                            <button className="ghost-btn" onClick={startNameEdit}>
                                <PencilLine size={16} />
                                Edit Name
                            </button>
                        )}
                    </div>

                    <div className="account-card">

                        {profileLoading && (
                            <div className="account-loading">
                                <LoaderCircle size={22} className="spin" />
                                Loading your profile...
                            </div>
                        )}

                        {!profileLoading && profileLoadError && (
                            <div className="account-load-error">
                                <CircleAlert size={20} />
                                <p>We couldn't load your profile.</p>
                                <button className="outline-btn" onClick={fetchProfile}>
                                    Retry
                                </button>
                            </div>
                        )}

                        {!profileLoading && !profileLoadError && (
                            <>

                                <div className="avatar-block">
                                    <div className="avatar-circle">
                                        <UserRound size={40} />
                                    </div>
                                    <div>
                                        <h4>{profile.name || "Add your name"}</h4>
                                        <p>{profile.email || "No email on file"}</p>
                                    </div>
                                </div>

                                <div className="form-grid">

                                    <div className="form-field">
                                        <label>
                                            <UserRound size={14} /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={nameEditing ? nameDraft : profile.name}
                                            disabled={!nameEditing}
                                            placeholder="Enter your full name"
                                            className={
                                                nameEditing && nameError
                                                    ? "input-error"
                                                    : nameEditing && nameDraft
                                                    ? "input-success"
                                                    : ""
                                            }
                                            onChange={(e) => setNameDraft(e.target.value)}
                                        />
                                        {nameEditing && nameError && (
                                            <span className="field-error">
                                                <CircleAlert size={12} /> {nameError}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <label>
                                            <Mail size={14} /> Email Address
                                        </label>
                                        <div className="field-static">
                                            <span className="field-static-value">
                                                <Mail size={14} />
                                                {profile.email || "No email on file"}
                                            </span>
                                            <button
                                                type="button"
                                                className="field-change-btn"
                                                onClick={() => scrollTo(verificationRef)}
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field">
                                        <label>
                                            <Phone size={14} /> Phone Number
                                        </label>
                                        <div className="field-static">
                                            <span className="field-static-value">
                                                <Phone size={14} />
                                                {profile.phone || "No phone number on file"}
                                            </span>
                                            <button
                                                type="button"
                                                className="field-change-btn"
                                                onClick={() => scrollTo(verificationRef)}
                                            >
                                                {profile.phone ? "Change" : "Add Phone"}
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                {nameEditing && (
                                    <div className="form-actions">

                                        <button
                                            className="outline-btn"
                                            onClick={cancelNameEdit}
                                            disabled={nameSaving}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="gold-btn"
                                            onClick={submitName}
                                            disabled={nameSaving}
                                        >
                                            {nameSaving ? (
                                                <>
                                                    <LoaderCircle size={16} className="spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>

                                    </div>
                                )}

                            </>
                        )}

                    </div>

                </section>

                {/* =========================================
                        SAVED ADDRESS
                ========================================= */}

                <section className="account-section" ref={addressRef}>

                    <div className="account-section-header">
                        <div>
                            <span className="account-section-tag">DELIVERY DETAILS</span>
                            <h2>Saved Address</h2>
                        </div>

                        <button
                            className="ghost-btn"
                            onClick={() => navigate("/addresses")}
                        >
                            Manage Addresses
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="account-card">

                        {addressLoading ? (
                            <div className="account-loading">
                                <LoaderCircle size={22} className="spin" />
                                Loading default address...
                            </div>
                        ) : defaultAddress ? (
                            <div className="hiranya-default-address-box">
                                <div className="hiranya-address-tag-row">
                                    <span className="hiranya-address-type">
                                        {renderAddressTypeIcon(defaultAddress.addressType)}
                                        {defaultAddress.addressType}
                                    </span>
                                    {defaultAddress.isDefault && (
                                        <span className="hiranya-default-badge">Default</span>
                                    )}
                                </div>

                                <h3 className="hiranya-address-name">
                                    {defaultAddress.fullName}
                                </h3>

                                <p className="hiranya-address-phone">
                                    <Phone size={14} />
                                    {defaultAddress.phone}
                                </p>

                                <p className="hiranya-address-text">
                                    {defaultAddress.houseNumber}, {defaultAddress.street},{" "}
                                    {defaultAddress.area}
                                    {defaultAddress.landmark
                                        ? `, ${defaultAddress.landmark}`
                                        : ""}
                                    , {defaultAddress.city}, {defaultAddress.state} -{" "}
                                    {defaultAddress.pincode}, {defaultAddress.country}
                                </p>
                            </div>
                        ) : (
                            <div className="hiranya-empty-address-box">

                                <p>No default address found.</p>

                                <button
                                    className="gold-btn"
                                    onClick={() => navigate("/addresses")}
                                >
                                    <Plus size={16} />
                                    Add Address
                                </button>

                            </div>
                        )}

                    </div>

                </section>

                {/* =========================================
                        SECURITY
                ========================================= */}

                {authProvider === "local" && (
                    <section className="account-section" ref={securityRef}>

                    <div className="account-section-header">
                        <div>
                            <span className="account-section-tag">ACCOUNT SECURITY</span>
                            <h2>Change Password</h2>
                        </div>
                    </div>

                    <div className="account-card">

                        <div className="form-grid">

                            <div className="form-field form-field-wide">
                                <label>
                                    <KeyRound size={14} /> Current Password
                                </label>
                                <div className="password-input">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        placeholder="Enter current password"
                                        className={
                                            passwordErrors.currentPassword ? "input-error" : ""
                                        }
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="eye-toggle"
                                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                                        aria-label="Toggle current password visibility"
                                    >
                                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {passwordErrors.currentPassword && (
                                    <span className="field-error">
                                        <CircleAlert size={12} /> {passwordErrors.currentPassword}
                                    </span>
                                )}
                            </div>

                            <div className="form-field">
                                <label>
                                    <LockKeyhole size={14} /> New Password
                                </label>
                                <div className="password-input">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        placeholder="Enter new password"
                                        className={passwordErrors.newPassword ? "input-error" : ""}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="eye-toggle"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        aria-label="Toggle new password visibility"
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {newPassword && (
                                    <div className="strength-meter">
                                        <div className="strength-track">
                                            <div
                                                className={`strength-fill strength-${strengthLabel.toLowerCase()}`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span
                                            className={`strength-label strength-text-${strengthLabel.toLowerCase()}`}
                                        >
                                            {strengthLabel}
                                        </span>
                                    </div>
                                )}

                                {passwordErrors.newPassword && (
                                    <span className="field-error">
                                        <CircleAlert size={12} /> {passwordErrors.newPassword}
                                    </span>
                                )}
                            </div>

                            <div className="form-field">
                                <label>
                                    <LockKeyhole size={14} /> Confirm New Password
                                </label>
                                <div className="password-input">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder="Re-enter new password"
                                        className={
                                            passwordErrors.confirmPassword ? "input-error" : ""
                                        }
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="eye-toggle"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {passwordErrors.confirmPassword && (
                                    <span className="field-error">
                                        <CircleAlert size={12} /> {passwordErrors.confirmPassword}
                                    </span>
                                )}
                            </div>

                        </div>

                        <div className="form-actions">
                            <button
                                className="gold-btn"
                                onClick={submitPassword}
                                disabled={passwordSaving}
                            >
                                {passwordSaving ? (
                                    <>
                                        <LoaderCircle size={16} className="spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={16} />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>

                    </div>

                    </section>
                )}

                {/* =========================================
                        VERIFICATION
                ========================================= */}

                <section className="account-section" ref={verificationRef}>

                    <div className="account-section-header">
                        <div>
                            <span className="account-section-tag">TRUST & SAFETY</span>
                            <h2>Verification</h2>
                        </div>
                    </div>

                    <div className="verification-grid">

                        {/* EMAIL VERIFICATION / UPDATE CARD */}
                        <div className="verify-card">

                            <div className="verify-card-header">
                                <div className="verify-icon">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <h4>Update Email</h4>
                                    <p>{profile.email ? maskEmail(profile.email) : "No email on file"}</p>
                                </div>
                                {renderBadge(emailStep)}
                            </div>

                            <div className="verify-card-body">

                                {pendingFlow === "phone" && emailStep === "idle" && (
                                    <span className="flow-locked-note">
                                        <Lock size={14} />
                                        Finish or cancel your phone update first.
                                    </span>
                                )}

                                {emailStep === "idle" && (
                                    <>
                                        <p className="otp-hint">
                                            Enter your new email address. We'll send
                                            a verification code to your current email.
                                        </p>

                                        <div className="new-value-row">
                                            <input
                                                type="email"
                                                placeholder="New email address"
                                                value={newEmail}
                                                onChange={(e) => {
                                                    setNewEmail(e.target.value);
                                                    if (newEmailError) setNewEmailError("");
                                                }}
                                            />
                                        </div>

                                        {newEmailError && (
                                            <span className="field-error">
                                                <CircleAlert size={12} /> {newEmailError}
                                            </span>
                                        )}

                                        <button
                                            className="gold-btn verify-btn"
                                            onClick={sendEmailOtp}
                                            disabled={emailSending || pendingFlow === "phone"}
                                        >
                                            {emailSending ? (
                                                <>
                                                    <LoaderCircle size={16} className="spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <SendHorizonal size={16} />
                                                    Send OTP
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}

                                {emailStep === "sent" && (
                                    <>
                                        <p className="otp-hint">
                                            We've sent a 6-digit OTP to your current email address.
                                        </p>

                                        <div className="otp-row">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={6}
                                                placeholder="Enter 6-digit OTP"
                                                value={emailOtp}
                                                onChange={(e) =>
                                                    setEmailOtp(
                                                        e.target.value.replace(/[^0-9]/g, "")
                                                    )
                                                }
                                            />

                                            <button
                                                className="outline-btn"
                                                onClick={sendEmailOtp}
                                                disabled={emailSending || emailTimer > 0}
                                            >
                                                {emailTimer > 0
                                                    ? `Resend in ${emailTimer}s`
                                                    : "Resend"}
                                            </button>
                                        </div>

                                        {emailOtpError && (
                                            <span className="field-error">
                                                <CircleAlert size={12} /> {emailOtpError}
                                            </span>
                                        )}

                                        <div
                                            className="form-actions"
                                            style={{
                                                marginTop: 0,
                                                paddingTop: 0,
                                                borderTop: "none",
                                            }}
                                        >
                                            <button
                                                className="outline-btn"
                                                onClick={resetEmailFlow}
                                                disabled={emailVerifying}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                className="gold-btn"
                                                onClick={verifyEmailOtp}
                                                disabled={emailVerifying}
                                            >
                                                {emailVerifying ? (
                                                    <>
                                                        <LoaderCircle size={16} className="spin" />
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CircleCheckBig size={16} />
                                                        Verify & Update
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>

                        </div>

                        {/* PHONE VERIFICATION / UPDATE CARD */}
                        <div className="verify-card">

                            <div className="verify-card-header">
                                <div className="verify-icon">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <h4>Update Phone</h4>
                                    <p>{profile.phone ? maskPhone(profile.phone) : "No phone number on file"}</p>
                                </div>
                                {renderBadge(phoneStep)}
                            </div>

                            <div className="verify-card-body">

                                {pendingFlow === "email" && phoneStep === "idle" && (
                                    <span className="flow-locked-note">
                                        <Lock size={14} />
                                        Finish or cancel your email update first.
                                    </span>
                                )}

                                {phoneStep === "idle" && (
                                    <>
                                        <p className="otp-hint">
                                            Enter your new 10-digit phone number.
                                            We'll send the verification OTP to it.
                                        </p>

                                        <div className="new-value-row">
                                            <input
                                                type="tel"
                                                inputMode="numeric"
                                                maxLength={10}
                                                placeholder="New 10-digit phone number"
                                                value={newPhone}
                                                onChange={(e) => {
                                                    setNewPhone(
                                                        e.target.value.replace(/[^0-9]/g, "")
                                                    );
                                                    if (newPhoneError) setNewPhoneError("");
                                                }}
                                            />
                                        </div>

                                        {newPhoneError && (
                                            <span className="field-error">
                                                <CircleAlert size={12} /> {newPhoneError}
                                            </span>
                                        )}

                                        <button
                                            className="gold-btn verify-btn"
                                            onClick={sendPhoneOtp}
                                            disabled={phoneSending || pendingFlow === "email"}
                                        >
                                            {phoneSending ? (
                                                <>
                                                    <LoaderCircle size={16} className="spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <SendHorizonal size={16} />
                                                    Send OTP
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}

                                {phoneStep === "sent" && (
                                    <>
                                        <p className="otp-hint">
                                            We've sent a 6-digit OTP to your new phone number.
                                        </p>

                                        <div className="otp-row">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={6}
                                                placeholder="Enter 6-digit OTP"
                                                value={phoneOtp}
                                                onChange={(e) =>
                                                    setPhoneOtp(
                                                        e.target.value.replace(/[^0-9]/g, "")
                                                    )
                                                }
                                            />

                                            <button
                                                className="outline-btn"
                                                onClick={sendPhoneOtp}
                                                disabled={phoneSending || phoneTimer > 0}
                                            >
                                                {phoneTimer > 0
                                                    ? `Resend in ${phoneTimer}s`
                                                    : "Resend"}
                                            </button>
                                        </div>

                                        {phoneOtpError && (
                                            <span className="field-error">
                                                <CircleAlert size={12} /> {phoneOtpError}
                                            </span>
                                        )}

                                        <div
                                            className="form-actions"
                                            style={{
                                                marginTop: 0,
                                                paddingTop: 0,
                                                borderTop: "none",
                                            }}
                                        >
                                            <button
                                                className="outline-btn"
                                                onClick={resetPhoneFlow}
                                                disabled={phoneVerifying}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                className="gold-btn"
                                                onClick={verifyPhoneOtp}
                                                disabled={phoneVerifying}
                                            >
                                                {phoneVerifying ? (
                                                    <>
                                                        <LoaderCircle size={16} className="spin" />
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CircleCheckBig size={16} />
                                                        Verify & Update
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================================
                        DANGER ZONE
                ========================================= */}

                <section className="account-section danger-section">

                    <div className="account-section-header">
                        <div>
                            <span className="account-section-tag danger-tag">DANGER ZONE</span>
                            <h2>Delete Account</h2>
                        </div>
                    </div>

                    <div className="danger-card">

                        <div className="danger-card-icon">
                            <Trash2 size={26} />
                        </div>

                        <div className="danger-card-content">

                            <h4>This action is permanent</h4>
                            <p>
                                Deleting your account will permanently remove your
                                profile and saved address. This cannot be undone.
                            </p>

                            <label className="danger-checkbox">
                                <input
                                    type="checkbox"
                                    checked={dangerAcknowledged}
                                    onChange={(e) => setDangerAcknowledged(e.target.value ? e.target.checked : false)}
                                />
                                I understand this action cannot be undone.
                            </label>

                            <div className="danger-confirm-row">

                                <input
                                    type="text"
                                    placeholder='Type "DELETE" to confirm'
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    disabled={!dangerAcknowledged}
                                />

                                <button
                                    className="danger-btn"
                                    disabled={!deleteEnabled}
                                    onClick={submitDeleteAccount}
                                >
                                    {deleting ? (
                                        <>
                                            <LoaderCircle size={16} className="spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={16} />
                                            Delete My Account
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

            </section>

            <Footer />

        </>
    );

};

export default MyAccount;