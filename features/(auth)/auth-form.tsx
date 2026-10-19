import { Label } from "@/components/ui/label"
import type { AuthMode } from "./auth-container"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

type AuthFormProps = {
  mode: AuthMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login"
  console.log(mode)
  return (
    <div>
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          {isLogin
            ? "Log in to continue to your FYT account."
            : "Join FYT and start turning your skills into opportunities."}
        </p>
      </div>

      {/* Move your existing Google button and separator here. */}

      <form className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            {/* Keep your existing full-name Label and Input here. */}
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-11"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {/* Keep your existing email Label and Input here. */}
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          {/* Keep your existing password Label and Input here. */}
          {/* Show the forgot-password link only when isLogin is true. */}

          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password">Password</Label>

            {isLogin && (
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <Input
            id="password"
            name="password"
            type="password"
            placeholder={
              isLogin ? "Enter your password" : "Create a strong password"
            }
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={8}
            required
            className="h-11"
          />

          {!isLogin && (
            <p className="text-xs text-muted-foreground">
              Use at least 8 characters.
            </p>
          )}
        </div>

        <Button type="submit" className="h-11 w-full">
          {isLogin ? "Log in" : "Create account"}

          <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-2" />
        </Button>

        {/* Keep your existing submit Button here. */}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : "Already have an account? "}

        <Link
          href={isLogin ? "/auth/register" : "/auth/login"}
          className="font-semibold text-primary hover:underline"
        >
          {isLogin ? "Register" : "Log in"}
        </Link>
      </p>

      {/* Move your existing account-switching footer here. */}
      {/* Keep the terms and privacy paragraph registration-only. */}
      {!isLogin && (
        <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </div>
  )
}
