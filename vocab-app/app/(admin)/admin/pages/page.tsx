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
  FileText,
  Globe,
  Home,
  Info,
  BookOpen,
  Settings,
  MessageSquare,
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

// Dữ liệu mẫu cho trang
const pages = [
  {
    id: 1,
    title: "Trang chủ",
    slug: "/",
    icon: "Home",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-01-15",
    updatedAt: "2023-04-10",
    views: 12450,
  },
  {
    id: 2,
    title: "Giới thiệu",
    slug: "/about",
    icon: "Info",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-01-20",
    updatedAt: "2023-04-12",
    views: 5230,
  },
  {
    id: 3,
    title: "Khóa học",
    slug: "/courses",
    icon: "BookOpen",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-02-05",
    updatedAt: "2023-04-15",
    views: 8760,
  },
  {
    id: 4,
    title: "Liên hệ",
    slug: "/contact",
    icon: "MessageSquare",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-02-10",
    updatedAt: "2023-04-18",
    views: 3420,
  },
  {
    id: 5,
    title: "Chính sách bảo mật",
    slug: "/privacy-policy",
    icon: "FileText",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-03-01",
    updatedAt: "2023-04-20",
    views: 1250,
  },
  {
    id: 6,
    title: "Điều khoản sử dụng",
    slug: "/terms",
    icon: "FileText",
    status: "published",
    visibility: "public",
    author: "Admin",
    createdAt: "2023-03-15",
    updatedAt: "2023-04-22",
    views: 980,
  },
  {
    id: 7,
    title: "Trang quản trị",
    slug: "/admin",
    icon: "Settings",
    status: "published",
    visibility: "private",
    author: "Admin",
    createdAt: "2023-03-20",
    updatedAt: "2023-04-25",
    views: 450,
  },
  {
    id: 8,
    title: "Trang mới (bản nháp)",
    slug: "/new-page",
    icon: "FileText",
    status: "draft",
    visibility: "private",
    author: "Admin",
    createdAt: "2023-03-25",
    updatedAt: "2023-04-28",
    views: 0,
  },
]

const statusColorMap = {
  published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  archived: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const visibilityColorMap = {
  public: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  private: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <Home className="h-4 w-4" />
    case "Info":
      return <Info className="h-4 w-4" />
    case "BookOpen":
      return <BookOpen className="h-4 w-4" />
    case "MessageSquare":
      return <MessageSquare className="h-4 w-4" />
    case "FileText":
      return <FileText className="h-4 w-4" />
    case "Settings":
      return <Settings className="h-4 w-4" />
    case "Globe":
      return <Globe className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function PagesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false)
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

  const filteredPages = pages
    .filter(
      (page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-3xl font-bold">Quản lý trang</h1>
          <p className="text-muted-foreground">Tạo và quản lý các trang tĩnh trong hệ thống</p>
        </div>
        <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Tạo trang mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo trang mới</DialogTitle>
              <DialogDescription>Điền thông tin để tạo một trang mới trong hệ thống.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Tiêu đề
                </Label>
                <Input id="title" placeholder="Nhập tiêu đề trang" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Đường dẫn
                </Label>
                <Input id="slug" placeholder="/duong-dan" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Nội dung
                </Label>
                <Textarea id="content" placeholder="Nhập nội dung trang" className="col-span-3" rows={8} />
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
                    <SelectItem value="Home">Trang chủ</SelectItem>
                    <SelectItem value="Info">Thông tin</SelectItem>
                    <SelectItem value="BookOpen">Sách</SelectItem>
                    <SelectItem value="MessageSquare">Tin nhắn</SelectItem>
                    <SelectItem value="FileText">Tài liệu</SelectItem>
                    <SelectItem value="Settings">Cài đặt</SelectItem>
                    <SelectItem value="Globe">Toàn cầu</SelectItem>
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
                <Label htmlFor="visibility" className="text-right">
                  Hiển thị
                </Label>
                <Select>
                  <SelectTrigger id="visibility" className="col-span-3">
                    <SelectValue placeholder="Chọn chế độ hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Công khai</SelectItem>
                    <SelectItem value="private">Riêng tư</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPageDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" onClick={() => setIsAddPageDialogOpen(false)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo trang
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
                    placeholder="Tìm kiếm trang..."
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
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("slug")}>
                          Đường dẫn
                          {sortColumn === "slug" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
                          Trạng thái
                          {sortColumn === "status" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("visibility")}>
                          Hiển thị
                          {sortColumn === "visibility" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("author")}>
                          Tác giả
                          {sortColumn === "author" && (
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
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("views")}>
                          Lượt xem
                          {sortColumn === "views" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2">{getIconComponent(page.icon)}</div>
                            <span className="font-medium">{page.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {page.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColorMap[page.status as keyof typeof statusColorMap]}
                          >
                            {page.status === "published"
                              ? "Đã xuất bản"
                              : page.status === "draft"
                                ? "Bản nháp"
                                : "Đã lưu trữ"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={visibilityColorMap[page.visibility as keyof typeof visibilityColorMap]}
                          >
                            {page.visibility === "public" ? "Công khai" : "Riêng tư"}
                          </Badge>
                        </TableCell>
                        <TableCell>{page.author}</TableCell>
                        <TableCell>{new Date(page.updatedAt).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell>{page.views.toLocaleString()}</TableCell>
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
                <p className="text-muted-foreground">Hiển thị các trang đã xuất bản</p>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các bản nháp trang</p>
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

