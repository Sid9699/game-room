import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "../interfaces";

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

  useEffect(() => {
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
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
      delete data.token;
      setUser(data);
    }
  };

  const register = async (email: string, password: string) => {
    const { data } = await axios.post("auth/register", { email, password });
    if (data) {
      Cookies.set("token", data.token, { expires: 60 });
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
      delete data.token;
      setUser(data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.pathname = "/login";
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
