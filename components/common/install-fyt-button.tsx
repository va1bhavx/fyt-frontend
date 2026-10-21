"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function InstallFYTButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null
  )

  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)")

    const updateInstalled = () => {
      setIsInstalled(
        media.matches ||
          (navigator as Navigator & { standalone?: boolean }).standalone ===
            true
      )
    }

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }

    updateInstalled()

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)
    media.addEventListener("change", updateInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
      media.removeEventListener("change", updateInstalled)
    }
  }, [])

  async function handleInstall() {
    if (!installPrompt) return

    await installPrompt.prompt()
    await installPrompt.userChoice

    setInstallPrompt(null)
  }

  if (isInstalled) return null

  if (installPrompt) {
    return <Button onClick={handleInstall}>Install FYT</Button>
  }

  return (
    <p className="text-sm text-muted-foreground">
      To install FYT, open your browser menu and look for <b>Install app</b> or{" "}
      <b>Add to Home Screen</b>.
    </p>
  )
}
