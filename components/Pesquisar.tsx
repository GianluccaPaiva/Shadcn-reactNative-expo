import { Text } from "@/components/ui/text"
import { TurmaCard } from "./TurmaCard"
import { usePesquisa } from "@/hooks/usePesquisa"
import { Modal, Pressable, ScrollView, View, TextInput, TouchableOpacity, useWindowDimensions } from "react-native"
import { X } from "lucide-react-native"
import { iconWithClassName } from "@/lib/iconWithClassName"
import { OpcoesTela } from "@/hooks/useGerenciador"

iconWithClassName(X)

type PesquisarProps = {
    mudarInscricao: (materia: string) => void
    estaInscrito: (materia: string) => boolean
    marcarMural: (key: string) => void
    navegarPara: (tela: OpcoesTela) => void
    voltarPrincipal: () => void
}

export function Pesquisar(props: PesquisarProps) {
    const { textoPesquisa, setTextoPesquisa, aberto, mudarAberturaSheet, turmasFiltradas, inputRef } = usePesquisa({
        aoFecharPesquisa: props.voltarPrincipal
    })
    const { width } = useWindowDimensions()
    const colunas = width >= 1200 ? 3 : width >= 768 ? 2 : 1
    const larguraCard = colunas === 1 ? "100%" : colunas === 2 ? "50%" : "33.3333%"

    return (
        <Modal
            visible={aberto}
            transparent
            animationType="slide"
            onRequestClose={() => mudarAberturaSheet(false)}
        >
            {/* efeito de baixo para cima*/}
            <View className="flex-1 justify-end">
                <Pressable
                    className="flex-1 bg-black/50"
                    onPress={() => mudarAberturaSheet(false)}
                />

                <View className="h-[90%] w-full rounded-t-3xl border-t border-border bg-background p-5">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-foreground">Pesquisar Salas</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => mudarAberturaSheet(false)}
                            className="ml-2 p-2 rounded-full active:bg-muted/50"
                        >
                            <X size={24} className="text-muted-foreground" />
                        </TouchableOpacity>
                    </View>
                    <Text className="mt-1 text-1x1 text-muted-foreground">
                        Digite para pesquisar turmas, professores ou materias:
                    </Text>

                    <View className="mt-3">
                        <TextInput
                            ref={inputRef}
                            placeholder="Digite sua pesquisa..."
                            value={textoPesquisa}
                            onChangeText={setTextoPesquisa}
                            className="border-input bg-background text-foreground h-12 rounded-md border px-3 text-base"
                            autoFocus
                        />
                    </View>

                    <ScrollView className="mt-3 flex-1" contentContainerClassName="pb-6">
                        {textoPesquisa.trim() === "" ? (
                            <Text className="py-8 text-center text-sm text-muted-foreground">
                                Digite algo para comecar a pesquisa
                            </Text>
                        ) : turmasFiltradas.length > 0 ? (
                            <>
                                <Text className="mb-2 text-xs text-muted-foreground">
                                    {turmasFiltradas.length} resultado{turmasFiltradas.length !== 1 ? "s" : ""}
                                </Text>

                                <View className="flex-row flex-wrap">
                                    {turmasFiltradas.map(([key, turma]) => (
                                        <TurmaCard
                                            key={key}
                                            compacto={true}
                                            materia={turma.materia}
                                            banners={turma.banners}
                                            professor={turma.professor}
                                            fotoProfessor={turma.foto_professor}
                                            sala={turma.sala}
                                            turma={turma.turma}
                                            inscrito={props.estaInscrito(key)}
                                            clickInscrito={() => props.mudarInscricao(key)}
                                            clickMural={() => {
                                                props.marcarMural(key)
                                                mudarAberturaSheet(false)
                                                props.navegarPara("mural")
                                            }}
                                        />
                                    ))}
                                </View>
                            </>
                        ) : (
                            <Text className="py-8 text-center text-sm text-muted-foreground">
                                Nenhum resultado encontrado para "{textoPesquisa}"
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}