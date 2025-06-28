import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "api/UserApi";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const res = await loginUser({ email, password });
        setUser(res.data.user);
        await AsyncStorage.setItem("token", res.data.jwt);
    }

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const decode = jwtDecode(token);
                setUser(decode);
            } else {
                setUser(null);
            }
        };
        fetchToken();
    }, []);


    return (
        <AuthContext.Provider value={{login, user}}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}