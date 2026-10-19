"use client"

import { usePathname, useRouter } from "next/navigation"

import { AuthHero } from "./auth-hero"
import { AuthTabs } from "./auth-tabs"
import { AuthForm } from "./auth-form"

export type AuthMode = "login" | "register"

export default function AuthContainer() {
  const pathname = usePathname()
  const router = useRouter()

  const activeTab: AuthMode = pathname === "/auth/login" ? "login" : "register"

  function handleTabChange(mode: AuthMode) {
    router.push(`/auth/${mode}`)
  }

  return (
    <section className="min-h-[calc(100vh-32px)] lg:grid lg:grid-cols-2">
      <AuthHero mode={activeTab} />

      <section className="relative z-10 -mt-8 flex items-center justify-center rounded-t-[2rem] bg-background px-5 pt-8 pb-10 lg:mt-0 lg:rounded-none lg:py-10">
        <div className="w-full max-w-md">
          <AuthTabs mode={activeTab} onChange={handleTabChange} />

          <AuthForm mode={activeTab} />
        </div>
      </section>
    </section>
  )
}
