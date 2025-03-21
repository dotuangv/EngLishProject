"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Owl } from "@/components/owl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import authService from "@/services/authService"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Schema kiểm tra dữ liệu với Yup
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Bắt buộc"),
    password: Yup.string()
      .min(8, "Mật khẩu ít nhất 8 ký tự")
      .matches(/[A-Za-z]/, "Phải chứa chữ cái")
      .matches(/\d/, "Phải chứa số")
      .required("Bắt buộc"),
  })

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Bắt buộc"),
    email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
    password: Yup.string()
      .min(8, "Mật khẩu ít nhất 8 ký tự")
      .matches(/[A-Za-z]/, "Phải chứa chữ cái")
      .matches(/\d/, "Phải chứa số")
      .required("Bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
      .required("Bắt buộc"),
  })


  const loginFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Login start!")
      setIsLoading(true);
      setMessage("");
      setError("");
      try {
        await authService.login(values.username, values.password);
        setMessage("Đăng nhập thành công! Đang chuyển hướng...");
        setTimeout(() => window.location.href = "/", 1500);
      } catch (err: {error: string}) {
        setError(err.error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: { username: "", email: "", password: "", confirmPassword: "" },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage("");
      setError("");
      try {
        await authService.register(values.username, values.email, values.password, values.confirmPassword);
        setMessage("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      } catch (err) {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className="flex flex-col bg-muted/40 justify-center items-center min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <Owl className="h-24 w-24 mb-2" />
        <h1 className="text-3xl text-primary font-bold">LinguaLearn</h1>
      </div>

      <Card className="w-full max-w-md">
        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          {/* ĐĂNG NHẬP */}
          <TabsContent value="login">
            <form onSubmit={loginFormik.handleSubmit}>
              <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>Nhập thông tin đăng nhập của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input id="username" type="username" {...loginFormik.getFieldProps("username")} />
                  {loginFormik.touched.username && loginFormik.errors.username && (
                    <p className="text-red-500 text-sm">{loginFormik.errors.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-primary text-xs hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <Input id="password" type="password" {...loginFormik.getFieldProps("password")} />
                  {loginFormik.touched.password && loginFormik.errors.password && (
                    <p className="text-red-500 text-sm">{loginFormik.errors.password}</p>
                  )}
                </div>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          {/* ĐĂNG KÝ */}
          <TabsContent value="register">
            <form onSubmit={registerFormik.handleSubmit}>
              <CardHeader>
                <CardTitle>Tạo tài khoản</CardTitle>
                <CardDescription>Nhập thông tin để tạo tài khoản mới</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên đăng nhập</Label>
                  <Input id="username" {...registerFormik.getFieldProps("username")} />
                  {registerFormik.touched.username && registerFormik.errors.username && (
                    <p className="text-red-500 text-sm">{registerFormik.errors.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...registerFormik.getFieldProps("email")} />
                  {registerFormik.touched.email && registerFormik.errors.email && (
                    <p className="text-red-500 text-sm">{registerFormik.errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" {...registerFormik.getFieldProps("password")} />
                  {registerFormik.touched.password && registerFormik.errors.password && (
                    <p className="text-red-500 text-sm">{registerFormik.errors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input id="confirmPassword" type="password" {...registerFormik.getFieldProps("confirmPassword")} />
                  {registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{registerFormik.errors.confirmPassword}</p>
                  )}
                </div>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
