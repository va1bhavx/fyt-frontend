import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="">
      <div className="mx-auto w-full">{children}</div>
    </section>
  )
}
