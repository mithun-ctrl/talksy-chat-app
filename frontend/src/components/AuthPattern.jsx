import React from "react";
import { MessageSquare, User, Mail, Shield } from "lucide-react";

const AuthPattern = ({ title, description }) => {
    const icons = [MessageSquare, User, Mail, Shield];

    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 to-base-200 p-12">
            <div className="relative max-w-md text-center z-10">
                {/* Background pattern */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-xl" />
                </div>

                {/* Floating icons grid */}
                <div className="grid grid-cols-4 gap-4 mb-12">
                    {[...Array(8)].map((_, i) => {
                        const IconComponent = icons[i % icons.length];
                        return (
                            <div
                                key={i}
                                className={`aspect-square rounded-xl flex items-center justify-center border border-base-300 bg-base-100/70 backdrop-blur-sm shadow-sm
                ${i % 3 === 0 ? "animate-pulse" : ""}
                ${i % 2 === 0 ? "scale-90" : ""}
                ${i % 5 === 0 ? "bg-primary/10" : ""}
                `}
                            >
                                <IconComponent className={`size-6 ${i % 3 === 0 ? "text-primary" : "text-base-content/60"}`} />
                            </div>
                        );
                    })}
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-12 bg-base-content/20"></div>
                    <div className="size-2 rounded-full bg-primary mx-2"></div>
                    <div className="h-px w-12 bg-base-content/20"></div>
                </div>

                {/* Text content */}
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {title}
                </h2>
                <p className="text-base-content/70 text-lg">
                    {description}
                </p>

                {/* Bottom accent */}
                <div className="mt-8 inline-flex items-center gap-2 text-sm text-base-content/50">
                    <div className="size-1 rounded-full bg-primary"></div>
                    <span>Secure connection</span>
                    <div className="size-1 rounded-full bg-primary"></div>
                    <span>End-to-end encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default AuthPattern;