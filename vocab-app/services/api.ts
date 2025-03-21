import axios from "axios";
import Cookies from "js-cookie";

// Tạo instance Axios
const api = axios.create({
    baseURL: "/api", // Thay đổi base URL nếu cần
    headers: { "Content-Type": "application/json" },
});

// Biến lưu trạng thái refresh token đang được gọi
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Hàm đăng ký các request đang chờ token mới
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

// Hàm xử lý refresh token
const refreshAccessToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;
        try {
            const refreshToken = Cookies.get("refresh_token");
            if (!refreshToken) throw new Error("No refresh token available");

            const response = await axios.post("/api/refresh-token", { refresh: refreshToken });
            const newAccessToken = response.data.access;

            // Lưu lại token mới
            Cookies.set("access_token", newAccessToken);

            const newRefreshToken = response.data.refresh;
            if (newRefreshToken) {
                Cookies.set("refresh_token", newRefreshToken);
            }
            // Gọi lại tất cả request đang chờ token mới
            refreshSubscribers.forEach((callback) => callback(newAccessToken));
            refreshSubscribers = [];

            return newAccessToken;
        } catch (error) {
            console.error("Refresh token failed", error);
            return null;
        } finally {
            isRefreshing = false;
        }
    }
    return new Promise<string | null>((resolve) => {
        addRefreshSubscriber((token) => resolve(token));
    });
};

// **Interceptor Request**: Thêm Access Token vào Header
api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// **Interceptor Response**: Xử lý khi Access Token hết hạn (401)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu request đã được thử lại

            const newToken = await refreshAccessToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest); // Gửi lại request với token mới
            }
        }
        return Promise.reject(error);
    }
);

export default api;
