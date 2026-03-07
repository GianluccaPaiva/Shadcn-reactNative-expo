import type { TurmaProps } from "@/hooks/leituraJson"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react-native"
import { Image, View, ScrollView } from "react-native" // Adicionado ScrollView

import { useMural } from "@/hooks/useMural"
import { BoxMural } from "./BoxMural"
import { AtendimentoContato } from "./AtendimentoContato"
import { AlunosTurma } from "./AlunosTurma" // Ajustado o caminho de importação

type MuralProps = {
  materia: string
  turma: TurmaProps
}

export function Mural({ materia, turma }: MuralProps) {
  const {
    posts,
    conteudo,
    setConteudo,
    assunto,
    setAssunto,
    mudarAberturaBox,
    handlePublicar,
    handleCancelar,
    abrirMural,
    abrirAtividades,
    abrirAlunos,
    // abrirContato e abrirMensagemContato removidos da interface principal conforme combinado
  } = useMural()

  return (
    // Substituído View por ScrollView para permitir rolagem no mobile
    <ScrollView className="flex-1 w-full bg-background" contentContainerClassName="pb-24">

      {/* Banner Superior - Mais compacto (h-40) */}
      <View className="relative h-40 w-full overflow-hidden bg-muted">
        <Image
          source={{ uri: turma.banners }}
          accessibilityLabel={`Banner da turma ${materia}`}
          className="absolute inset-0 h-full w-full"
          resizeMode="cover"
        />
        {/* Overlay um pouco mais escuro para o texto branco ler bem */}
        <View className="absolute inset-0 bg-black/60" />

        {/* Textos e Avatar alinhados no fundo do banner */}
        <View className="absolute inset-0 p-4 flex-row items-end justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-white mb-1" numberOfLines={1}>
              {turma.materia}
            </Text>
            <Text className="text-sm text-white/80" numberOfLines={1}>
              Prof: {turma.professor} | Sala: {turma.sala}
            </Text>
          </View>

          <Image
            source={{ uri: turma.foto_professor }}
            accessibilityLabel={`Foto do professor ${turma.professor}`}
            className="h-14 w-14 rounded-full border-2 border-white/20"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Menu de Abas (Tabs) logo abaixo do banner */}
      <View className="flex-row w-full bg-card border-b border-border p-2 gap-2">
        <Button
          onPress={abrirMural}
          variant={posts.tipoAmostar === "mural" ? "default" : "secondary"}
          className="flex-1 h-10"
          size="sm"
        >
          <Text className={posts.tipoAmostar === "mural" ? "text-primary-foreground font-semibold" : "text-foreground"}>
            Mural
          </Text>
        </Button>

        <Button
          onPress={abrirAtividades}
          variant={posts.tipoAmostar === "atividade" ? "default" : "secondary"}
          className="flex-1 h-10"
          size="sm"
        >
          <Text className={posts.tipoAmostar === "atividade" ? "text-primary-foreground font-semibold" : "text-foreground"}>
            Atividades
          </Text>
        </Button>

        <Button
          onPress={abrirAlunos}
          variant={posts.tipoAmostar === "alunos" ? "default" : "secondary"}
          className="flex-1 h-10"
          size="sm"
        >
          <Text className={posts.tipoAmostar === "alunos" ? "text-primary-foreground font-semibold" : "text-foreground"}>
            Alunos
          </Text>
        </Button>
      </View>

      {/* Conteúdo Dinâmico */}
      <View className="p-4 space-y-4">

        {/* O Botão de Postar só aparece se estiver na aba Mural */}
        {posts.tipoAmostar === "mural" && (
          <Button
            className="w-full flex-row items-center justify-center mb-2"
            onPress={() => mudarAberturaBox(true)}
          >
            <Plus size={18} className="text-primary-foreground mr-2" />
            <Text>Postar no mural</Text>
          </Button>
        )}

        <BoxMural
          materia={materia}
          professorNome={turma.professor}
          aberto={posts.boxAberto && posts.tipoAmostar === "mural"}
          onClose={handleCancelar}
          conteudo={conteudo}
          setConteudo={setConteudo}
          onPublicar={handlePublicar}
        />

        {/* Renderização das Telas */}
        {posts.tipoAmostar === "mural" ? (
          posts.posts.length > 0 ? (
            <View className="gap-3">
              {posts.posts.map((post) => (
                <Card key={post.id} className="p-4 bg-card border-border">
                  <Text className="mb-2 text-xs font-medium text-muted-foreground">{post.data}</Text>
                  <Text className="text-foreground text-base leading-relaxed">{post.conteudo}</Text>
                </Card>
              ))}
            </View>
          ) : (
            <Card className="overflow-hidden p-8 border-dashed border-2 border-border bg-transparent items-center justify-center mt-4">
              <Image
                source={{ uri: "https://cdn.pixabay.com/photo/2016/10/28/16/56/list-1778593_1280.png" }}
                accessibilityLabel="Sem posts"
                className="h-24 w-24 opacity-50 mb-4"
                resizeMode="contain"
              />
              <Text className="text-muted-foreground font-medium">Nenhum post no mural.</Text>
            </Card>
          )
        ) : posts.tipoAmostar === "atividade" ? (
          <Card className="overflow-hidden p-8 border-dashed border-2 border-border bg-transparent items-center justify-center mt-4">
            <Image
              source={{ uri: "https://cdn.pixabay.com/photo/2016/10/28/16/56/list-1778593_1280.png" }}
              accessibilityLabel="Sem atividades"
              className="h-24 w-24 opacity-50 mb-4"
              resizeMode="contain"
            />
            <Text className="text-muted-foreground font-medium">Nenhuma atividade postada.</Text>
          </Card>
        ) : posts.tipoAmostar === "alunos" ? (
          <AlunosTurma turma={turma} />
        ) : null}
      </View>
    </ScrollView>
  )
}