import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { Home, Inbox, Calendar, Search, ChevronDown, ChevronUp } from "lucide-react-native"
import { iconListWithClassName } from "@/lib/iconWithClassName"
import { Configuracoes } from "./Configuracoes"
import type { OpcoesTela } from "@/hooks/useGerenciador"
import { listaEscolar } from "@/hooks/leituraJson"
import { getCorMateria } from "@/lib/utils"

const items = [
    { title: "Inicio", icon: Home, action: "principal" },
    { title: "Pesquisar", icon: Search, action: "pesquisar" },
    { title: "Mensagens", icon: Inbox, action: "mensagens" },
    { title: "Calendario", icon: Calendar, action: "calendario" },
]

const icons = [Home, Inbox, Calendar, Search, ChevronDown, ChevronUp];
iconListWithClassName(icons);

type AppSidebarProps = {
    navegarPara: (tela: OpcoesTela) => void;
    inscricoes: Record<string, boolean>;
    marcarMural: (key: string) => void;
}

export function AppSidebar({ navegarPara, inscricoes, marcarMural }: AppSidebarProps) {
    const [aulasAbertas, setAulasAbertas] = useState(false);

    return (
        <View className="flex-1 w-64 bg-background border-r border-border">
            {/* Header */}
            <View className="p-4 border-b border-border">
                <TouchableOpacity
                    className="flex-row items-center gap-2"
                    onPress={() => navegarPara("principal")}
                >
                    <Image
                        source={require('../assets/Logos/Logo.png')}
                        style={{ width: 22, height: 22 }}
                    />
                    <Text className="text-lg font-bold text-foreground">NexusClass</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                {/* Menu Principal */}
                <View className="p-4">
                    <Text className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                        Menu Principal
                    </Text>
                    <View className="gap-1">
                        {items.map((item) => (
                            <TouchableOpacity
                                key={item.title}
                                className="flex-row items-center py-2 px-3 rounded-md active:bg-secondary/50"
                                onPress={() => navegarPara(item.action as OpcoesTela)}
                            >
                                <item.icon size={20} className="text-foreground" />
                                <Text className="ml-3 text-base text-foreground flex-1">
                                    {item.title}
                                </Text>

                                {item.title === "Mensagens" && (
                                    <View className="bg-primary rounded-full px-2 py-0.5">
                                        <Text className="text-primary-foreground text-xs font-bold">0</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="h-[1px] w-full bg-border my-2" />

                {/* Minhas Aulas*/}
                <View className="p-4">
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-2 px-1"
                        onPress={() => setAulasAbertas(!aulasAbertas)}
                    >
                        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Minhas Aulas
                        </Text>
                        {aulasAbertas ? (
                            <ChevronUp size={16} className="text-muted-foreground" />
                        ) : (
                            <ChevronDown size={16} className="text-muted-foreground" />
                        )}
                    </TouchableOpacity>

                    {aulasAbertas && (
                        <View className="mt-2 pl-2 gap-1">
                            {Object.entries(inscricoes).filter(([_, inscrito]) => inscrito).length === 0 ? (
                                <Text className="text-sm text-muted-foreground px-2 py-1">
                                    Nenhuma aula inscrita
                                </Text>
                            ) : (
                                Object.entries(inscricoes)
                                    .filter(([_, inscrito]) => inscrito)
                                    .map(([key, _]) => {
                                        const turma = listaEscolar.turmas[key];
                                        if (!turma) return null;

                                        return (
                                            <TouchableOpacity
                                                key={key}
                                                onPress={() => marcarMural(key)}
                                                className="flex-row items-center py-2 px-2 rounded-md active:bg-secondary/50"
                                            >
                                                <View className={`h-5 w-5 rounded-full items-center justify-center ${getCorMateria(turma.materia)}`}>
                                                    <Text className="text-[10px] font-bold text-white">
                                                        {turma.materia.charAt(0).toUpperCase()}
                                                    </Text>
                                                </View>
                                                <Text className="ml-3 text-sm text-foreground" numberOfLines={1}>
                                                    {turma.materia} - {turma.turma}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>

            <View className="h-[1px] w-full bg-border" />

            {/* Footer */}
            <View className="p-4">
                <Configuracoes navegarPara={navegarPara} />
            </View>
        </View>
    )
}