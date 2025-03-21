import axios from "axios";
import api from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/users/";
const CSRF_TOKEN = process.env.NEXT_PUBLIC_CSRF_TOKEN || "";



const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}login/`,
      { username, password },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      }
    );

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

const register = async (username: string, email: string, password: string, password2: string): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}register/`,
      { username, email, password, password2 },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      }
    );
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

const logout = () =>  {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const getUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return null;
  }
};
  
const authService = { login, register, logout, getUser };
export default authService;
