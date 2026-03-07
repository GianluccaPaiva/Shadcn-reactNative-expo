import { useState } from "react"
import { Platform, Vibration } from "react-native"
import { Audio } from "expo-av"

const CLIQUES_PARA_SUPORTE = 5
const TIGRESO_SOUND = require("../assets/sons/tigreso.mp3")

export function useConfiguracoes() {
    const [notificacoes, setNotificacoes] = useState(false)
    const [contagemSuporte, setContagemSuporte] = useState(0)

    const clickarNotificacoes = () => {
        setNotificacoes(!notificacoes)
    }

    const tocarBeepWeb = () => {
        const AudioContextClass =
            (globalThis as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext ||
            (globalThis as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).webkitAudioContext

        if (!AudioContextClass) {
            return
        }

        try {
            const audioContext = new AudioContextClass()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.type = "square"
            oscillator.frequency.value = 880
            gainNode.gain.value = 0.15

            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.2)
        } catch {
            // Sem fallback adicional.
        }
    }

    const tocarSomTigreso = async () => {
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
            })

            const { sound } = await Audio.Sound.createAsync(
                TIGRESO_SOUND,
                { shouldPlay: true, volume: 1 }
            )

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync().catch(() => {})
                }
            })
        } catch {
            if (Platform.OS === "web") {
                tocarBeepWeb()
                return
            }

            Vibration.vibrate(250)
        }
    }

    const clicarSuporte = (aoDesbloquear?: () => void) => {
        const novaContagem = contagemSuporte + 1
        const desbloqueou = novaContagem >= CLIQUES_PARA_SUPORTE

        setContagemSuporte(desbloqueou ? 0 : novaContagem)

        if (desbloqueou) {
            void tocarSomTigreso()
            aoDesbloquear?.()
        }

        return desbloqueou
    }

    return { notificacoes, clickarNotificacoes, clicarSuporte }
}