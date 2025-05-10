import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Lock, Mail, User, MessageSquare, LoaderPinwheel } from "lucide-react";
import { Link } from "react-router-dom";
import AuthPattern from "../components/AuthPattern.jsx";
import { darkErrorToast } from "../components/DarkModeToast.jsx";


const SignupPage = () => {
    const [viewPassword, setViewPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        agreeTerms: false
    });
    const { signupAuth, isSigningUp } = useAuthStore();

    const validateInput = () => {
        if (!formData.fullName.trim()) return darkErrorToast({ msg: "Name is required" });
        if (!formData.email.trim()) return darkErrorToast({ msg: "Email is required" });
        if (!/\S+@\S+\.\S+/.test(formData.email)) return darkErrorToast({ msg: "Email format is invalid" });
        if (!formData.password.trim()) return darkErrorToast({ msg: "Password is required" });
        if (formData.password.length < 6) return darkErrorToast({ msg: "Password must be at least 6 characters" });

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateInput();

        if (success === true) signupAuth(formData);
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/*left side section*/}
            <div className={`flex flex-col justify-center items-center p-6 sm:p-12`}>
                <div className={`w-full max-w-md space-y-8`}>
                    {/*LOGO*/}
                    <div className={`text-center mb-8`}>
                        <div className={`flex flex-col items-center gap-2 group`}>
                            <div className={`size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
                                <MessageSquare className={`size-6 text-primary`} />
                            </div>
                            <h1 className={`text-2xl font-bold mt-2`}>
                                Create Account
                            </h1>
                            <p className={`text-base-content/60`}>
                                Get started with free account
                            </p>
                        </div>
                    </div>
                    {/*FORM*/}
                    <form onSubmit={handleSubmit} className={`space-y-6`}>
                        <div className={`form-control`}>
                            <label className={`label`}>
                                <span className={`label-text font-medium`}>
                                    Full Name
                                </span>
                            </label>
                            <div className={`relative mt-1`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <User className="z-10 size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder={`Mithun Doe`}
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={`form-control`}>
                            <label className={`label`}>
                                <span className={`label-text font-medium`}>
                                    Email
                                </span>
                            </label>
                            <div className={`relative mt-1`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <Mail className={`z-10 size-5 text-base-content/40`} />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder={`you@example.com`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={`form-control`}>
                            <label className={`label`}>
                                <span className={`label-text font-medium`}>
                                    Password
                                </span>
                            </label>
                            <div className={`relative mt-1`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <Lock className="z-10 size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={viewPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder={`••••••`}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center`}
                                    onClick={() => setViewPassword(!viewPassword)}
                                >
                                    {viewPassword ? (
                                        <EyeOff className={`size-5 text-base-content/40 z-10`} />
                                    ) : (<Eye className={`size-5 text-base-content/40 z-10`} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type={`submit`}
                            className={`btn btn-primary w-full`}
                            disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <LoaderPinwheel className={`size-5 animate-spin`} />
                                    Signing....
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className={`text-center`}>
                        <p className={`text-base-content/60`}>
                            Already have account? {""}
                            <Link to="/login" className={`link link-primary`}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/*right section*/}
            <AuthPattern
                title={`Join the community`}
                description={`Connect with people online and have some fun gossip with friend's`}
            />
        </div>
    );
};

export default SignupPage;