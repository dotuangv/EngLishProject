"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Eye,
  BookOpen,
  MessageSquare,
  Headphones,
  Pen,
  SlidersHorizontal,
} from "lucide-react"

// Data for lessons
const lessons = [
  {
    id: "l_1",
    title: "Chào hỏi và giới thiệu",
    description: "Học cách chào hỏi và giới thiệu bản thân trong các tình huống khác nhau",
    type: "vocabulary",
    category: "Cơ bản",
    topic: "Giao tiếp",
    status: "published",
    createdAt: "2023-02-15",
    updatedAt: "2023-04-10",
    completions: 1243,
    rating: 4.8,
  },
  {
    id: "l_2",
    title: "Hỏi đường",
    description: "Từ vựng và cụm từ hữu ích khi cần hỏi đường",
    type: "conversation",
    category: "Cơ bản",
    topic: "Du lịch",
    status: "published",
    createdAt: "2023-02-18",
    updatedAt: "2023-04-12",
    completions: 987,
    rating: 4.6,
  },
  {
    id: "l_3",
    title: "Đặt phòng khách sạn",
    description: "Cách đặt phòng khách sạn và các thuật ngữ liên quan",
    type: "listening",
    category: "Cơ bản",
    topic: "Du lịch",
    status: "published",
    createdAt: "2023-02-20",
    updatedAt: "2023-04-15",
    completions: 876,
    rating: 4.7,
  },
  {
    id: "l_4",
    title: "Gọi món ăn",
    description: "Từ vựng về thực phẩm và cách gọi món trong nhà hàng",
    type: "writing",
    category: "Cơ bản",
    topic: "Du lịch",
    status: "published",
    createdAt: "2023-02-22",
    updatedAt: "2023-04-18",
    completions: 765,
    rating: 4.5,
  },
  {
    id: "l_5",
    title: "Thảo luận sở thích",
    description: "Cách nói về sở thích và thời gian rảnh rỗi",
    type: "conversation",
    category: "Trung cấp",
    topic: "Cá nhân",
    status: "draft",
    createdAt: "2023-03-02",
    updatedAt: "2023-04-20",
    completions: 0,
    rating: 0,
  },
  {
    id: "l_6",
    title: "Kể về kỳ nghỉ",
    description: "Từ vựng và cấu trúc để kể về kỳ nghỉ của bạn",
    type: "writing",
    category: "Trung cấp",
    topic: "Du lịch",
    status: "published",
    createdAt: "2023-03-05",
    updatedAt: "2023-04-22",
    completions: 543,
    rating: 4.4,
  },
  {
    id: "l_7",
    title: "Phỏng vấn xin việc",
    description: "Chuẩn bị cho cuộc phỏng vấn xin việc bằng tiếng Anh",
    type: "listening",
    category: "Trung cấp",
    topic: "Công sở",
    status: "review",
    createdAt: "2023-03-10",
    updatedAt: "2023-04-23",
    completions: 0,
    rating: 0,
  },
  {
    id: "l_8",
    title: "Thuyết trình chuyên nghiệp",
    description: "Cách thuyết trình hiệu quả trong môi trường chuyên nghiệp",
    type: "speaking",
    category: "Nâng cao",
    topic: "Công sở",
    status: "draft",
    createdAt: "2023-03-15",
    updatedAt: "2023-04-25",
    completions: 0,
    rating: 0,
  },
]

const typeColorMap = {
  vocabulary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  conversation: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  listening: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  writing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  speaking: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
}

const statusColorMap = {
  published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  archived: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

// Icon for lesson type
const typeIconMap = {
  vocabulary: BookOpen,
  conversation: MessageSquare,
  listening: Headphones,
  writing: Pen,
  speaking: MessageSquare,
}

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false)

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.topic.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý bài học</h1>
          <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý bài học</p>
        </div>
        <Dialog open={isAddLessonDialogOpen} onOpenChange={setIsAddLessonDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Tạo bài học mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo bài học mới</DialogTitle>
              <DialogDescription>Điền thông tin để tạo một bài học mới trong hệ thống.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Tiêu đề
                </Label>
                <Input id="title" placeholder="Nhập tiêu đề bài học" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô tả
                </Label>
                <Textarea id="description" placeholder="Nhập mô tả bài học" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Loại bài học
                </Label>
                <Input id="type" placeholder="Chọn loại bài học" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Cấp độ
                </Label>
                <Input id="category" placeholder="Chọn cấp độ" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Chủ đề
                </Label>
                <Input id="topic" placeholder="Chọn chủ đề" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddLessonDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" onClick={() => setIsAddLessonDialogOpen(false)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo bài học
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
                <TabsTrigger value="review">Đang xét duyệt</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm bài học..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Chủ đề</TableHead>
                      <TableHead>Cấp độ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Lượt hoàn thành</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLessons.map((lesson) => (
                      <TableRow key={lesson.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[300px]">{lesson.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={typeColorMap[lesson.type]}>
                            {lesson.type === "vocabulary" ? (
                              <div className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                <span>Từ vựng</span>
                              </div>
                            ) : lesson.type === "conversation" ? (
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>Hội thoại</span>
                              </div>
                            ) : lesson.type === "listening" ? (
                              <div className="flex items-center">
                                <Headphones className="h-3 w-3 mr-1" />
                                <span>Nghe</span>
                              </div>
                            ) : lesson.type === "writing" ? (
                              <div className="flex items-center">
                                <Pen className="h-3 w-3 mr-1" />
                                <span>Viết</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>Nói</span>
                              </div>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>{lesson.topic}</TableCell>
                        <TableCell>{lesson.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColorMap[lesson.status]}>
                            {lesson.status === "published"
                              ? "Đã xuất bản"
                              : lesson.status === "draft"
                                ? "Bản nháp"
                                : lesson.status === "review"
                                  ? "Đang xét duyệt"
                                  : "Đã lưu trữ"}
                          </Badge>
                        </TableCell>
                        <TableCell>{lesson.completions.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex text-amber-400 mr-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(lesson.rating) ? "fill-current" : "stroke-current fill-none"}`}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              {lesson.rating > 0 ? lesson.rating.toFixed(1) : "N/A"}
                            </span>
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
                                <Eye className="h-4 w-4 mr-2" />
                                Xem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Sao chép
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
                <p className="text-muted-foreground">Hiển thị các bài học đã xuất bản</p>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các bản nháp bài học</p>
              </div>
            </TabsContent>

            <TabsContent value="review" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các bài học đang xét duyệt</p>
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

