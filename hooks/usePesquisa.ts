import { listaEscolar } from "hooks/leituraJson"
import { useState, useMemo, useEffect, useRef } from "react"
import { TextInput } from "react-native"

type UsePesquisaProps = {
    aoFecharPesquisa: () => void
}

export function usePesquisa({ aoFecharPesquisa }: UsePesquisaProps) {
    const [textoPesquisa, setTextoPesquisa] = useState("")
    const [aberto, setAberto] = useState(true)
    const inputRef = useRef<TextInput>(null)

    const mudarAberturaSheet = (estaAberto: boolean) => {
        setAberto(estaAberto)
        if (!estaAberto) {
            aoFecharPesquisa()
        }
    }

    useEffect(() => {
        if (aberto) {
            const timer = setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [aberto])

    const turmasFiltradas = useMemo(() => {
        if (!textoPesquisa.trim()) return []

        const consulta = textoPesquisa.toLowerCase()
        return Object.entries(listaEscolar.turmas).filter(([_, turma]) => {
            return (
                turma.materia.toLowerCase().includes(consulta) ||
                turma.professor.toLowerCase().includes(consulta) ||
                turma.sala.toLowerCase().includes(consulta) ||
                turma.turma.toLowerCase().includes(consulta)
            )
        })
    }, [textoPesquisa])

    return {
        textoPesquisa,
        setTextoPesquisa,
        aberto,
        mudarAberturaSheet,
        turmasFiltradas,
        inputRef,
    }
}