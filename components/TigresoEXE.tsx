import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTigreso } from "@/hooks/useTigreso"
import type { OpcoesTela } from "@/hooks/useGerenciador"
import { CircleAlert, ShieldAlert } from "lucide-react-native"
import { Image, ScrollView, View } from "react-native"

type TigresoEXEProps = {
  navegarPara?: (tela: OpcoesTela) => void
}

export function TigresoEXE({ navegarPara }: TigresoEXEProps) {
  const [feedback, setFeedback] = useState<{
    title: string
    message: string
    variant?: "default" | "destructive"
  } | null>(null)

  const { clickMatar, clickAdorar } = useTigreso(navegarPara, setFeedback)
  const hasShown = useRef(false)

  useEffect(() => {
    if (!hasShown.current) {
      setFeedback({
        title: "Gloria ao Tigreso",
        message:
          "Ajoelhe-se e adore o grande Tigreso, o deus supremo do suporte e guardiao da estabilidade.",
      })
      hasShown.current = true
    }
  }, [])

  useEffect(() => {
    if (!feedback) return

    const timer = setTimeout(() => {
      setFeedback(null)
    }, 3500)

    return () => clearTimeout(timer)
  }, [feedback])

  return (
    <View className="relative flex-1">
      {feedback && (
        <View className="absolute left-3 right-3 top-3 z-50">
          <Alert
            variant={feedback.variant}
            icon={feedback.variant === "destructive" ? ShieldAlert : CircleAlert}
            className="bg-background/95 shadow-sm shadow-black/20"
          >
            <AlertTitle>{feedback.title}</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        </View>
      )}

      <ScrollView
        contentContainerClassName={`flex-grow items-center justify-center px-4 ${feedback ? "pb-6 pt-24" : "py-6"}`}
      >
        <Card className="w-full max-w-md bg-yellow-500 py-4">
          <CardHeader>
            <CardTitle>Glorifique o Tigreso</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvBcRo5HWNC-WR4C4ls6kVCYEp9Ja7W0azAA&s",
              }}
              accessibilityLabel="Apenas tigreso"
              className="mx-auto mb-4 w-full rounded-lg bg-black/10"
              style={{ aspectRatio: 1 }}
              resizeMode="contain"
            />
            <View className="flex-row gap-3">
              <Button variant="destructive" size="lg" className="flex-1" onPress={clickMatar}>
                <Text>Matar</Text>
              </Button>
              <Button className="flex-1 bg-green-500" size="lg" onPress={clickAdorar}>
                <Text>Adorar</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  )
}