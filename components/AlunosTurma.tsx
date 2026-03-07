import type { TurmaProps } from "@/hooks/leituraJson"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { View } from "react-native"
import { AlertCircle, MessageCircle, MoreHorizontal, User2, Users } from "lucide-react-native"

type AlunosTurmaProps = {
  turma: TurmaProps
}

function getCorAvatar(index: number) {
  const cores = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-orange-600",
    "bg-pink-600",
    "bg-violet-600",
    "bg-cyan-600",
  ]

  return cores[index % cores.length]
}

export function AlunosTurma({ turma }: AlunosTurmaProps) {
  return (
    <View className="mx-auto w-full max-w-4xl space-y-3 pb-8">
      <View className="flex-row items-center justify-between px-1">
        <View className="flex-row items-center gap-2">
          <Users size={18} color="#a1a1aa" />
          <Text className="text-lg font-medium">Colegas de Turma</Text>
        </View>
        <Text className="text-sm text-muted-foreground">
          {turma.alunos.length} {turma.alunos.length === 1 ? "aluno" : "alunos"}
        </Text>
      </View>

      <Card className="overflow-hidden border border-border bg-card p-0">
        <View className="flex-row border-b border-border bg-muted/30 px-4 py-3">
          <Text className="flex-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome do aluno
          </Text>
          <Text className="w-20 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Acoes
          </Text>
        </View>

        {turma.alunos.map((aluno, index) => (
          <View
            key={`${aluno}-${index}`}
            className="flex-row items-center border-b border-border/60 px-4 py-3 last:border-b-0"
          >
            <View className="flex-1 flex-row items-center gap-3">
              <View
                className={`h-8 w-8 items-center justify-center rounded-full ${getCorAvatar(index)}`}
              >
                <Text className="text-xs font-bold text-white">
                  {aluno.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text className="text-sm font-medium">{aluno}</Text>
            </View>

            <View className="w-20 items-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} color="#a1a1aa" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User2 size={16} color="#e4e4e7" />
                    <Text>Ver perfil</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle size={16} color="#e4e4e7" />
                    <Text>Enviar mensagem</Text>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem variant="destructive">
                    <AlertCircle size={16} color="#ef4444" />
                    <Text className="text-destructive">Denunciar</Text>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </View>
          </View>
        ))}
      </Card>
    </View>
  )
}
