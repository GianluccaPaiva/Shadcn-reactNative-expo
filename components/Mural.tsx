import type { TurmaProps } from "@/hooks/leituraJson"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react-native"
import { Image, View } from "react-native"

import { useMural } from "@/hooks/useMural"
import { BoxMural } from "./BoxMural"
import { AtendimentoContato } from "./AtendimentoContato"
import { AlunosTurma } from "components/AlunosTurma"

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
    abrirContato,
    abrirMensagemContato,
    abrirAlunos,
  } = useMural()

  return (
    <View className="mx-auto min-h-screen w-full max-w-3xl space-y-1 pb-16">
      <Card className="relative h-80 w-full overflow-hidden border-0 bg-transparent py-0 shadow-none">
        <View className="absolute inset-0 h-full w-full">
          <Image
            source={{ uri: turma.banners }}
            accessibilityLabel={`Banner da turma ${materia}`}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <View className="absolute inset-0 bg-black/50" />

        <CardHeader className="relative z-10 flex h-full flex-col justify-between">
          <View>
            <CardTitle className="text-3xl text-white">{turma.materia}</CardTitle>
            <CardDescription className="text-white/90">
              Professor: {turma.professor} | Sala: {turma.sala}
            </CardDescription>
          </View>

          <View className="flex flex-col items-end gap-2">
            <Image
              source={{ uri: turma.foto_professor }}
              accessibilityLabel={`Foto do professor ${turma.professor}`}
              className="h-16 w-16 rounded-full"
              resizeMode="cover"
            />

            <View className="flex flex-row items-center gap-2">
              <Button
                onPress={abrirMural}
                className="px-2 text-white"
                variant="link"
                size="sm"
              >
                <Text>Mural</Text>
              </Button>
              <Button
                onPress={abrirAtividades}
                className="px-2 text-white"
                variant="link"
                size="sm"
              >
                <Text>Atividades</Text>
              </Button>
              <Button
                onPress={abrirContato}
                className="px-2 text-white"
                variant="link"
                size="sm"
              >
                <Text>Entrar em contato</Text>
              </Button>
              <Button
                onPress={abrirAlunos}
                className="px-2 text-white"
                variant="link"
                size="sm"
              >
                <Text>Alunos</Text>
              </Button>
            </View>
          </View>
        </CardHeader>
      </Card>

      <Button
        className="mt-3 w-fit"
        onPress={() => {
          abrirMural()
          mudarAberturaBox(true)
        }}
      >
        <Plus className="h-4 w-4" />
        <Text>Postar no mural</Text>
      </Button>

      <BoxMural
        materia={materia}
        professorNome={turma.professor}
        aberto={posts.boxAberto && posts.tipoAmostar === "mural"}
        onClose={handleCancelar}
        conteudo={conteudo}
        setConteudo={setConteudo}
        onPublicar={handlePublicar}
      />

      <View className="mt-4 space-y-4">
        {posts.tipoAmostar === "mural" ? (
          posts.posts.length > 0 ? (
            posts.posts.map((post) => (
              <Card key={post.id} className="p-4">
                <Text className="mb-2 text-sm text-muted-foreground">{post.data}</Text>
                <Text>{post.conteudo}</Text>
              </Card>
            ))
          ) : (
            <Card className="overflow-hidden p-4">
              <View className="flex items-center justify-center gap-1">
                <Image
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2016/10/28/16/56/list-1778593_1280.png",
                  }}
                  accessibilityLabel="Sem posts"
                  className="h-40 w-40 rounded"
                  resizeMode="cover"
                />
                <Text className="text-muted-foreground">Nenhum post ainda.</Text>
              </View>
            </Card>
          )
        ) : posts.tipoAmostar === "atividade" ? (
          <Card className="overflow-hidden p-4">
            <View className="flex items-center justify-center gap-1">
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/10/28/16/56/list-1778593_1280.png",
                }}
                accessibilityLabel="Sem atividades"
                className="h-40 w-40 rounded"
                resizeMode="cover"
              />
              <Text className="text-muted-foreground">Nenhuma atividade ainda.</Text>
            </View>
          </Card>
        ) : (
          <AtendimentoContato
            professorNome={turma.professor}
            aberto={posts.boxAberto && posts.tipoAmostar === "contato"}
            onClose={handleCancelar}
            assunto={assunto}
            setAssunto={setAssunto}
            mensagem={conteudo}
            setMensagem={setConteudo}
            onEnviar={abrirMensagemContato}
          />
        )}

        {posts.tipoAmostar === "alunos" && <AlunosTurma turma={turma} />}
      </View>
    </View>
  )
}
