"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  MessageSquare,
  Plane,
  Briefcase,
  Laptop,
  Stethoscope,
  TrendingUp,
  Star,
} from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dữ liệu mẫu cho chủ đề
const topics = [
  {
    id: 1,
    title: "Giao tiếp",
    icon: "MessageSquare",
    color: "blue",
    description: "Học cách giao tiếp hiệu quả trong nhiều tình huống",
    popular: true,
    status: "published",
    lessons: 24,
    users: 1245,
    createdAt: "2023-01-15",
    updatedAt: "2023-04-10",
  },
  {
    id: 2,
    title: "Du lịch",
    icon: "Plane",
    color: "green",
    description: "Từ vựng và cụm từ cần thiết cho các chuyến du lịch",
    popular: true,
    status: "published",
    lessons: 18,
    users: 987,
    createdAt: "2023-01-20",
    updatedAt: "2023-04-12",
  },
  {
    id: 3,
    title: "Công sở",
    icon: "Briefcase",
    color: "yellow",
    description: "Ngôn ngữ chuyên nghiệp cho môi trường làm việc",
    popular: false,
    status: "published",
    lessons: 15,
    users: 756,
    createdAt: "2023-02-05",
    updatedAt: "2023-04-15",
  },
  {
    id: 4,
    title: "Công nghệ",
    icon: "Laptop",
    color: "purple",
    description: "Từ vựng liên quan đến công nghệ và máy tính",
    popular: true,
    status: "published",
    lessons: 20,
    users: 845,
    createdAt: "2023-02-10",
    updatedAt: "2023-04-18",
  },
  {
    id: 5,
    title: "Y tế",
    icon: "Stethoscope",
    color: "red",
    description: "Thuật ngữ y tế và sức khỏe",
    popular: false,
    status: "draft",
    lessons: 12,
    users: 0,
    createdAt: "2023-03-01",
    updatedAt: "2023-04-20",
  },
  {
    id: 6,
    title: "Kinh doanh",
    icon: "TrendingUp",
    color: "indigo",
    description: "Ngôn ngữ kinh doanh và tài chính",
    popular: false,
    status: "published",
    lessons: 16,
    users: 623,
    createdAt: "2023-03-15",
    updatedAt: "2023-04-22",
  },
]

const statusColorMap = {
  published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  archived: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "MessageSquare":
      return <MessageSquare className="h-5 w-5" />
    case "Plane":
      return <Plane className="h-5 w-5" />
    case "Briefcase":
      return <Briefcase className="h-5 w-5" />
    case "Laptop":
      return <Laptop className="h-5 w-5" />
    case "Stethoscope":
      return <Stethoscope className="h-5 w-5" />
    case "TrendingUp":
      return <TrendingUp className="h-5 w-5" />
    default:
      return <MessageSquare className="h-5 w-5" />
  }
}

const getColorClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "green":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "purple":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    case "red":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "indigo":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  }
}

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTopicDialogOpen, setIsAddTopicDialogOpen] = useState(false)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredTopics = topics
    .filter(
      (topic) =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      let aValue: any = a[sortColumn as keyof typeof a]
      let bValue: any = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý chủ đề</h1>
          <p className="text-muted-foreground">Tạo và quản lý các chủ đề học tập</p>
        </div>
        <Dialog open={isAddTopicDialogOpen} onOpenChange={setIsAddTopicDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Tạo chủ đề mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo chủ đề mới</DialogTitle>
              <DialogDescription>Điền thông tin để tạo một chủ đề mới trong hệ thống.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Tiêu đề
                </Label>
                <Input id="title" placeholder="Nhập tiêu đề chủ đề" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô tả
                </Label>
                <Textarea id="description" placeholder="Nhập mô tả chủ đề" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Biểu tượng
                </Label>
                <Select>
                  <SelectTrigger id="icon" className="col-span-3">
                    <SelectValue placeholder="Chọn biểu tượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MessageSquare">Giao tiếp</SelectItem>
                    <SelectItem value="Plane">Du lịch</SelectItem>
                    <SelectItem value="Briefcase">Công sở</SelectItem>
                    <SelectItem value="Laptop">Công nghệ</SelectItem>
                    <SelectItem value="Stethoscope">Y tế</SelectItem>
                    <SelectItem value="TrendingUp">Kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Màu sắc
                </Label>
                <Select>
                  <SelectTrigger id="color" className="col-span-3">
                    <SelectValue placeholder="Chọn màu sắc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Xanh dương</SelectItem>
                    <SelectItem value="green">Xanh lá</SelectItem>
                    <SelectItem value="yellow">Vàng</SelectItem>
                    <SelectItem value="purple">Tím</SelectItem>
                    <SelectItem value="red">Đỏ</SelectItem>
                    <SelectItem value="indigo">Chàm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Trạng thái
                </Label>
                <Select>
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Đã xuất bản</SelectItem>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">
                  <Label htmlFor="popular" className="mr-2">
                    Phổ biến
                  </Label>
                </div>
                <Input id="popular" type="checkbox" className="w-4 h-4" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTopicDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" onClick={() => setIsAddTopicDialogOpen(false)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo chủ đề
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
                <TabsTrigger value="draft">Bản nháp</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm chủ đề..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                          Tiêu đề
                          {sortColumn === "title" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Biểu tượng</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
                          Trạng thái
                          {sortColumn === "status" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lessons")}>
                          Số bài học
                          {sortColumn === "lessons" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("users")}>
                          Người dùng
                          {sortColumn === "users" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("updatedAt")}>
                          Cập nhật
                          {sortColumn === "updatedAt" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTopics.map((topic) => (
                      <TableRow key={topic.id}>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{topic.title}</p>
                              {topic.popular && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                >
                                  <Star className="h-3 w-3 mr-1" />
                                  Phổ biến
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate max-w-[300px]">{topic.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${getColorClass(topic.color)}`}
                          >
                            {getIconComponent(topic.icon)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColorMap[topic.status as keyof typeof statusColorMap]}
                          >
                            {topic.status === "published"
                              ? "Đã xuất bản"
                              : topic.status === "draft"
                                ? "Bản nháp"
                                : "Đã lưu trữ"}
                          </Badge>
                        </TableCell>
                        <TableCell>{topic.lessons}</TableCell>
                        <TableCell>{topic.users.toLocaleString()}</TableCell>
                        <TableCell>{new Date(topic.updatedAt).toLocaleDateString("vi-VN")}</TableCell>
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
                                <Eye className="h-4 w-4 mr-2" />
                                Xem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="published" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các chủ đề đã xuất bản</p>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các bản nháp chủ đề</p>
              </div>
            </TabsContent>
          </Tabs>

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

