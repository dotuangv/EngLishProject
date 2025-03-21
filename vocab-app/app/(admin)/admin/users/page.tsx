"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontal,
  UserPlusIcon,
  Pencil,
  Trash2,
  DownloadIcon,
  UploadIcon,
} from "lucide-react"

// Dữ liệu mẫu
const users = [
  {
    id: "u_1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder.svg",
    role: "admin",
    status: "active",
    joinedDate: "2023-01-15",
    lastActive: "2023-04-18",
    progress: 85,
  },
  {
    id: "u_2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    status: "active",
    joinedDate: "2023-02-05",
    lastActive: "2023-04-17",
    progress: 62,
  },
  {
    id: "u_3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    status: "inactive",
    joinedDate: "2023-01-27",
    lastActive: "2023-03-10",
    progress: 45,
  },
  {
    id: "u_4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    avatar: "/placeholder.svg",
    role: "editor",
    status: "active",
    joinedDate: "2023-03-12",
    lastActive: "2023-04-18",
    progress: 78,
  },
  {
    id: "u_5",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    status: "pending",
    joinedDate: "2023-04-01",
    lastActive: "2023-04-15",
    progress: 32,
  },
  {
    id: "u_6",
    name: "Vũ Thị F",
    email: "vuthif@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    status: "active",
    joinedDate: "2023-02-20",
    lastActive: "2023-04-16",
    progress: 70,
  },
  {
    id: "u_7",
    name: "Đặng Văn G",
    email: "dangvang@example.com",
    avatar: "/placeholder.svg",
    role: "user",
    status: "suspended",
    joinedDate: "2023-01-10",
    lastActive: "2023-03-25",
    progress: 51,
  },
  {
    id: "u_8",
    name: "Bùi Thị H",
    email: "buithih@example.com",
    avatar: "/placeholder.svg",
    role: "moderator",
    status: "active",
    joinedDate: "2023-03-05",
    lastActive: "2023-04-17",
    progress: 89,
  },
]

const statusColorMap = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const roleColorMap = {
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  editor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  moderator: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  user: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline">
            <UploadIcon className="h-4 w-4 mr-2" />
            Nhập
          </Button>
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>Điền thông tin để tạo một người dùng mới trong hệ thống.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Họ tên
                  </Label>
                  <Input id="name" placeholder="Nhập họ tên" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" placeholder="name@example.com" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Vai trò
                  </Label>
                  <Input id="role" placeholder="Chọn vai trò" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" onClick={() => setIsAddUserDialogOpen(false)}>
                  <UserPlusIcon className="h-4 w-4 mr-2" />
                  Tạo người dùng
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4 mr-2" />
                Lọc
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Trạng thái <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Tất cả</DropdownMenuItem>
                  <DropdownMenuItem>Hoạt động</DropdownMenuItem>
                  <DropdownMenuItem>Không hoạt động</DropdownMenuItem>
                  <DropdownMenuItem>Chờ xác nhận</DropdownMenuItem>
                  <DropdownMenuItem>Đã khóa</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead>Hoạt động gần đây</TableHead>
                  <TableHead>Tiến độ</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={roleColorMap[user.role]}>
                        {user.role === "admin"
                          ? "Quản trị viên"
                          : user.role === "editor"
                            ? "Biên tập viên"
                            : user.role === "moderator"
                              ? "Điều hành viên"
                              : "Người dùng"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColorMap[user.status]}>
                        {user.status === "active"
                          ? "Hoạt động"
                          : user.status === "inactive"
                            ? "Không hoạt động"
                            : user.status === "pending"
                              ? "Chờ xác nhận"
                              : "Đã khóa"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.joinedDate).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${user.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-medium">{user.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Thao tác</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Thay đổi vai trò
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa người dùng
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

