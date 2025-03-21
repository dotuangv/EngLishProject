interface AuthResponse {
    access: string;
    refresh: string;
}

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
    username: string;
    avatar?: string;
}
