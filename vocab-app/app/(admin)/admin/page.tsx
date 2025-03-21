"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, PieChart } from "@/components/admin/charts"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Users,
  GraduationCap,
  RotateCw,
} from "lucide-react"
import { AdminRecentActivity } from "@/components/admin/admin-recent-activity"
import { RecentUsers } from "@/components/admin/recent-users"

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground">Xem tổng quan về hệ thống của bạn.</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
          <RotateCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Làm mới dữ liệu
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng số người dùng</p>
                <h3 className="text-2xl font-bold mt-1">5,273</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12.5%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Số bài học đã tạo</p>
                <h3 className="text-2xl font-bold mt-1">248</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">3.1%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">2.3%</span>
                  <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Người dùng theo ngày</CardTitle>
            <CardDescription>Số người dùng tích cực trong 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bố chủ đề</CardTitle>
            <CardDescription>Tỷ lệ người dùng theo từng chủ đề</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các hoạt động mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <Tabs defaultValue="new">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Người dùng</CardTitle>
                <TabsList>
                  <TabsTrigger value="new">Mới</TabsTrigger>
                  <TabsTrigger value="active">Hoạt động</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="new" className="m-0">
                <RecentUsers type="new" />
              </TabsContent>
              <TabsContent value="active" className="m-0">
                <RecentUsers type="active" />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Xu hướng học tập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30 mr-3">
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Du lịch</p>
                    <p className="text-sm text-muted-foreground">+24% người dùng</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">↑ 24%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 mr-3">
                    <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Công nghệ</p>
                    <p className="text-sm text-muted-foreground">+18% người dùng</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">↑ 18%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/30 mr-3">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Kinh doanh</p>
                    <p className="text-sm text-muted-foreground">+12% người dùng</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">↑ 12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Trạng thái hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Bộ nhớ</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CPU</span>
                  <span className="text-sm text-muted-foreground">42%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Hiệu suất học tập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/30 mr-3">
                    <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Người mới</p>
                    <p className="text-sm text-muted-foreground">Hoàn thành 2.5 bài/ngày</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30 mr-3">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Người quen</p>
                    <p className="text-sm text-muted-foreground">Hoàn thành 4.2 bài/ngày</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 mr-3">
                    <GraduationCap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Chuyên gia</p>
                    <p className="text-sm text-muted-foreground">Hoàn thành 7.8 bài/ngày</p>
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

