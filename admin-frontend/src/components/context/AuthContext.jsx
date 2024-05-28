import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { login as performLogin } from "../../services/client.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem("access_token");
        if (token){
            token = jwtDecode(token);
            setUser({
                username: token.sub,
                role: token.scopes[0]
            })
        }
    }, [])

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];

                localStorage.setItem("access_token", jwtToken);
                let decodedToken = jwtDecode(jwtToken);

                setUser({
                    username: decodedToken.sub,
                    role: decodedToken.scopes[0]
                })
                resolve(res)
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token");
        console.log("logout");
        setUser(null);
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const decodedToken = jwtDecode(token);
        if (Date.now() > decodedToken.exp * 1000) {
            logOut();
            return false;
        }
        if (decodedToken.scopes[0] == "USER") {
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            user, login, logOut, isUserAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;