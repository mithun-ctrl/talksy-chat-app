import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
    Camera,
    Mail,
    User,
    Calendar,
    Shield,
    Loader2,
    Pencil,
    Clock,
    Activity,
    CheckCircle
} from 'lucide-react';

const ProfilePage = () => {
    const { authUser, isProfileUpdating, updateProfile } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    // Format the creation date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            return dateString.split("T")[0] || "N/A";
        }
    };

    return (
        <div className="min-h-screen bg-base-100 pt-8 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 mt-10">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <p className="text-base-content/60 mt-2">Manage your account information</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-base-200 rounded-2xl shadow-md overflow-hidden border border-base-300">
                            {/* Banner */}
                            <div className="h-24 bg-gradient-to-r from-primary to-primary/50"></div>

                            {/* Profile Image & Status */}
                            <div className="flex flex-col items-center px-6 pb-6 relative">
                                <div className="relative -mt-12">
                                    <div className="size-24 rounded-full border-4 border-base-200 shadow-lg overflow-hidden bg-base-300">
                                        <img
                                            src={selectedImage || authUser.profilePic || "/avatar.png"}
                                            alt="Profile"
                                            className="size-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/avatar.png";
                                            }}
                                        />
                                    </div>
                                    <label
                                        htmlFor="avatar-upload"
                                        className={`absolute bottom-0 right-0
                    bg-primary hover:bg-primary-focus
                    p-2 rounded-full cursor-pointer
                    transition-all duration-200 shadow-md
                    text-primary-content
                    ${isProfileUpdating ? "opacity-70 pointer-events-none" : ""}`}
                                    >
                                        <Camera className="size-4" />
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleUploadImage}
                                            disabled={isProfileUpdating}
                                        />
                                    </label>
                                </div>

                                {/* Name & Status */}
                                <div className="mt-4 text-center w-full">
                                    <h2 className="text-xl font-bold">{authUser?.fullName}</h2>

                                    {isProfileUpdating ? (
                                        <div className="flex items-center justify-center mt-2 text-sm">
                                            <Loader2 className="size-3 mr-2 animate-spin text-primary" />
                                            <span className="text-base-content/70">Updating...</span>
                                        </div>
                                    ) : (
                                        <div className="mt-2 flex items-center justify-center gap-1 text-sm text-base-content/70">
                                            <CheckCircle className="size-3 text-success" />
                                            <span>Profile Active</span>
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="w-full border-t border-base-300 my-4"></div>

                                {/* Member Since */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="size-4 text-base-content/70" />
                                    <span className="text-base-content/70">Member since {formatDate(authUser.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Account Status Card */}
                        <div className="mt-6 bg-base-200 rounded-2xl shadow-md p-5 border border-base-300">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Activity className="size-5 text-primary" />
                                <span>Account Status</span>
                            </h3>

                            <div className="mt-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg">
                                    <span className="text-sm">Status</span>
                                    <span className="badge badge-primary badge-outline">Active</span>
                                </div>

                                <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg">
                                    <span className="text-sm">Verification</span>
                                    <span className="badge badge-success badge-outline">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - User Information */}
                    <div className="md:col-span-2">
                        <div className="bg-base-200 rounded-2xl shadow-md p-6 h-full border border-base-300">
                            {/* User Information Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <User className="size-5 text-primary" />
                                    <span>Personal Information</span>
                                </h2>
                                <button className="btn btn-sm btn-circle btn-ghost">
                                    <Pencil className="size-4" />
                                </button>
                            </div>

                            {/* User Information Content */}
                            <div className="space-y-6">
                                {/* Name */}
                                <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
                                    <p className="text-xs uppercase font-medium text-base-content/50 mb-1">Full Name</p>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-md bg-primary/10">
                                            <User className="size-5 text-primary" />
                                        </div>
                                        <p className="font-medium">{authUser?.fullName || "N/A"}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
                                    <p className="text-xs uppercase font-medium text-base-content/50 mb-1">Email Address</p>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-md bg-secondary/10">
                                            <Mail className="size-5 text-secondary" />
                                        </div>
                                        <p className="font-medium">{authUser?.email || "N/A"}</p>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
                                    <p className="text-xs uppercase font-medium text-base-content/50 mb-1">Member Information</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-accent/10">
                                                <Calendar className="size-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-base-content/70">Joined</p>
                                                <p className="font-medium">{formatDate(authUser.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-success/10">
                                                <Shield className="size-5 text-success" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-base-content/70">Account Type</p>
                                                <p className="font-medium">Standard</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Information */}
                                <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs uppercase font-medium text-base-content/50">Security</p>
                                        <button className="text-xs text-primary hover:underline">Manage</button>
                                    </div>

                                    <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                                        <div className="p-2 rounded-md bg-warning/10">
                                            <Shield className="size-5 text-warning" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">Password</p>
                                            <p className="text-sm text-base-content/70">Last changed: Never</p>
                                        </div>
                                        <button className="btn btn-sm btn-primary btn-outline">
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;