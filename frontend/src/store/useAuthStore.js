import {create} from "zustand";
import {axiosBackendApi} from "../lib/axios.js";
import {darkErrorToast, darkSuccessToast} from "../components/DarkModeToast.jsx";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isProfileUpdating: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket:null,

    checkAuth: async () =>{
        try{
            const res = await axiosBackendApi.get("/auth/check");

            set({
                authUser: res.data
            });

          await  get().connectSocket();
        }catch (error){
            console.log("Error from useAuthStore", error);
            set({
                authUser: null
            });
        }finally {
            set({
                isCheckingAuth: false
            });
        }
    },

    signupAuth: async (data) =>{
        set({isSigningUp: true})
        try{
            const res = await axiosBackendApi.post("/auth/signup", data);
            set({
                authUser: res.data
            })
            darkSuccessToast({msg: "Account created successfully"});

           await get().connectSocket();
        }catch (error) {
            darkErrorToast({msg: error.response.data.message})
        }finally {
            set({
                isSigningUp: false
            });
        }
    },

    login: async (data) =>{
        set({isLoggingIn: true})

        try{
            const  res = await axiosBackendApi.post("/auth/login", data);
            set({
                authUser: res.data
            });
            darkSuccessToast({msg: "Login successfully"});
           await get().connectSocket();
        }catch (error) {
            darkErrorToast({msg: error.response.data.message})
        } finally {
            set({
                isLoggingIn: false
            })
        }
    },

    logout: async () =>{
        try{
            await axiosBackendApi.post("/auth/logout")
            set({authUser: null})
            darkSuccessToast({msg: "Logout successfully"});
           await get().disconnectSocket();
        }catch (error) {
            darkErrorToast({msg: "Something went wrong"})
        }
    },

    updateProfile: async (data) =>{
        set({ isProfileUpdating: true })
        try{
            const res = await axiosBackendApi.put("/auth/update-profile", data);
            set({authUser: res.data});
            darkSuccessToast({msg: "Profile picture updated successfully"})
        }catch(error){
            darkErrorToast({msg: error.response.data.message});
        }finally{
            set({isProfileUpdating: false});
        }
    },

    connectSocket: async () =>{
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();

        set({ socket:socket});

        socket.on("getOnlineUsers", (usersIds) =>{
            set({onlineUsers: usersIds});
        });
    },

    disconnectSocket: async () =>{
        if (get().socket?.connected) get().socket.disconnect();
    },


}));