import {create} from "zustand";
import {axiosBackendApi} from "../lib/axios.js";
import {darkErrorToast} from "../components/DarkModeToast.jsx";
import axios from "axios";
import {useAuthStore} from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({isUserLoading: true});
        try {
            const res = await axiosBackendApi.get("/message/users");
            set({users: res.data});

        }catch (error) {
            darkErrorToast({msg: error.response.data.message});
        }finally {
            set({isUserLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosBackendApi.get(`/message/${userId}`);
            set({messages: res.data});
        }catch (error) {
            // darkErrorToast({msg: error.response.data.message});
        }finally {
            set({isMessageLoading: false});
        }
    },

    sendMessage: async (messageData) =>{
        const {selectedUser, messages} = get();
        try{
            const res = await axiosBackendApi.post(`/message/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        }catch (error) {
            darkErrorToast({msg: error.response.data.message});
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages: () =>{
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage")
    },

    //todo: optimize this later

    setSelectedUser: (selectedUser) => set({selectedUser}),

}));