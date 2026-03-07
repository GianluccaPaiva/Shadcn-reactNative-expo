import {useState} from "react"

type CalendarioProps = {
    date: Date | undefined,
    mesCorrente:Date,
    dataString: string
}
export function useCalendario() {
    const [calendario, set] = useState<CalendarioProps>({
        date: new Date(),
        mesCorrente: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dataString: new Date().toISOString().split("T")[0]
    })

    return {
        date: calendario.date,
        currentMonth: calendario.mesCorrente,
        dataString: calendario.dataString,
        setDate: (date: Date) => set(prev => ({ ...prev, date, dataString: date.toISOString().split("T")[0] })),
        setCurrentMonth: (date: Date) => set(prev => ({ ...prev, mesCorrente: date }))
    }

}