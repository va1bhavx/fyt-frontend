"use client"
import Link from "next/link"
import {
  ArrowRight01Icon,
  DollarCircleIcon,
  FileEditIcon,
  SparklesIcon,
  TeamWorkIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const REGISTER_STEPS = [
  {
    id: 1,
    title: "Create your account",
    description: "Sign up in less than a minute.",
    icon: UserCircleIcon,
  },
  {
    id: 2,
    title: "Build your profile",
    description: "Showcase your skills and interests.",
    icon: FileEditIcon,
  },
  {
    id: 3,
    title: "Find your first task",
    description: "Discover tasks that fit your skills.",
    icon: SparklesIcon,
  },
  {
    id: 4,
    title: "Get paid for your work",
    description: "Complete tasks and earn money.",
    icon: DollarCircleIcon,
  },
]

const LOGIN_STEPS = [
  {
    id: 1,
    title: "Discover new tasks",
    description: "Find work that matches your skills.",
    icon: SparklesIcon,
  },
  {
    id: 2,
    title: "Manage your work",
    description: "Keep track of your ongoing tasks.",
    icon: FileEditIcon,
  },
  {
    id: 3,
    title: "Build your reputation",
    description: "Deliver quality work and earn trust.",
    icon: UserCircleIcon,
  },
  {
    id: 4,
    title: "Keep earning",
    description: "Turn your skills into more opportunities.",
    icon: DollarCircleIcon,
  },
]

export default function AuthContainer() {
  const pathname = usePathname()
  const router = useRouter()

  const activeTab = pathname === "/auth/login" ? "login" : "register"
  const steps = activeTab === "login" ? LOGIN_STEPS : REGISTER_STEPS
  return (
    <section className="min-h-[calc(100vh-72px)] lg:grid lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-primary/5 p-10 lg:flex xl:p-14">
        <div className="pointer-events-none absolute top-1/4 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              F
            </span>
            FYT
          </Link>
        </div>

        <div className="relative my-12 max-w-lg">
          <h1 className="text-4xl leading-tight font-bold tracking-tight xl:text-5xl">
            {activeTab === "login" ? (
              <>
                Good to have you
                <br />
                <span className="text-primary">back.</span>
              </>
            ) : (
              <>
                Small tasks.
                <br />
                <span className="text-primary">Real opportunities.</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
            {activeTab === "login"
              ? "Pick up where you left off. Discover new tasks, connect with people, and keep making progress on FYT."
              : "Turn your skills into earnings. Find meaningful tasks, work with people, and get rewarded for what you do."}
          </p>

          <div className="mt-10 space-y-0">
            {steps.map((step, index) => {
              const isLast = index === REGISTER_STEPS.length - 1

              return (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
                      <HugeiconsIcon
                        icon={step.icon}
                        size={20}
                        className="text-primary"
                      />
                    </div>

                    {!isLast && (
                      <div className="my-1 min-h-7 w-px flex-1 bg-border" />
                    )}
                  </div>

                  <div className={isLast ? "pb-0" : "pb-6"}>
                    <h2 className="font-semibold">{step.title}</h2>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>Built for people who get things done.</span>
          <span>© {new Date().getFullYear()} FYT</span>
        </div>
      </section>

      {/* Mobile hero header */}
      <section className="relative overflow-hidden bg-primary/5 px-6 pt-8 pb-16 text-white lg:hidden">
        <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative">
          <h1 className="max-w-sm text-3xl leading-tight font-bold tracking-tight">
            {activeTab === "login" ? (
              <>
                Good to have you
                <br />
                <span className="text-primary">back.</span>
              </>
            ) : (
              <>
                Small tasks.
                <br />
                <span className="text-primary">Real opportunities.</span>
              </>
            )}
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
            {activeTab === "login"
              ? "Pick up where you left off. Discover new tasks and keep making progress on FYT."
              : "Turn your skills into earnings. Find meaningful tasks and get rewarded for what you do."}
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-8 flex items-center justify-center rounded-t-[2rem] bg-background px-5 pt-8 pb-10 lg:mt-0 lg:rounded-none lg:py-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-lg font-bold lg:hidden"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              F
            </span>
            FYT
          </Link>

          <div className="mb-8 flex flex-col gap-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                router.push(
                  value === "login" ? "/auth/login" : "/auth/register"
                )
              }}
              className={"w-full max-w-50"}
            >
              <TabsList className="h-11 w-full">
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {activeTab === "login" ? "Welcome back" : "Create your account"}
              </h2>

              <p className="text-sm leading-6 text-muted-foreground">
                {activeTab === "login"
                  ? "Log in to continue to your FYT account."
                  : "Join FYT and start turning your skills into opportunities."}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full"
              onClick={() => {
                // Connect your Google OAuth flow here.
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 size-4"
                aria-hidden="true"
              >
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

            <form className="space-y-4">
              {activeTab === "register" && (
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
              )}

              <div className="space-y-2">
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
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password">Password</Label>

                  {activeTab === "login" && (
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
                    activeTab === "login"
                      ? "Enter your password"
                      : "Create a strong password"
                  }
                  autoComplete={
                    activeTab === "login" ? "current-password" : "new-password"
                  }
                  minLength={8}
                  required
                  className="h-11"
                />

                {activeTab === "register" && (
                  <p className="text-xs text-muted-foreground">
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              <Button type="submit" className="h-11 w-full">
                {activeTab === "login" ? "Log in" : "Create account"}

                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  className="ml-2"
                />
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {activeTab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}

            <Link
              href={activeTab === "login" ? "/auth/register" : "/auth/login"}
              className="font-semibold text-primary hover:underline"
            >
              {activeTab === "login" ? "Register" : "Log in"}
            </Link>
          </p>

          {activeTab === "register" && (
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
      </section>
    </section>
  )
}
