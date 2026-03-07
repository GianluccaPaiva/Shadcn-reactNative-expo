import { listaEscolar } from "@/hooks/leituraJson";
import { TurmaCard } from "./TurmaCard";
import { Mural } from "./Mural";
import { Calendario } from "./Calendario";
import { Mensagens } from "./Mensagens";
import type { OpcoesTela } from "@/hooks/useGerenciador";
import { View, ScrollView } from "react-native";
import { Pesquisar } from "./Pesquisar";
import { TigresoEXE } from "./TigresoEXE";

type GerenciadorTelasProps = {
    usuario: any;
    mudarInscricao: (key: string) => void;
    estaInscrito: (key: string) => boolean;
    marcarMural: (key: string) => void;
    navegarPara: (tela: OpcoesTela) => void;
}

export function GerenciadorTelas(props: GerenciadorTelasProps) {
    const turmaSelecionada = listaEscolar.turmas[props.usuario.chaveMural];

    return (
        <View className="flex-1">
            {props.usuario.acessouOq === "principal" && (
                <ScrollView className="flex-1">
                    <View className="flex-row flex-wrap justify-between p-4">
                        {listaEscolar.turmas && Object.entries(listaEscolar.turmas).map(([key, turma]) => (
                            <View key={key} className=" px-2 mb-4">
                                <TurmaCard
                                    materia={turma.materia}
                                    banners={turma.banners}
                                    professor={turma.professor}
                                    fotoProfessor={turma.foto_professor}
                                    sala={turma.sala}
                                    turma={turma.turma}
                                    inscrito={props.estaInscrito(key)}
                                    clickInscrito={() => props.mudarInscricao(key)}
                                    clickMural={() => props.marcarMural(key)}
                                    compacto
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
            {props.usuario.acessouOq === "mural" && (
                <View>
                    {turmaSelecionada && <Mural materia={props.usuario.chaveMural} turma={turmaSelecionada} />}
                </View>
            )}
            {props.usuario.acessouOq === "calendario" && (
                <View className="w-full flex items-center justify-center p-4">
                    <Calendario />
                </View>
            )}

            {props.usuario.acessouOq === "pesquisar" && (
                <View className="w-full flex items-center justify-center p-4">
                    <Pesquisar
                        estaInscrito={props.estaInscrito}
                        mudarInscricao={props.mudarInscricao}
                        marcarMural={props.marcarMural}
                        navegarPara={(tela) => props.navegarPara(tela)}
                        voltarPrincipal={() => props.navegarPara("principal")}
                    />
                </View>
            )}

            {props.usuario.acessouOq === "mensagens" && (
                <View className="w-full flex items-center justify-center p-4">
                    <Mensagens />
                </View>
            )}

            {props.usuario.acessouOq === "suporte" && (
                <View className="flex-1 w-full p-4">
                    <TigresoEXE navegarPara={(tela) => props.navegarPara(tela)} />
                </View>
            )}
        </View>
    )
}