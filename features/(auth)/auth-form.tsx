import { Label } from "@/components/ui/label"
import type { AuthMode } from "./auth-container"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Separator } from "@/components/ui/separator"

type AuthFormProps = {
  mode: AuthMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login"
  return (
    <div>
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight md:text-3xl">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        <p className="text-xs text-muted-foreground md:text-sm">
          {isLogin
            ? "Log in to continue to your FYT account."
            : "Join FYT and start turning your skills into opportunities."}
        </p>
      </div>

      <div className="mb-4 space-y-5">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full"
          onClick={() => {
            // Connect your Google OAuth flow here.
          }}
        >
          <svg viewBox="0 0 24 24" className="mr-2 size-4" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.09Z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45.99 14.97 0 12 0a11 11 0 0 0-9.85 7.06l3.69 2.84C6.71 7.3 9.14 4.36 12 4.36Z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">
            OR CONTINUE WITH EMAIL
          </span>
          <Separator className="flex-1" />
        </div>
      </div>
      {/* Move your existing Google button and separator here. */}

      <form className="space-y-6">
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

        {!isLogin && (
          <div className="space-y-2">
            {/* Keep your existing full-name Label and Input here. */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
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
