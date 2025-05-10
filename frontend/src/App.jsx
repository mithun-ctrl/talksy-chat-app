import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {useEffect} from "react";
import {useAuthStore} from "./store/useAuthStore.js";
import {useThemeStore} from "./store/useThemeStore.js";
import {LoaderPinwheel } from "lucide-react";
import {Toaster} from "react-hot-toast";


const App = () =>{
    const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
    const {theme} = useThemeStore();

    console.log({onlineUsers});

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log(authUser)

    if(isCheckingAuth && !authUser){
        return (
            <div className="items-center justify-center flex h-screen">
                <LoaderPinwheel className="size-12 animate-spin"/>
            </div>
        );
    };


    return(
        <div data-theme={theme}>
            <Navbar/>
            <Routes>
                <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
                <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/> }/>
                <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" /> }/>
                <Route path="/setting" element={<SettingPage/>}/>
                <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
            </Routes>
            <Toaster />
        </div>
    )
};

export default App