"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Save, Trash2, RefreshCw, HardDrive, Globe, Mail, Bell, Lock, Shield, Users, FileText, Bot, Webhook, AlertTriangle, Terminal, CloudCog, CreditCard } from 'lucide-react'

// Animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    } 
  }
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [isClearingCache, setIsClearingCache] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  const handleRestart = () => {
    setIsRestarting(true)
    setTimeout(() => {
      setIsRestarting(false)
    }, 3000)
  }

  const handleClearCache = () => {
    setIsClearingCache(true)
    setTimeout(() => {
      setIsClearingCache(false)
    }, 2000)
  }

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cài đặt hệ thống</h1>
          <p className="text-muted-foreground">Quản lý cài đặt và tùy chọn hệ thống</p>
        </div>
        <div className="flex space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={handleRestart} disabled={isRestarting}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRestarting ? "animate-spin" : ""}`} />
              {isRestarting ? "Đang khởi động lại..." : "Khởi động lại"}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-6">
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="general">Chung</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="email">Email</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="integrations">Tích hợp</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
          </motion.div>
        </TabsList>

        {/* Cài đặt chung */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>
                  Các cài đặt cơ bản cho ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <motion.div className="space-y-1.5" variants={cardAnimation}>
                    <Label htmlFor="site-name">Tên ứng dụng</Label>
                    <Input id="site-name" placeholder="Nhập tên ứng dụng" defaultValue="Vocab App" />
                  </motion.div>
                  <motion.div className="space-y-1.5 mt-4" variants={cardAnimation}>
                    <Label htmlFor="site-description">Mô tả</Label>
                    <Textarea id="site-description" placeholder="Nhập mô tả" defaultValue="Ứng dụng học từ vựng tiếng Anh hiệu quả" />
                  </motion.div>
                  <motion.div className="space-y-1.5 mt-4" variants={cardAnimation}>
                    <Label htmlFor="site-url">URL</Label>
                    <Input id="site-url" placeholder="Nhập URL" defaultValue="https://vocab-app.example.com" />
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt thời gian</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="timezone">Múi giờ</Label>
                          <Select defaultValue="Asia/Ho_Chi_Minh">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Chọn múi giờ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                              <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                              <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                              <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="date-format">Định dạng ngày</Label>
                          <Select defaultValue="dd/MM/yyyy">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Chọn định dạng ngày" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt nội dung</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bình luận</div>
                          <div className="text-sm text-muted-foreground">
                            Cho phép người dùng bình luận về bài học
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Đánh giá</div>
                          <div className="text-sm text-muted-foreground">
                            Cho phép người dùng đánh giá bài học
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Chia sẻ nội dung</div>
                          <div className="text-sm text-muted-foreground">
                            Cho phép người dùng chia sẻ nội dung lên mạng xã hội
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lần cập nhật cuối: 18/04/2023 12:45:30
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Cài đặt giao diện */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Giao diện</CardTitle>
                <CardDescription>
                  Tùy chỉnh giao diện và hiển thị của ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Chủ đề</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <motion.div whileHover={{ y: -5 }} className="border rounded-md p-4 bg-background cursor-pointer relative">
                          <div className="space-y-2 text-center">
                            <div className="h-20 bg-background rounded-md flex items-center justify-center">
                              <div className="w-full h-4 bg-primary mx-4 rounded"></div>
                            </div>
                            <p className="text-sm font-medium">Sáng</p>
                            <Badge className="absolute top-2 right-2">Hiện tại</Badge>
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-md p-4 bg-background dark:bg-gray-950 cursor-pointer">
                          <div className="space-y-2 text-center">
                            <div className="h-20 bg-gray-950 rounded-md flex items-center justify-center">
                              <div className="w-full h-4 bg-primary mx-4 rounded"></div>
                            </div>
                            <p className="text-sm font-medium">Tối</p>
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-md p-4 bg-background cursor-pointer">
                          <div className="space-y-2 text-center">
                            <div className="h-20 bg-background rounded-md flex items-center justify-center">
                              <div className="w-full h-4 bg-indigo-500 mx-4 rounded"></div>
                            </div>
                            <p className="text-sm font-medium">Tùy chỉnh</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Màu sắc chính</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-6 gap-4">
                        <motion.div whileHover={{ y: -5 }} className="border rounded-full p-2 bg-blue-500 h-12 w-12 cursor-pointer"></motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-full p-2 bg-green-500 h-12 w-12 cursor-pointer"></motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border-2 border-primary rounded-full p-2 bg-indigo-500 h-12 w-12 cursor-pointer"></motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-full p-2 bg-purple-500 h-12 w-12 cursor-pointer"></motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-full p-2 bg-amber-500 h-12 w-12 cursor-pointer"></motion.div>
                        <motion.div whileHover={{ y: -5 }} className="border rounded-full p-2 bg-rose-500 h-12 w-12 cursor-pointer"></motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Font chữ</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="font-family">Font chính</Label>
                          <Select defaultValue="inter">
                            <SelectTrigger id="font-family">
                              <SelectValue placeholder="Chọn font chữ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inter">Inter</SelectItem>
                              <SelectItem value="roboto">Roboto</SelectItem>
                              <SelectItem value="opensans">Open Sans</SelectItem>
                              <SelectItem value="montserrat">Montserrat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="font-size">Cỡ chữ</Label>
                          <Select defaultValue="normal">
                            <SelectTrigger id="font-size">
                              <SelectValue placeholder="Chọn cỡ chữ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Nhỏ</SelectItem>
                              <SelectItem value="normal">Trung bình</SelectItem>
                              <SelectItem value="large">Lớn</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Bố cục</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bố cục thu gọn</div>
                          <div className="text-sm text-muted-foreground">
                            Hiển thị giao diện thu gọn cho màn hình nhỏ
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Hiện thanh bên</div>
                          <div className="text-sm text-muted-foreground">
                            Hiển thị thanh bên ở chế độ mặc định
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Hiệu ứng chuyển động</div>
                          <div className="text-sm text-muted-foreground">
                            Bật hiệu ứng chuyển động và animation
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Thay đổi sẽ được áp dụng ngay lập tức
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Cài đặt email */}
        <TabsContent value="email">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt email</CardTitle>
                <CardDescription>
                  Cấu hình dịch vụ email và mẫu thông báo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cấu hình SMTP</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="smtp-host">SMTP Host</Label>
                          <Input id="smtp-host" placeholder="smtp.example.com" defaultValue="smtp.gmail.com" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="smtp-port">SMTP Port</Label>
                          <Input id="smtp-port" placeholder="587" defaultValue="587" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="smtp-username">Username</Label>
                          <Input id="smtp-username" placeholder="username" defaultValue="support@vocabapp.com" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="smtp-password">Password</Label>
                          <Input id="smtp-password" type="password" placeholder="password" defaultValue="********" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Sử dụng TLS</div>
                          <div className="text-sm text-muted-foreground">
                            Bật kết nối TLS bảo mật
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="mt-2">Kiểm tra kết nối</Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Mẫu Email</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Xác nhận đăng ký</h4>
                              <p className="text-sm text-muted-foreground">Gửi khi người dùng đăng ký tài khoản mới</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Chỉnh sửa</Button>
                            </motion.div>
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Đặt lại mật khẩu</h4>
                              <p className="text-sm text-muted-foreground">Gửi khi người dùng yêu cầu đặt lại mật khẩu</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Chỉnh sửa</Button>
                            </motion.div>
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Thông báo học tập</h4>
                              <p className="text-sm text-muted-foreground">Gửi nhắc nhở học tập hàng ngày</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Chỉnh sửa</Button>
                            </motion.div>
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Báo cáo tiến độ</h4>
                              <p className="text-sm text-muted-foreground">Gửi báo cáo tiến độ học tập hàng tuần</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Chỉnh sửa</Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt thông báo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Email chào mừng</div>
                          <div className="text-sm text-muted-foreground">
                            Gửi email chào mừng khi người dùng đăng ký
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Nhắc nhở học tập</div>
                          <div className="text-sm text-muted-foreground">
                            Gửi email nhắc nhở học tập hàng ngày
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bản tin hàng tuần</div>
                          <div className="text-sm text-muted-foreground">
                            Gửi bản tin cập nhật hàng tuần
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lần gửi email cuối: 18/04/2023 08:30:15
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Cài đặt bảo mật */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt bảo mật</CardTitle>
                <CardDescription>
                  Cấu hình bảo mật và quyền truy cập
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt mật khẩu</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Độ phức tạp mật khẩu</div>
                          <div className="text-sm text-muted-foreground">
                            Yêu cầu mật khẩu phức tạp (chữ in hoa, số, ký tự đặc biệt)
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Hết hạn mật khẩu</div>
                          <div className="text-sm text-muted-foreground">
                            Yêu cầu đổi mật khẩu định kỳ
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="password-min-length">Độ dài tối thiểu</Label>
                          <Select defaultValue="8">
                            <SelectTrigger id="password-min-length">
                              <SelectValue placeholder="Chọn độ dài" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">6 ký tự</SelectItem>
                              <SelectItem value="8">8 ký tự</SelectItem>
                              <SelectItem value="10">10 ký tự</SelectItem>
                              <SelectItem value="12">12 ký tự</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="password-expiry">Thời gian hết hạn</Label>
                          <Select defaultValue="90">
                            <SelectTrigger id="password-expiry">
                              <SelectValue placeholder="Chọn thời gian" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 ngày</SelectItem>
                              <SelectItem value="60">60 ngày</SelectItem>
                              <SelectItem value="90">90 ngày</SelectItem>
                              <SelectItem value="never">Không bao giờ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Xác thực hai yếu tố</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bắt buộc 2FA cho quản trị viên</div>
                          <div className="text-sm text-muted-foreground">
                            Yêu cầu tất cả tài khoản quản trị viên phải bật 2FA
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bắt buộc 2FA cho tất cả người dùng</div>
                          <div className="text-sm text-muted-foreground">
                            Yêu cầu tất cả người dùng phải bật 2FA
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="2fa-method">Phương thức 2FA</Label>
                          <Select defaultValue="both">
                            <SelectTrigger id="2fa-method">
                              <SelectValue placeholder="Chọn phương thức" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="app">Ứng dụng xác thực</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="both">Cả hai</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Phiên đăng nhập</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="session-timeout">Thời gian hết hạn phiên</Label>
                          <Select defaultValue="60">
                            <SelectTrigger id="session-timeout">
                              <SelectValue placeholder="Chọn thời gian" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 phút</SelectItem>
                              <SelectItem value="30">30 phút</SelectItem>
                              <SelectItem value="60">1 giờ</SelectItem>
                              <SelectItem value="1440">24 giờ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="max-login-attempts">Số lần đăng nhập sai tối đa</Label>
                          <Select defaultValue="5">
                            <SelectTrigger id="max-login-attempts">
                              <SelectValue placeholder="Chọn số lần" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 lần</SelectItem>
                              <SelectItem value="5">5 lần</SelectItem>
                              <SelectItem value="10">10 lần</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Khóa tài khoản sau nhiều lần đăng nhập sai</div>
                          <div className="text-sm text-muted-foreground">
                            Tạm khóa tài khoản sau nhiều lần đăng nhập sai
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Cho phép đăng nhập từ nhiều thiết bị</div>
                          <div className="text-sm text-muted-foreground">
                            Cho phép người dùng đăng nhập trên nhiều thiết bị cùng lúc
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lưu ý: Một số thay đổi sẽ yêu cầu người dùng đăng nhập lại
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Cài đặt tích hợp */}
        <TabsContent value="integrations">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Tích hợp</CardTitle>
                <CardDescription>
                  Kết nối với các dịch vụ bên thứ ba
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Mạng xã hội</h3>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Google</h4>
                              <p className="text-xs text-muted-foreground">Đăng nhập bằng Google và tích hợp Google Drive</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Facebook</h4>
                              <p className="text-xs text-muted-foreground">Đăng nhập bằng Facebook và chia sẻ nội dung</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Twitter</h4>
                              <p className="text-xs text-muted-foreground">Đăng nhập bằng Twitter và chia sẻ nội dung</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimationdelay: 0.2}}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">API và Webhook</h3>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">OpenAI</h4>
                              <p className="text-xs text-muted-foreground">Tích hợp trợ lý AI và sinh nội dung</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Webhook className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Zapier</h4>
                              <p className="text-xs text-muted-foreground">Tự động hóa quy trình với Zapier</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="api-key">API Key</Label>
                          <Input id="api-key" placeholder="Khóa API" defaultValue="sk_*******************************" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="webhook-url">Webhook URL</Label>
                          <Input id="webhook-url" placeholder="https://example.com/webhook" defaultValue="https://webhook.vocabapp.com/events" />
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="mt-2">Tạo API key mới</Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Dịch vụ thanh toán</h3>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Stripe</h4>
                              <p className="text-xs text-muted-foreground">Xử lý thanh toán thẻ tín dụng và định kỳ</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">PayPal</h4>
                              <p className="text-xs text-muted-foreground">Xử lý thanh toán qua PayPal</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lưu ý: Các thay đổi API có thể mất vài phút để có hiệu lực
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Cài đặt nâng cao */}
        <TabsContent value="advanced">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt nâng cao</CardTitle>
                <CardDescription>
                  Cài đặt nâng cao và hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                  <Alert className="mb-6" variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Cảnh báo</AlertTitle>
                    <AlertDescription>
                      Thay đổi cài đặt nâng cao có thể ảnh hưởng đến hoạt động của hệ thống. Chỉ thực hiện nếu bạn hiểu rõ tác động.
                    </AlertDescription>
                  </Alert>

                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt cache</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bật cache</div>
                          <div className="text-sm text-muted-foreground">
                            Sử dụng cache để tăng tốc độ tải trang
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cache-ttl">Thời gian sống của cache (phút)</Label>
                          <Input id="cache-ttl" type="number" placeholder="60" defaultValue="60" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="cache-size">Kích thước cache tối đa (MB)</Label>
                          <Input id="cache-size" type="number" placeholder="100" defaultValue="100" />
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="mt-2" onClick={handleClearCache} disabled={isClearingCache}>
                          <HardDrive className={`h-4 w-4 mr-2 ${isClearingCache ? "animate-pulse" : ""}`} />
                          {isClearingCache ? "Đang xóa cache..." : "Xóa cache"}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt cơ sở dữ liệu</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="db-connection">Chuỗi kết nối database</Label>
                          <Input id="db-connection" placeholder="mysql://user:password@localhost:3306/dbname" defaultValue="mysql://vocabapp:****@localhost:3306/vocabapp" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="db-pool-size">Kích thước pool kết nối</Label>
                            <Input id="db-pool-size" type="number" placeholder="10" defaultValue="10" />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="db-timeout">Timeout kết nối (giây)</Label>
                            <Input id="db-timeout" type="number" placeholder="30" defaultValue="30" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Bật ghi log truy vấn</div>
                          <div className="text-sm text-muted-foreground">
                            Ghi nhật ký các truy vấn cơ sở dữ liệu
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="mt-2">Kiểm tra kết nối</Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Cài đặt nâng cao khác</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Chế độ bảo trì</div>
                          <div className="text-sm text-muted-foreground">
                            Bật chế độ bảo trì cho trang web
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Ghi log chi tiết</div>
                          <div className="text-sm text-muted-foreground">
                            Bật ghi log chi tiết cho việc gỡ lỗi
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="log-level">Mức độ log</Label>
                          <Select defaultValue="info">
                            <SelectTrigger id="log-level">
                              <SelectValue placeholder="Chọn mức độ log" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="error">Error</SelectItem>
                              <SelectItem value="warn">Warning</SelectItem>
                              <SelectItem value="info">Info</SelectItem>
                              <SelectItem value="debug">Debug</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="log-retention">Thời gian lưu log (ngày)</Label>
                          <Input id="log-retention" type="number" placeholder="30" defaultValue="30" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">API Debug Mode</div>
                          <div className="text-sm text-muted-foreground">
                            Bật chế độ debug cho API
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Separator />

                <motion.div variants={staggerChildren} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                  <motion.div className="space-y-3" variants={cardAnimation}>
                    <h3 className="text-lg font-medium">Hành động hệ thống</h3>
                    <div className="flex flex-wrap gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="lg" onClick={handleRestart} disabled={isRestarting}>
                          <RefreshCw className={`h-4 w-4 mr-2 ${isRestarting ? "animate-spin" : ""}`} />
                          {isRestarting ? "Đang khởi động lại..." : "Khởi động lại hệ thống"}
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="lg">
                          <Terminal className="h-4 w-4 mr-2" />
                          Xuất log hệ thống
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="lg">
                          <CloudCog className="h-4 w-4 mr-2" />
                          Sao lưu cài đặt
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="destructive" size="lg">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Khôi phục cài đặt gốc
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Phiên bản hệ thống: v2.5.3 • Cập nhật cuối: 15/04/2023
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
