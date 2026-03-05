import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"
import { useLanguageStore } from "@/i18n/useLanguageStore"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const signUpSchema = z.object({
    firstName: z.string().min(1, t.signUp.firstNameRequired),
    lastName: z.string().min(1, t.signUp.lastNameRequired),
    username: z.string().min(3, t.signUp.usernameMin),
    email: z.email(t.signUp.emailInvalid),
    password: z.string().min(6, t.signUp.passwordMin),
  })

  type SignUpFormData = z.infer<typeof signUpSchema>

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onsubmit = async (data: SignUpFormData) => {
    const { firstName, lastName, username, email, password } = data;

    await signUp(username, password, email, firstName, lastName);

    navigate("/signin");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-6 max-w-md mx-auto">

              {/* Logo & tiêu đề */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit">
                  <img src="/logo.svg" alt="logo" className="h-12" />
                </a>

                <h1 className="text-2xl font-bold">{t.signUp.title}</h1>

                <p className="text-sm text-muted-foreground">
                  {t.signUp.subtitle}
                </p>
              </div>

              {/* Họ & Tên */}
              <div className="grid grid-cols-2 gap-3">

                {/* Họ */}
                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium">
                    {t.signUp.lastName}
                  </label>

                  <input
                    type="text"
                    id="lastname"
                    placeholder="Nguyễn"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("lastName")}
                  />

                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Tên */}
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium">
                    {t.signUp.firstName}
                  </label>

                  <input
                    type="text"
                    id="firstname"
                    placeholder="Văn A"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("firstName")}
                  />

                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

              </div>

              {/* Username */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  {t.signUp.username}
                </label>

                <input
                  type="text"
                  id="username"
                  placeholder="moji"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("username")}
                />

                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t.signUp.email}
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="moji@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {t.signUp.password}
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {t.signUp.submit}
              </Button>

              {/* Login */}
              <div className="text-center text-sm text-gray-600">
                {t.signUp.hasAccount}{" "}
                <a href="/signin" className="underline underline-offset-4">
                  {t.signUp.signIn}
                </a>
              </div>

            </div>

          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        {t.signIn.terms} <a href="#">{t.signIn.termsOfService}</a>{" "}
        {t.signIn.and} <a href="#">{t.signIn.privacyPolicy}</a> {t.signIn.ofOurs}
      </div>
    </div>
  )
}
