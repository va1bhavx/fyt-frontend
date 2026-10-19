import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AuthMode } from "./auth-container"

type AuthTabsProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <Tabs
      value={mode}
      onValueChange={(value) => {
        if (value === "login" || value === "register") {
          onChange(value)
        }
      }}
      className="mb-8 w-full max-w-50"
    >
      <TabsList className="h-11 w-full">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
