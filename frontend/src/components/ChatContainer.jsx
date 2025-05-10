import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import { FileImage, Loader } from "lucide-react";

const ChatContainer = () => {
    const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current || messages) {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    if (isMessageLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-hidden">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-base-100/30 backdrop-blur-sm">
            <ChatHeader />
            <div className="flex-1 overflow-auto px-4 py-6 scrollbar-thin">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center p-8 bg-base-200/50 rounded-xl border border-base-300/50 max-w-md">
                            <div className="w-16 h-16 bg-base-300/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileImage className="w-8 h-8 text-primary/60" />
                            </div>
                            <h3 className="font-medium mb-2 text-lg">No messages yet</h3>
                            <p className="text-sm text-base-content/70">
                                Start a conversation with {selectedUser.fullName}. Say hello or share an image!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                                ref={messagesEndRef}
                            >
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border overflow-hidden">
                                        <img
                                            src={
                                                message.senderId === authUser._id
                                                    ? authUser.profilePic || "/avatar.png"
                                                    : selectedUser.profilePic || "/avatar.png"
                                            }
                                            alt="profile picture"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="chat-header mb-1 flex items-center gap-2">
                                    <span className="text-xs opacity-80 font-medium">
                                        {message.senderId === authUser._id ? "You" : selectedUser.fullName}
                                    </span>
                                    <time className="text-xs opacity-50">
                                        {formatMessageTime(message.createdAt)}
                                    </time>
                                </div>
                                <div
                                    className={`chat-bubble ${
                                        message.senderId === authUser._id
                                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-content shadow-md"
                                            : "bg-base-300 shadow-sm"
                                    }`}
                                >
                                    {message.image && (
                                        <div className="relative mb-2 group">
                                            <img
                                                src={message.image}
                                                alt="Attachment"
                                                className="sm:max-w-[300px] rounded-md w-full transition-all duration-300 hover:shadow-lg"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 rounded-md transition-opacity"></div>
                                        </div>
                                    )}
                                    {message.text && <p className="break-words">{message.text}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;