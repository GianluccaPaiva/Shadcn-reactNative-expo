import { Text } from "@/components/ui/text"
import { TurmaCard } from "./TurmaCard"
import { usePesquisa } from "@/hooks/usePesquisa"
import { ScrollView, View, TextInput } from "react-native"
import { Search } from "lucide-react-native"
import { iconWithClassName } from "@/lib/iconWithClassName"
import type { OpcoesTela } from "@/hooks/useGerenciador"

iconWithClassName(Search)

type PesquisarProps = {
    mudarInscricao: (materia: string) => void
    estaInscrito: (materia: string) => boolean
    marcarMural: (key: string) => void
    navegarPara: (tela: OpcoesTela) => void
    voltarPrincipal: () => void
}

export function Pesquisar(props: PesquisarProps) {
    const { textoPesquisa, setTextoPesquisa, turmasFiltradas, inputRef } = usePesquisa({
        aoFecharPesquisa: props.voltarPrincipal
    })

    return (
        <View style={{ flex: 1, width: '100%' }} className="bg-background">

            <View className="mb-2">
                <Text className="text-2xl font-bold text-foreground mb-1">Descobrir Turmas</Text>

                <View className="flex-row items-center border border-border bg-secondary/30 rounded-lg px-3 mt-3 h-12">
                    <Search size={20} className="text-muted-foreground mr-2" />
                    <TextInput
                        ref={inputRef}
                        placeholder="Digite sua pesquisa..."
                        placeholderTextColor="#64748b"
                        value={textoPesquisa}
                        onChangeText={setTextoPesquisa}
                        className="flex-1 text-foreground text-base h-full outline-none"
                        autoFocus
                    />
                </View>
            </View>

            <ScrollView
                style={{ flex: 1, marginTop: 8 }}
                contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                {textoPesquisa.trim() === "" ? (
                    <Text className="py-8 text-center text-base text-muted-foreground">
                        Comece a digitar para ver os resultados...
                    </Text>
                ) : turmasFiltradas.length > 0 ? (
                    <View className="pt-2">
                        <Text className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {turmasFiltradas.length} resultado{turmasFiltradas.length !== 1 ? "s" : ""}
                        </Text>

                        <View className="w-full">
                            {turmasFiltradas.map(([key, turma]) => (
                                <View key={key} className="mb-4 w-full">
                                    <TurmaCard
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
                                            props.navegarPara("mural")
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <Text className="py-8 text-center text-base text-muted-foreground">
                        Nenhum resultado encontrado para "{textoPesquisa}"
                    </Text>
                )}
            </ScrollView>
        </View>
    )
}