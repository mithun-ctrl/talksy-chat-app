import { THEMES } from "../constants/theme.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Check, Moon, Sun, Monitor, Paintbrush, MessageCircle, Send } from "lucide-react";

const CHAT_MESSAGE_PREVIEW = [
    { id: 1, content: "Hello, how are you?", isSent: false, time: "11:00 AM" },
    { id: 2, content: "I'm doing well, thanks for asking!", isSent: true, time: "11:02 AM" },
];

const SettingPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 pt-10 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-10 mt-10">
                    <h1 className="text-4xl font-bold text-center">Personalize Your Experience</h1>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-2">
                        <div className="sticky top-10">
                            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <Paintbrush className="text-primary" size={24} />
                                        <span>Appearance</span>
                                    </h2>
                                    <p className="mt-2 text-base-content/70 text-sm">
                                        Choose how the application looks and feels to you
                                    </p>
                                </div>

                                {/* Theme Options */}
                                <div className="px-6 pb-6">
                                    <div className="flex justify-between mb-6">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-l-lg bg-base-200 hover:bg-base-300 border-r border-base-300">
                                            <Sun size={18} />
                                            <span>Light</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-base-200 hover:bg-base-300 border-r border-base-300">
                                            <Moon size={18} />
                                            <span>Dark</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-r-lg bg-base-200 hover:bg-base-300">
                                            <Monitor size={18} />
                                            <span>System</span>
                                        </button>
                                    </div>

                                    {/* Featured Themes */}
                                    <div className="mb-4">
                                        <h3 className="text-sm font-medium text-base-content/70 mb-3">Featured Themes</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {THEMES.slice(0, 4).map((t) => (
                                                <button
                                                    key={t}
                                                    className={`
                            relative p-3 rounded-xl transition-all
                            ${theme === t
                                                        ? "bg-base-300 ring-2 ring-primary"
                                                        : "bg-base-200 hover:bg-base-300"
                                                    }
                          `}
                                                    onClick={() => setTheme(t)}
                                                >
                                                    <div
                                                        className="h-10 w-full rounded-lg overflow-hidden shadow-md mb-2"
                                                        data-theme={t}
                                                    >
                                                        <div className="grid grid-cols-4 h-full">
                                                            <div className="bg-primary"></div>
                                                            <div className="bg-secondary"></div>
                                                            <div className="bg-accent"></div>
                                                            <div className="bg-neutral"></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">
                              {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>
                                                        {theme === t && (
                                                            <Check size={14} className="text-primary" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* See All Themes Button */}
                                    <div className="pt-4 border-t border-base-200">
                                        <details className="group">
                                            <summary className="flex justify-center text-primary font-medium cursor-pointer py-2 hover:underline">
                                                Browse all themes
                                            </summary>
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {THEMES.slice(4).map((t) => (
                                                    <button
                                                        key={t}
                                                        className={`relative p-2 rounded-lg transition-all ${theme === t
                                                            ? "bg-base-300 ring-2 ring-primary"
                                                            : "bg-base-200 hover:bg-base-300"
                                                        }`}
                                                        onClick={() => setTheme(t)}
                                                    >
                                                        <div
                                                            className="h-6 w-full rounded-lg overflow-hidden shadow-md mb-1"
                                                            data-theme={t}
                                                        >
                                                            <div className="grid grid-cols-4 h-full">
                                                                <div className="bg-primary"></div>
                                                                <div className="bg-secondary"></div>
                                                                <div className="bg-accent"></div>
                                                                <div className="bg-neutral"></div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                          <span className="text-xs font-medium truncate">
                                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                                          </span>
                                                            {theme === t && (
                                                                <Check size={12} className="text-primary" />
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:col-span-3">
                        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <MessageCircle className="text-secondary" size={24} />
                                    <span>Preview</span>
                                </h2>
                                <p className="mt-2 text-base-content/70 text-sm">
                                    Here's how your messages will look with the selected theme
                                </p>
                            </div>

                            {/* Preview Card */}
                            <div className="px-6 pb-6">
                                <div className="bg-base-200 rounded-2xl overflow-hidden shadow-lg border border-base-300">
                                    {/* Chat Header */}
                                    <div className="bg-base-100 px-4 py-3 border-b border-base-300 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-medium">
                                                M
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Milan</h3>
                                                <div className="flex items-center text-xs text-success">
                                                    <span className="w-1.5 h-1.5 bg-success rounded-full mr-1"></span>
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-base-content/30"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-base-content/30"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-base-content/30"></div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="bg-base-100 p-4 min-h-[350px] max-h-[350px] overflow-y-auto flex flex-col gap-4">
                                        <div className="text-xs text-center text-base-content/50 my-2">Today</div>

                                        {CHAT_MESSAGE_PREVIEW.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                            >
                                                {!message.isSent && (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-medium mr-2 self-end">
                                                        M
                                                    </div>
                                                )}
                                                <div
                                                    className={`
                            max-w-[75%] rounded-2xl p-3 shadow-sm
                            ${message.isSent
                                                        ? "bg-primary text-primary-content rounded-br-none"
                                                        : "bg-base-200 rounded-bl-none"
                                                    }
                          `}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <p
                                                        className={`text-[10px] mt-1 text-right
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                            `}
                                                    >
                                                        {message.time}
                                                    </p>
                                                </div>
                                                {message.isSent && (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-secondary-content font-medium ml-2 self-end">
                                                        Y
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chat Input */}
                                    <div className="bg-base-100 p-3 border-t border-base-300">
                                        <div className="flex items-center gap-2 bg-base-200 rounded-full pl-4 pr-2 py-1">
                                            <input
                                                type="text"
                                                className="bg-transparent border-none outline-none flex-1 text-sm"
                                                placeholder="Type your message..."
                                                value="This is preview message..."
                                                readOnly={true}
                                            />
                                            <button className="btn btn-primary btn-sm btn-circle">
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="px-6 pb-6">
                                <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-content text-xs">
                                            i
                                        </div>
                                        <span>Current Theme</span>
                                    </h3>
                                    <p className="text-sm text-base-content/70">
                                        You are currently using the <span className="font-medium text-primary">{theme}</span> theme.
                                        Your theme preference is saved automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;