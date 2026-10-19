import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="p-0 md:p-4">
      <div className="mx-auto w-full">{children}</div>
    </section>
  )
}
