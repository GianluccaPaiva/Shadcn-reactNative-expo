import { useEffect, useRef, useState } from "react"
import type { OpcoesTela } from "./useGerenciador"
import { Alert as NativeAlert, BackHandler, Platform } from "react-native"

type FeedbackPayload = {
  title: string
  message: string
  variant?: "default" | "destructive"
}

export function useTigreso(navegarPara?: (tela: OpcoesTela) => void) {
  const [feedback, setFeedback] = useState<FeedbackPayload | null>(null)
  const hasShownInitialFeedback = useRef(false)

  useEffect(() => {
    if (!hasShownInitialFeedback.current) {
      setFeedback({
        title: "Gloria ao Tigreso",
        message:
          "Glória ao Tigreso. Ajoelhe-se e adore o grande Tigreso, o deus supremo do suporte. Ele é o senhor dos bugs, o mestre dos erros e o guardião da estabilidade. Com seu poder divino, ele protege os sistemas e garante que tudo funcione perfeitamente. Glória ao Tigreso, o deus do suporte!",
      })
      hasShownInitialFeedback.current = true
    }
  }, [])

  useEffect(() => {
    if (!feedback) return

    const timer = setTimeout(() => {
      setFeedback(null)
    }, 3500)

    return () => clearTimeout(timer)
  }, [feedback])

  const clickMatar = () => {
    setFeedback({
      title: "Tigreso ofendido",
      message: "Como ousa tentar matar o grande Tigreso? Sofra por isso.",
      variant: "destructive",
    })

    if (Platform.OS !== "web") {
      setTimeout(() => {
        if (Platform.OS === "android") {
          BackHandler.exitApp()
          return
        }

        NativeAlert.alert("Tigreso ofendido", "No iOS, o app nao pode ser fechado programaticamente.")
      }, 1000)
      return
    }

    if (typeof window === "undefined") {
      return
    }

    // Tenta fechar a aba imediatamente dentro do gesto de clique.
    try {
      window.open("", "_self")
    } catch {}

    try {
      window.close()
    } catch {}

    // Fallback: se o navegador bloquear o close, sai do app para uma pagina vazia.
    if (!window.closed) {
      try {
        window.location.replace("about:blank")
      } catch {
        window.location.href = "about:blank"
      }
    }
  }
  const clickAdorar = () => {
    setFeedback({
      title: "Gloria ao Tigreso",
      message: "Voce adorou o Tigreso! Gloria ao Tigreso!",
    })
    if (navegarPara) {
      navegarPara("principal")
    }
  }
  return { clickMatar, clickAdorar, feedback }
}