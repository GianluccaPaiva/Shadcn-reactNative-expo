import type { OpcoesTela } from "./useGerenciador"
import { Alert as NativeAlert, BackHandler, Platform } from "react-native"

type FeedbackPayload = {
  title: string
  message: string
  variant?: "default" | "destructive"
}

type MostrarFeedback = (payload: FeedbackPayload) => void

export function useTigreso(
  navegarPara?: (tela: OpcoesTela) => void,
  mostrarFeedback?: MostrarFeedback
) {
  const clickMatar = () => {
    mostrarFeedback?.({
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

    setTimeout(() => {
      if (typeof window === "undefined") {
        return
      }

      try {
        window.open("", "_self")
      } catch {}

      window.close()

      setTimeout(() => {
        if (!window.closed) {
          window.location.replace("about:blank")
        }
      }, 150)
    }, 1000)
  }
  const clickAdorar = () => {
    mostrarFeedback?.({
      title: "Gloria ao Tigreso",
      message: "Voce adorou o Tigreso! Gloria ao Tigreso!",
    })
    if (navegarPara) {
      navegarPara("principal")
    }
  }
  return { clickMatar, clickAdorar }
}