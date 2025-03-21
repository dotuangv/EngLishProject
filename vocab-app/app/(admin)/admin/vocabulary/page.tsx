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
  Volume2,
  Bookmark,
  Import,
  ImportIcon as Export,
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

// Dữ liệu mẫu cho từ vựng
const vocabularies = [
  {
    id: 1,
    word: "Accomplish",
    meaning: "Hoàn thành",
    example: "She accomplished her goal.",
    level: 4,
    topic: "Công sở",
    difficulty: "medium",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-04-10",
    usageCount: 1245,
  },
  {
    id: 2,
    word: "Determine",
    meaning: "Quyết định",
    example: "We need to determine the cause.",
    level: 3,
    topic: "Công sở",
    difficulty: "medium",
    status: "active",
    createdAt: "2023-01-20",
    updatedAt: "2023-04-12",
    usageCount: 987,
  },
  {
    id: 3,
    word: "Enhance",
    meaning: "Nâng cao",
    example: "This will enhance your skills.",
    level: 5,
    topic: "Công sở",
    difficulty: "hard",
    status: "active",
    createdAt: "2023-02-05",
    updatedAt: "2023-04-15",
    usageCount: 756,
  },
  {
    id: 4,
    word: "Facilitate",
    meaning: "Tạo điều kiện",
    example: "The program facilitates learning.",
    level: 2,
    topic: "Giáo dục",
    difficulty: "hard",
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-04-18",
    usageCount: 845,
  },
  {
    id: 5,
    word: "Generate",
    meaning: "Tạo ra",
    example: "The solar panels generate electricity.",
    level: 1,
    topic: "Công nghệ",
    difficulty: "easy",
    status: "inactive",
    createdAt: "2023-03-01",
    updatedAt: "2023-04-20",
    usageCount: 623,
  },
  {
    id: 6,
    word: "Implement",
    meaning: "Thực hiện",
    example: "We need to implement this strategy.",
    level: 3,
    topic: "Công sở",
    difficulty: "medium",
    status: "active",
    createdAt: "2023-03-15",
    updatedAt: "2023-04-22",
    usageCount: 912,
  },
  {
    id: 7,
    word: "Negotiate",
    meaning: "Đàm phán",
    example: "They will negotiate the terms of the contract.",
    level: 4,
    topic: "Kinh doanh",
    difficulty: "hard",
    status: "active",
    createdAt: "2023-03-20",
    updatedAt: "2023-04-25",
    usageCount: 734,
  },
  {
    id: 8,
    word: "Optimize",
    meaning: "Tối ưu hóa",
    example: "We need to optimize our workflow.",
    level: 5,
    topic: "Công nghệ",
    difficulty: "hard",
    status: "active",
    createdAt: "2023-03-25",
    updatedAt: "2023-04-28",
    usageCount: 567,
  },
]

const statusColorMap = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
}

const difficultyColorMap = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const levelColorMap = {
  1: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  2: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  4: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  5: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddVocabDialogOpen, setIsAddVocabDialogOpen] = useState(false)
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

  const filteredVocabularies = vocabularies
    .filter(
      (vocab) =>
        vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.topic.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-3xl font-bold">Quản lý từ vựng</h1>
          <p className="text-muted-foreground">Tạo và quản lý từ vựng trong hệ thống</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Nhập từ vựng
          </Button>
          <Button variant="outline">
            <Export className="h-4 w-4 mr-2" />
            Xuất từ vựng
          </Button>
          <Dialog open={isAddVocabDialogOpen} onOpenChange={setIsAddVocabDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm từ vựng
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm từ vựng mới</DialogTitle>
                <DialogDescription>Điền thông tin để thêm từ vựng mới vào hệ thống.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="word" className="text-right">
                    Từ
                  </Label>
                  <Input id="word" placeholder="Nhập từ vựng" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meaning" className="text-right">
                    Nghĩa
                  </Label>
                  <Input id="meaning" placeholder="Nhập nghĩa của từ" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="example" className="text-right">
                    Ví dụ
                  </Label>
                  <Textarea id="example" placeholder="Nhập câu ví dụ" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="topic" className="text-right">
                    Chủ đề
                  </Label>
                  <Select>
                    <SelectTrigger id="topic" className="col-span-3">
                      <SelectValue placeholder="Chọn chủ đề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công sở">Công sở</SelectItem>
                      <SelectItem value="Giáo dục">Giáo dục</SelectItem>
                      <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                      <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                      <SelectItem value="Du lịch">Du lịch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="difficulty" className="text-right">
                    Độ khó
                  </Label>
                  <Select>
                    <SelectTrigger id="difficulty" className="col-span-3">
                      <SelectValue placeholder="Chọn độ khó" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Dễ</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="hard">Khó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Cấp độ
                  </Label>
                  <Select>
                    <SelectTrigger id="level" className="col-span-3">
                      <SelectValue placeholder="Chọn cấp độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Cấp độ 1</SelectItem>
                      <SelectItem value="2">Cấp độ 2</SelectItem>
                      <SelectItem value="3">Cấp độ 3</SelectItem>
                      <SelectItem value="4">Cấp độ 4</SelectItem>
                      <SelectItem value="5">Cấp độ 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddVocabDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" onClick={() => setIsAddVocabDialogOpen(false)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Thêm từ vựng
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
                <TabsTrigger value="inactive">Không hoạt động</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm từ vựng..."
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
                      <TableHead className="w-[200px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("word")}>
                          Từ vựng
                          {sortColumn === "word" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[200px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("meaning")}>
                          Nghĩa
                          {sortColumn === "meaning" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("topic")}>
                          Chủ đề
                          {sortColumn === "topic" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("level")}>
                          Cấp độ
                          {sortColumn === "level" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("difficulty")}>
                          Độ khó
                          {sortColumn === "difficulty" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("usageCount")}>
                          Lượt sử dụng
                          {sortColumn === "usageCount" && (
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
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVocabularies.map((vocab) => (
                      <TableRow key={vocab.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">{vocab.word}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                              <Volume2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{vocab.meaning}</TableCell>
                        <TableCell>{vocab.topic}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={levelColorMap[vocab.level as keyof typeof levelColorMap]}>
                            Cấp {vocab.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={difficultyColorMap[vocab.difficulty as keyof typeof difficultyColorMap]}
                          >
                            {vocab.difficulty === "easy" ? "Dễ" : vocab.difficulty === "medium" ? "Trung bình" : "Khó"}
                          </Badge>
                        </TableCell>
                        <TableCell>{vocab.usageCount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColorMap[vocab.status as keyof typeof statusColorMap]}
                          >
                            {vocab.status === "active" ? "Hoạt động" : "Không hoạt động"}
                          </Badge>
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
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="h-4 w-4 mr-2" />
                                Đánh dấu
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

            <TabsContent value="active" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các từ vựng đang hoạt động</p>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="m-0">
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hiển thị các từ vựng không hoạt động</p>
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

