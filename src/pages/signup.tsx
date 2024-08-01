import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { FC, useState } from "react";
import routes from "../middleware/routes";
import { axiosInstance, reqConfig } from "@/services/axios";
import axios, { HttpStatusCode } from "axios";
import { LoadingSpinner } from "@/components/effect";
import { SignupForm, SignupSchema } from "@/schema";

const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  });
  const [passwordVisibility, setPasswordvisibility] = useState(false);

  const handleSignupFormSubmission: SubmitHandler<SignupForm> = async (
    data
  ) => {
    try {
      if (data.retypePassword != data.password) {
        setError("password", {
          message: "Mật khẩu nhập lại không khớp!",
        });
        return;
      }

      await axiosInstance.post(
        "/users/signup",
        {
          name: data.userName.trim(),
          email: data.email.trim(),
          password: data.password.trim(),
          role: "USER",
        },
        reqConfig
      );

      await routes.navigate("/login", { unstable_viewTransition: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          setError("email", {
            message: "Email đã được sử dụng!",
          });
        } else {
          setError("root", {
            message: "Đăng ký thất bại!",
          });
        }
        // Handle error response if available
        if (error.response) {
          console.error(`Response data: ${error.response.data}`);
          console.error(`Response status: ${error.response.status})`);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleEnterKeyEvent = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => handleSignupFormSubmission(data))}
      className="w-full h-full flex justify-around"
    >
      <Card className="mx-auto min-w-[30rem] my-auto shadow-slate-400 shadow-sm">
        <CardHeader className="mb-5">
          <CardTitle className="text-4xl mb-2">Đăng ký</CardTitle>
          <CardDescription>
            Nhập thông tin của bạn để tạo tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="first-name" className="font-extrabold">
                Họ và tên
                <span className="text-red-600 ">*</span>
              </Label>
              <Input
                {...register("userName")}
                id="first-name"
                autoComplete="username"
                placeholder="Nguyễn Văn A"
              />
              {errors.userName && (
                <div className="text-red-600">{errors.userName.message}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-extrabold">
                Email
                <span className="text-red-600 ">*</span>
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="abc@gmail.com"
              />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
            </div>
            <div>
              <div className="flex gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password" className="font-extrabold">
                    Mật khẩu
                    <span className="text-red-600 ">*</span>
                  </Label>
                  <span className="relative">
                    <Input
                      {...register("password")}
                      id="password"
                      type={passwordVisibility ? "text" : "password"}
                      autoComplete="new-password"
                      onKeyDown={(e) => handleEnterKeyEvent(e)}
                      className="pr-10"
                    />
                    <button
                      className="cursor-pointer absolute right-2 top-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordvisibility(!passwordVisibility);
                      }}
                    >
                      {!passwordVisibility ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="retypePassword" className="font-extrabold">
                    Nhập lại mật khẩu
                    <span className="text-red-600 ">*</span>
                  </Label>
                  <Input
                    {...register("retypePassword")}
                    id="retypePassword"
                    type="password"
                    autoComplete="new-password"
                    onKeyDown={(e) => handleEnterKeyEvent(e)}
                  />
                </div>
              </div>
              {errors.password && (
                <div className="text-red-600 mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="neutral"
                className="w-full"
              >
                {!isSubmitting ? (
                  "Tạo tài khoản"
                ) : (
                  <LoadingSpinner size={26} className="text-white" />
                )}
              </Button>
              {errors.root && (
                <div className="text-red-600 mx-auto">
                  {errors.root.message}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Bạn đã có tài khoản? &nbsp;
            <NavLink to="/login" className="underline hover_text-primary">
              Đăng nhập
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Signup;