"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/admin/date-range-picker"
import { Download, BookOpen, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, Star } from "lucide-react"
import { LessonCompletionChart, LessonPopularityChart, LessonRatingChart } from "@/components/admin/lesson-charts"
import { Badge } from "@/components/ui/badge"

export default function LessonReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Thống kê bài học</h1>
          <p className="text-muted-foreground">Phân tích hiệu suất và tương tác với bài học</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="90days">90 ngày qua</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng số bài học</p>
                <h3 className="text-2xl font-bold mt-1">248</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ hoàn thành</p>
                <h3 className="text-2xl font-bold mt-1">68.7%</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">3.1%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Thời gian hoàn thành TB</p>
                <h3 className="text-2xl font-bold mt-1">12.5 phút</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">2.3%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Đánh giá trung bình</p>
                <h3 className="text-2xl font-bold mt-1">4.7/5</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">0.2</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ hoàn thành bài học</CardTitle>
            <CardDescription>Phân tích tỷ lệ hoàn thành theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <LessonCompletionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bài học phổ biến</CardTitle>
            <CardDescription>Top 10 bài học được học nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <LessonPopularityChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đánh giá bài học</CardTitle>
          <CardDescription>Phân bố đánh giá của người dùng cho các bài học</CardDescription>
        </CardHeader>
        <CardContent>
          <LessonRatingChart />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Phân bố theo loại bài học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Từ vựng</span>
                  <span className="text-sm text-muted-foreground">42%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Hội thoại</span>
                  <span className="text-sm text-muted-foreground">28%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nghe</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Viết</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nói</span>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Phân bố theo cấp độ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Cơ bản</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Trung cấp</span>
                  <span className="text-sm text-muted-foreground">35%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nâng cao</span>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top chủ đề phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">1</Badge>
                  <p className="font-medium">Giao tiếp</p>
                </div>
                <span className="text-sm text-muted-foreground">24%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">2</Badge>
                  <p className="font-medium">Du lịch</p>
                </div>
                <span className="text-sm text-muted-foreground">18%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">3</Badge>
                  <p className="font-medium">Công sở</p>
                </div>
                <span className="text-sm text-muted-foreground">15%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">4</Badge>
                  <p className="font-medium">Công nghệ</p>
                </div>
                <span className="text-sm text-muted-foreground">12%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">5</Badge>
                  <p className="font-medium">Kinh doanh</p>
                </div>
                <span className="text-sm text-muted-foreground">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

