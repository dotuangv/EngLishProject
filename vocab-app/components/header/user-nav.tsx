"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FlameIcon, Heart, Diamond, Settings, Bell, Users, HelpCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme/theme-toggle";
import authService from "@/services/authService";


export function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Xác định kiểu dữ liệu cụ thể

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser: User | null = await authService.getUser(); // API này phải trả về kiểu User hoặc null
        setUser(currentUser);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.replace("/auth");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <ThemeToggle />

      {user ? (
        // Nếu đã đăng nhập
        <>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-bold">
              <FlameIcon className="h-5 w-5 duolingo-orange" />
              <span>3</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold">
              <Heart className="h-5 w-5 duolingo-red" fill="currentColor" />
              <span>5</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold">
              <Diamond className="h-5 w-5 duolingo-blue" fill="currentColor" />
              <span>345</span>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                <Avatar className="h-10 w-10 border-2 border-duolingo-green">
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt="User" />
                  <AvatarFallback className="bg-duolingo-green text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <a href="/account">Hồ sơ</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Trợ giúp</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-duolingo-red cursor-pointer" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        // Nếu chưa đăng nhập
        <Button onClick={() => router.push("/auth")} className="bg-duolingo-green text-white px-4 py-2 rounded-lg">
          Đăng nhập
        </Button>
      )}
    </div>
  );
}
