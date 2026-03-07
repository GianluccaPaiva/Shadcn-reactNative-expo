import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { Image, View } from "react-native"

type TurmasProps = {
  materia: string;
  professor: string;
  banners: string;
  fotoProfessor: string;
  sala: string;
  turma: string;
  inscrito?: boolean;
  compacto?: boolean;
  clickInscrito?: () => void;
  clickMural?: (materia: string) => void;
}

export function TurmaCard({ materia, professor, banners, fotoProfessor, sala, turma, inscrito = false, compacto = false, clickMural, clickInscrito }: TurmasProps) {
  return (
    <Card className={`mx-auto w-full overflow-hidden pt-0 ${compacto ? "" : "max-w-sm"}`}>
      <View className="relative">
        <Image
          source={{ uri: banners }}
          accessibilityLabel={`Banner da turma ${materia}`}
          className={`${compacto ? "h-32" : "h-36"} w-full`}
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/20" />
      </View>

      <CardHeader className={compacto ? "p-4 pb-2" : ""}>
        <View className="flex-row items-center justify-between">
          {/* Informações da Turma */}
          <View className="flex-1 mr-3">
            <CardTitle className={compacto ? "text-xl font-bold" : ""}>
              {materia}
            </CardTitle>
            <CardDescription className={compacto ? "text-sm mt-1" : ""}>
              {compacto
                ? `Prof: ${professor} | Sala: ${sala}`
                : `Professor: ${professor} | Sala: ${sala} | Turma: ${turma}`}
            </CardDescription>
          </View>

          {/* Foto do Professor */}
          <Image
            source={{ uri: fotoProfessor }}
            accessibilityLabel={`Foto do professor ${professor}`}
            className={`${compacto ? "h-12 w-12" : "h-14 w-14"} rounded-full border-2 border-primary`}
            resizeMode="cover"
          />
        </View>
      </CardHeader>

      <CardFooter className={compacto ? "p-4 pt-2" : ""}>
        {inscrito ? (
          <View className="w-full flex-row gap-2">
            <Button onPress={() => clickInscrito?.()} variant="destructive" size="sm" className="flex-1">
              <Text>{compacto ? "Sair" : "Cancelar Inscrição"}</Text>
            </Button>
            <Button onPress={() => clickMural?.(materia)} size="sm" className="flex-1">
              <Text>Entrar</Text>
            </Button>
          </View>
        ) : (
          <Button onPress={() => clickInscrito?.()} size="sm" className="w-full">
            <Text>Inscrever-se</Text>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}