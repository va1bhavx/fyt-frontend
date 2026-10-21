import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { AuthMode } from "./auth-container"
import { LOGIN_STEPS, REGISTER_STEPS } from "./auth-config"
import Image from "next/image"

type AuthHeroProps = {
  mode: AuthMode
}

export function AuthHero({ mode }: AuthHeroProps) {
  const isLogin = mode === "login"
  const steps = isLogin ? LOGIN_STEPS : REGISTER_STEPS

  const title = isLogin
    ? "Good to have you back."
    : "Small tasks. Real opportunities."

  const description = isLogin
    ? "Pick up where you left off. Discover new tasks, connect with people, and keep making progress on FYT."
    : "Turn your skills into earnings. Find meaningful tasks, work with people, and get rewarded for what you do."

  return (
    <>
      <section className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-tr from-primary/25 via-primary/10 to-primary/5 p-10 lg:flex xl:p-14">
        <Link
          href="/"
          aria-label="FYT home"
          className="mb-2 block h-20 w-[100px] overflow-hidden"
        >
          <Image
            src="/fyt_logo.png"
            alt="FYT"
            width={300}
            height={300}
            priority
            className="relative left-[-6px] block object-contain"
          />
        </Link>

        <div className="my-12 max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
            {title}
          </h1>

          <p className="mt-5 leading-7 text-muted-foreground">{description}</p>

          <div className="mt-10 space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-xl border bg-background">
                    <HugeiconsIcon
                      icon={step.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="my-1 min-h-7 w-px flex-1 bg-border" />
                  )}
                </div>

                <div className={index === steps.length - 1 ? "" : "pb-6"}>
                  <h2 className="font-semibold">{step.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Built for people who get things done.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary/10 px-6 pt-8 pb-16 lg:hidden">
        <h1 className="max-w-sm text-3xl leading-tight font-bold tracking-tight">
          {isLogin ? (
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

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {isLogin
            ? "Pick up where you left off. Discover new tasks and keep making progress on FYT."
            : "Turn your skills into earnings. Find meaningful tasks and get rewarded for what you do."}
        </p>
      </section>
    </>
  )
}
