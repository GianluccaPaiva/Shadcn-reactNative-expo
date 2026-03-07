import { toast } from "sonner"
import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useTigreso } from "@/hooks/useTigreso"
import type { OpcoesTela } from "@/hooks/useGerenciador"
import { Image, SafeAreaView, ScrollView, View } from "react-native"

type TigresoEXEProps = {
  navegarPara?: (tela: OpcoesTela) => void
}

export function TigresoEXE({ navegarPara }: TigresoEXEProps) {
  const { clickMatar, clickAdorar } = useTigreso(navegarPara)
  const hasShown = useRef(false)

  useEffect(() => {
    if (!hasShown.current) {
      toast("Glória ao Tigreso. Ajoelhe-se e adore o grande Tigreso, o deus supremo do suporte. Ele é o senhor dos bugs, o mestre dos erros e o guardião da estabilidade. Com seu poder divino, ele protege os sistemas e garante que tudo funcione perfeitamente. Glória ao Tigreso, o deus do suporte!")
      hasShown.current = true
    }
  }, [])

  return (
      <ScrollView contentContainerClassName="flex-grow items-center justify-center px-4 py-6">
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
              className="mx-auto mb-4 h-80 w-full rounded-lg"
              resizeMode="cover"
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
  )
}