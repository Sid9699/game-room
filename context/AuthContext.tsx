import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "../interfaces";
import { useRouter } from "next/router";

type AuthContextType = {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  [propName: string]: any;
}

const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    axios.interceptors.request.use(
      (req) => {
        const tokenExpiry = Cookies.get("tokenExpiry");
        if (tokenExpiry) {
          logout();
        }
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const loadUserFromCookies = async () => {
      const token = Cookies.get("token");
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get("user");
        if (user) setUser(user);
      }
      setLoading(false);
    };
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("auth/login", { email, password });
    if (data) {
      Cookies.set("token", data.token, { expires: 60 });
      Cookies.set("tokenExpiry", data.tokenExpiry, { expires: 60 });
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
    }
  };

  const register = async (email: string, password: string) => {
    const { data } = await axios.post("auth/register", { email, password });
    if (data) {
      Cookies.set("token", data.token, { expires: 60 });
      Cookies.set("tokenExpiry", data.tokenExpiry, { expires: 60 });
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("tokenExpiry");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    router.push("/auth/login");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthContextProvider;
