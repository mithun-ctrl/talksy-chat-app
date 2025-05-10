import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users, Search, Settings, ChevronLeft, ChevronRight, UserPlus, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import {Link} from "react-router-dom";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlyOnlineUsers, setShowOnlyOnlineUsers] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users
        .filter(user => !showOnlyOnlineUsers || onlineUsers.includes(user._id))
        .filter(user =>
            searchQuery.trim() === "" ||
            user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (isUserLoading) return <SidebarSkeleton />;

    const onlineCount = onlineUsers.length - 1;

    return (
        <aside
            className={`h-full ${isExpanded ? 'w-20 lg:w-80' : 'w-20'} border-r border-base-300 flex flex-col bg-base-100 transition-all duration-300 relative shadow-lg`}
        >
            {/* Collapse/Expand button - only visible on desktop */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-1/2 hidden lg:flex h-6 w-6 items-center justify-center bg-primary text-primary-content rounded-full shadow-md border border-base-300 z-10"
            >
                {isExpanded ? <ChevronLeft size={14} className={`cursor-pointer`} /> : <ChevronRight size={14} className={`cursor-pointer`} />}
            </button>

            {/* Header */}
            <div className="border-b border-base-300 w-full p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 rounded-lg p-2">
                            <MessageCircle className="size-5 text-primary" />
                        </div>
                        <h2 className={`font-bold text-lg transition-opacity duration-200 ${isExpanded ? 'opacity-100 hidden lg:block' : 'opacity-0 hidden'}`}>
                            Chats
                        </h2>
                    </div>
                    <div className={`flex gap-2 ${isExpanded ? 'hidden lg:flex' : 'hidden'}`}>
                        <button className="btn btn-sm btn-ghost btn-circle">
                            <UserPlus size={18} />
                        </button>
                        <button className="btn btn-sm btn-ghost btn-circle">
                           <Link to="/setting">
                               <Settings size={18} />
                           </Link>
                        </button>
                    </div>
                </div>

                {/* Search and filter - only visible when expanded on desktop */}
                <div className={`flex flex-col gap-3 transition-opacity duration-200 ${isExpanded ? 'opacity-100 hidden lg:block' : 'opacity-0 hidden'}`}>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-sm input-bordered w-full pl-2 rounded-sm mb-2 focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="cursor-pointer label gap-2 py-0">
                            <input
                                type="checkbox"
                                checked={showOnlyOnlineUsers}
                                onChange={(e) => setShowOnlyOnlineUsers(e.target.checked)}
                                className="checkbox checkbox-sm checkbox-primary"
                            />
                            <span className="label-text text-sm">Online User</span>
                        </label>
                        <span className="badge badge-sm">
              {onlineCount} online
            </span>
                    </div>
                </div>
            </div>

            {/* Users list */}
            <div className={`overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent ${isExpanded ? 'opacity-100' : 'overflow-x-hidden'}`}>
                {filteredUsers.length > 0 ? (
                    <div className="py-2">
                        {showOnlyOnlineUsers && isExpanded && (
                            <div className="px-4 py-2">
                                <h3 className="text-xs font-medium text-base-content/50 uppercase tracking-wider hidden lg:block">
                                    Online Users
                                </h3>
                            </div>
                        )}

                        {filteredUsers.map((user) => (
                            <button
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full py-3 px-4 flex items-center gap-3 hover:bg-base-200 transition-all duration-200
                  ${selectedUser?._id === user._id ? "bg-base-200 border-l-4 border-primary" : "border-l-4 border-transparent"}
                `}
                            >
                                <div className={`relative`}>
                                    <div className={`rounded-full ${selectedUser?._id === user._id ? 'ring-2 ring-primary ring-offset-2' : ''} 
                                    ${isExpanded ? '' : 'rounded-full w-12'}`}>
                                        <img
                                            src={user.profilePic || "/avatar.png"}
                                            alt={user.fullName || "User"}
                                            className="size-12 object-cover rounded-full"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/avatar.png";
                                            }}
                                        />
                                    </div>
                                    {onlineUsers.includes(user._id) && (
                                        <span className="absolute bottom-0 right-0 size-3.5 bg-primary rounded-full ring-2 ring-base-100" />
                                    )}
                                </div>

                                <div className={`hidden lg:block text-left min-w-0 transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="font-medium truncate">{user.fullName}</div>
                                    <div className="text-sm flex items-center gap-1">
                                    <span className={`${onlineUsers.includes(user._id) ? 'text-success' : 'text-base-content/50'}`}>
                                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                    </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-base-content/50 px-4 py-8">
                        <Users size={32} />
                        <p className="mt-4 text-center">
                            {searchQuery ? "No users found" : showOnlyOnlineUsers ? "No online users" : "Koi Online Nahi Hai"}
                        </p>
                        {(searchQuery || showOnlyOnlineUsers) && (
                            <button
                                className="mt-2 btn btn-sm btn-ghost"
                                onClick={() => {
                                    setSearchQuery("");
                                    setShowOnlyOnlineUsers(false);
                                }}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Footer - only visible when expanded */}
            <div className={`border-t border-base-300 p-4 transition-opacity duration-200 ${isExpanded ? ' opacity-100 hidden lg:flex' : 'opacity-0 hidden'}`}>
                <div className="flex items-center gap-3 w-full">
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users size={20} className=" ml-2.5 mt-2 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">Total Users</div>
                        <div className="text-sm text-base-content/50">{users.length} users</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;