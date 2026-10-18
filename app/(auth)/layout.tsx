import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="p-2">
      <div className="mx-auto w-full p-4">{children}</div>
    </section>
  )
}
