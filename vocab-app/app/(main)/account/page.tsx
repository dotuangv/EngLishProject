"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { User, Lock, Bell, CreditCard, BookOpen, LogOut, Upload, Save, Trash2, Shield, Mail, Phone, Calendar, MapPin, Globe, Award, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

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

export default function AccountPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  
  // Dữ liệu người dùng mẫu
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder.svg",
    phone: "0912345678",
    birthday: "1990-01-01",
    address: "Hà Nội, Việt Nam",
    bio: "Tôi là một người học tiếng Anh đam mê. Mục tiêu của tôi là có thể giao tiếp trôi chảy trong vòng 6 tháng.",
    language: "Tiếng Việt",
    joinedDate: "15/01/2023",
    level: "Trung cấp",
    streak: 42,
    completedLessons: 78,
    totalLessons: 120,
    completedTopics: 5,
    totalTopics: 8,
    learningTime: "45 phút/ngày",
    subscription: "Premium",
    subscriptionExpiry: "15/01/2024",
    paymentMethod: "Visa **** 4242",
  }

  // Xử lý lưu thông tin cá nhân
  const handleSaveProfile = () => {
    setIsEditing(false)
    // Xử lý lưu thông tin vào database
  }

  // Xử lý đăng xuất
  const handleLogout = () => {
    // Xử lý đăng xuất
    router.push("/login")
  }

  return (
    <motion.div 
      className="container max-w-6xl py-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        variants={cardAnimation}
      >
        Tài khoản của tôi
      </motion.h1>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <motion.div 
          className="col-span-12 md:col-span-4 lg:col-span-3"
          variants={cardAnimation}
        >
          <Card>
            <CardContent className="p-6">
              <motion.div 
                className="flex flex-col items-center space-y-4"
                variants={staggerChildren}
              >
                <motion.div variants={cardAnimation}>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div className="text-center" variants={cardAnimation}>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2" variant="outline">{user.level}</Badge>
                </motion.div>
                <motion.div className="w-full" variants={cardAnimation}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tiến độ học tập</span>
                    <span className="font-medium">{Math.round((user.completedLessons / user.totalLessons) * 100)}%</span>
                  </div>
                  <Progress value={(user.completedLessons / user.totalLessons) * 100} className="h-2" />
                </motion.div>
                <motion.div className="grid grid-cols-2 gap-4 w-full text-center" variants={cardAnimation}>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{user.streak}</span>
                    <span className="text-xs text-muted-foreground">Chuỗi ngày</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{user.completedLessons}</span>
                    <span className="text-xs text-muted-foreground">Bài học</span>
                  </div>
                </motion.div>
                <motion.div variants={cardAnimation} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
          
          <motion.div variants={cardAnimation} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle>Thông tin gói</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Gói hiện tại:</span>
                    <Badge variant="secondary">{user.subscription}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hết hạn:</span>
                    <span className="text-sm font-medium">{user.subscriptionExpiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Phương thức thanh toán:</span>
                    <span className="text-sm font-medium">{user.paymentMethod}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Nâng cấp gói
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          className="col-span-12 md:col-span-8 lg:col-span-9"
          variants={cardAnimation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs 
            defaultValue="profile" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid grid-cols-5 mb-6">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Thông tin cá nhân</span>
                  <span className="sm:hidden">Cá nhân</span>
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <TabsTrigger value="security" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Bảo mật</span>
                  <span className="sm:hidden">Bảo mật</span>
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Thông báo</span>
                  <span className="sm:hidden">Thông báo</span>
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <TabsTrigger value="billing" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Thanh toán</span>
                  <span className="sm:hidden">Thanh toán</span>
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <TabsTrigger value="progress" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Tiến độ học tập</span>
                  <span className="sm:hidden">Tiến độ</span>
                </TabsTrigger>
              </motion.div>
            </TabsList>
            
            <AnimatePresence mode="wait">
              {/* Thông tin cá nhân */}
              <TabsContent value="profile">
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Thông tin cá nhân</CardTitle>
                          <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                        </div>
                        {isEditing ? (
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button onClick={handleSaveProfile}>
                                <Save className="h-4 w-4 mr-2" />
                                Lưu thay đổi
                              </Button>
                            </motion.div>
                          </div>
                        ) : (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input id="name" defaultValue={user.name} readOnly={!isEditing} />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user.email} readOnly={!isEditing} />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" defaultValue={user.phone} readOnly={!isEditing} />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="birthday">Ngày sinh</Label>
                            <Input id="birthday" type="date" defaultValue={user.birthday} readOnly={!isEditing} />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input id="address" defaultValue={user.address} readOnly={!isEditing} />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="language">Ngôn ngữ</Label>
                            {isEditing ? (
                              <Select defaultValue={user.language}>
                                <SelectTrigger id="language">
                                  <SelectValue placeholder="Chọn ngôn ngữ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Tiếng Việt">Tiếng Việt</SelectItem>
                                  <SelectItem value="English">English</SelectItem>
                                  <SelectItem value="Français">Français</SelectItem>
                                  <SelectItem value="Español">Español</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input id="language" defaultValue={user.language} readOnly />
                            )}
                          </motion.div>
                        </div>
                        <motion.div className="space-y-2" variants={cardAnimation}>
                          <Label htmlFor="bio">Giới thiệu</Label>
                          <Textarea id="bio" defaultValue={user.bio} readOnly={!isEditing} rows={4} />
                        </motion.div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Ảnh đại diện</motion.h3>
                        <div className="flex items-center space-x-4">
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div className="space-y-2">
                            {isEditing && (
                              <motion.div variants={cardAnimation} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Tải ảnh lên
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                  JPG, GIF hoặc PNG. Kích thước tối đa 1MB.
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <p className="text-sm text-muted-foreground">
                        Tham gia từ: {user.joinedDate}
                      </p>
                      {isEditing && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa tài khoản
                          </Button>
                        </motion.div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Bảo mật */}
              <TabsContent value="security">
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Bảo mật</CardTitle>
                      <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Đổi mật khẩu</motion.h3>
                        <div className="grid gap-4">
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                            <Input id="current-password" type="password" />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="new-password">Mật khẩu mới</Label>
                            <Input id="new-password" type="password" />
                          </motion.div>
                          <motion.div className="space-y-2" variants={cardAnimation}>
                            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                            <Input id="confirm-password" type="password" />
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full sm:w-auto">Cập nhật mật khẩu</Button>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Xác thực hai yếu tố</motion.h3>
                        <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                          <div className="space-y-0.5">
                            <div className="font-medium">Xác thực hai yếu tố</div>
                            <div className="text-sm text-muted-foreground">
                              Thêm một lớp bảo mật cho tài khoản của bạn
                            </div>
                          </div>
                          <Switch />
                        </motion.div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Phiên đăng nhập</motion.h3>
                        <div className="space-y-4">
                          <motion.div className="flex items-start justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Chrome trên Windows</div>
                              <div className="text-xs text-muted-foreground">
                                Hà Nội, Việt Nam • Hiện tại
                              </div>
                            </div>
                            <Badge>Hiện tại</Badge>
                          </motion.div>
                          <motion.div className="flex items-start justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Safari trên iPhone</div>
                              <div className="text-xs text-muted-foreground">
                                Hà Nội, Việt Nam • 2 giờ trước
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Đăng xuất</Button>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Thông báo */}
              <TabsContent value="notifications">
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông báo</CardTitle>
                      <CardDescription>Quản lý cài đặt thông báo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Thông báo đẩy</motion.h3>
                        <div className="space-y-4">
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Nhắc nhở học tập</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận thông báo nhắc nhở học tập hàng ngày
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </motion.div>
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Thành tích</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận thông báo khi đạt được thành tích mới
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </motion.div>
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Bài học mới</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận thông báo khi có bài học mới
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Thông báo email</motion.h3>
                        <div className="space-y-4">
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Bản tin hàng tuần</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận bản tin hàng tuần về tiến độ học tập
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </motion.div>
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Khuyến mãi</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận thông tin về khuyến mãi và ưu đãi
                              </div>
                            </div>
                            <Switch />
                          </motion.div>
                          <motion.div className="flex items-center justify-between" variants={cardAnimation}>
                            <div className="space-y-0.5">
                              <div className="font-medium">Cập nhật hệ thống</div>
                              <div className="text-sm text-muted-foreground">
                                Nhận thông báo về các cập nhật hệ thống
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                    <CardFooter>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button>Lưu thay đổi</Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Thanh toán */}
              <TabsContent value="billing">
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Thanh toán</CardTitle>
                      <CardDescription>Quản lý thông tin thanh toán và gói dịch vụ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Gói hiện tại</motion.h3>
                        <motion.div className="rounded-lg border p-4" variants={cardAnimation}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{user.subscription}</h4>
                              <p className="text-sm text-muted-foreground">Hết hạn: {user.subscriptionExpiry}</p>
                            </div>
                            <Badge variant="secondary">Đang hoạt động</Badge>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Truy cập tất cả bài học</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Không giới hạn bài tập</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Tải xuống tài liệu</span>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline">Nâng cấp gói</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">Hủy gói</Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Phương thức thanh toán</motion.h3>
                        <motion.div className="rounded-lg border p-4" variants={cardAnimation}>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                                <CreditCard className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{user.paymentMethod}</h4>
                                <p className="text-xs text-muted-foreground">Hết hạn: 12/2025</p>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">Chỉnh sửa</Button>
                            </motion.div>
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline">Thêm phương thức thanh toán</Button>
                        </motion.div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Lịch sử thanh toán</motion.h3>
                        <motion.div className="rounded-lg border" variants={cardAnimation}>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Gia hạn Premium</h4>
                                <p className="text-xs text-muted-foreground">15/01/2023</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">599.000 VNĐ</p>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Thành công</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Đăng ký Premium</h4>
                                <p className="text-xs text-muted-foreground">15/07/2022</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">599.000 VNĐ</p>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Thành công</Badge>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Tiến độ học tập */}
              <TabsContent value="progress">
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Tiến độ học tập</CardTitle>
                      <CardDescription>Theo dõi quá trình học tập của bạn</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div variants={cardAnimation} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <Award className="h-8 w-8 text-amber-500 mb-2" />
                                <h3 className="text-2xl font-bold">{user.streak}</h3>
                                <p className="text-sm text-muted-foreground">Chuỗi ngày học liên tiếp</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                        <motion.div variants={cardAnimation} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                                <h3 className="text-2xl font-bold">{user.completedLessons}/{user.totalLessons}</h3>
                                <p className="text-sm text-muted-foreground">Bài học đã hoàn thành</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                        <motion.div variants={cardAnimation} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <Clock className="h-8 w-8 text-purple-500 mb-2" />
                                <h3 className="text-2xl font-bold">{user.learningTime}</h3>
                                <p className="text-sm text-muted-foreground">Thời gian học trung bình</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Tiến độ theo chủ đề</motion.h3>
                        <div className="space-y-4">
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Giao tiếp cơ bản</span>
                              <span className="text-sm text-muted-foreground">100%</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Du lịch</span>
                              <span className="text-sm text-muted-foreground">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Công sở</span>
                              <span className="text-sm text-muted-foreground">65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Công nghệ</span>
                              <span className="text-sm text-muted-foreground">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ scale: 1.02 }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Y tế</span>
                              <span className="text-sm text-muted-foreground">20%</span>
                            </div>
                            <Progress value={20} className="h-2" />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Thành tích</motion.h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <motion.div variants={cardAnimation} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
                            <div className="border rounded-lg p-4 text-center">
                              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                              <h4 className="font-medium">Chuỗi 7 ngày</h4>
                              <p className="text-xs text-muted-foreground">Học 7 ngày liên tiếp</p>
                            </div>
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
                            <div className="border rounded-lg p-4 text-center">
                              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                              <h4 className="font-medium">Chuỗi 30 ngày</h4>
                              <p className="text-xs text-muted-foreground">Học 30 ngày liên tiếp</p>
                            </div>
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
                            <div className="border rounded-lg p-4 text-center">
                              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                              <h4 className="font-medium">Hoàn thành 50 bài</h4>
                              <p className="text-xs text-muted-foreground">Hoàn thành 50 bài học</p>
                            </div>
                          </motion.div>
                          <motion.div variants={cardAnimation} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
                            <div className="border rounded-lg p-4 text-center opacity-50">
                              <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <h4 className="font-medium">Hoàn thành 100 bài</h4>
                              <p className="text-xs text-muted-foreground">Hoàn thành 100 bài học</p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="space-y-4"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                      >
                        <motion.h3 className="text-lg font-medium" variants={cardAnimation}>Lịch sử học tập</motion.h3>
                        <motion.div className="rounded-lg border" variants={cardAnimation}>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Giao tiếp trong công sở</h4>
                                <p className="text-xs text-muted-foreground">Hoàn thành: 18/04/2023</p>
                              </div>
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Hoàn thành</Badge>
                            </div>
                          </div>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Đặt phòng khách sạn</h4>
                                <p className="text-xs text-muted-foreground">Hoàn thành: 15/04/2023</p>
                              </div>
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Hoàn thành</Badge>
                            </div>
                          </div>
                          <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Gọi món ăn</h4>
                                <p className="text-xs text-muted-foreground">Hoàn thành: 12/04/2023</p>
                              </div>
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Hoàn thành</Badge>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="w-full">Xem tất cả lịch sử</Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}
