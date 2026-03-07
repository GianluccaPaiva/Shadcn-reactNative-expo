import { toast } from "sonner"
import type { OpcoesTela } from "./useGerenciador"
import { Alert, BackHandler, Platform } from "react-native"

export function useTigreso(navegarPara?: (tela: OpcoesTela) => void) {
  const clickMatar = () => {
    toast("Como ousa tentar matar o grande Tigreso? Sofra por isso")

    if (Platform.OS !== "web") {
      setTimeout(() => {
        if (Platform.OS === "android") {
          BackHandler.exitApp()
          return
        }

        Alert.alert("Tigreso ofendido", "No iOS, o app nao pode ser fechado programaticamente.")
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
    toast("Você adorou o Tigreso! Glória ao Tigreso!")
    if (navegarPara) {
      navegarPara("principal")
    }
  }
  return { clickMatar, clickAdorar }
}