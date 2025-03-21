"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/admin/date-range-picker"
import { Download, Users, ArrowUpRight, ArrowDownRight, UserPlus, UserMinus, Clock, Award } from "lucide-react"
import { UserActivityChart, UserRetentionChart, UserRegistrationChart } from "@/components/admin/user-charts"

export default function UserReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Thống kê người dùng</h1>
          <p className="text-muted-foreground">Phân tích dữ liệu người dùng và hoạt động</p>
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
                <p className="text-sm font-medium text-muted-foreground">Tổng người dùng</p>
                <h3 className="text-2xl font-bold mt-1">5,273</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12.5%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Người dùng mới</p>
                <h3 className="text-2xl font-bold mt-1">487</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Thời gian học TB</p>
                <h3 className="text-2xl font-bold mt-1">18.5 phút</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">3.1%</span>
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
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ rời bỏ</p>
                <h3 className="text-2xl font-bold mt-1">12.3%</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">2.3%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                <UserMinus className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Đăng ký người dùng</CardTitle>
            <CardDescription>Số lượng người dùng đăng ký mới theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <UserRegistrationChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động người dùng</CardTitle>
            <CardDescription>Số lượng người dùng hoạt động hàng ngày/hàng tuần/hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <UserActivityChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tỷ lệ giữ chân người dùng</CardTitle>
          <CardDescription>Phân tích tỷ lệ người dùng quay lại theo thời gian</CardDescription>
        </CardHeader>
        <CardContent>
          <UserRetentionChart />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Phân bố người dùng theo cấp độ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Người mới</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Trung cấp</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nâng cao</span>
                  <span className="text-sm text-muted-foreground">18%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "18%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chuyên gia</span>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Phân bố theo thiết bị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Di động</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Máy tính</span>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Máy tính bảng</span>
                  <span className="text-sm text-muted-foreground">7%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "7%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Thành tích người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/30 mr-3">
                    <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Hoàn thành 10 bài học</p>
                    <p className="text-sm text-muted-foreground">78% người dùng</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Chuỗi 7 ngày</p>
                    <p className="text-sm text-muted-foreground">45% người dùng</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 mr-3">
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Hoàn thành 1 chủ đề</p>
                    <p className="text-sm text-muted-foreground">32% người dùng</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

