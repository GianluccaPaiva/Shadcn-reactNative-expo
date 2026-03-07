
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { Image, View } from "react-native"

export function Mensagens() {
    return (
        <View className="w-full h-full items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Mensagens dos professores para você</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/561/561127.png" }}
                        accessibilityLabel="Icone de mensagens"
                        className="mx-auto mb-4 h-16 w-16"
                        resizeMode="contain"
                    />
                    <Text className="text-center text-muted-foreground">
                        Nenhuma mensagem disponivel no momento. Aguarde que logo logo o professor ira responder.
                    </Text>
                </CardContent>
            </Card>
        </View>
    )
    
}