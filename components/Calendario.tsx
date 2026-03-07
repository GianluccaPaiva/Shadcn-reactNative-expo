import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "react-native-calendars"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { addDays } from "date-fns"
import { CALENDAR_THEME, MARKED_DATES_THEME } from "@/lib/calendarStyle"
import {useCalendario} from "@/hooks/useCalendario"
export function Calendario() {
  const { dataString, currentMonth, setCurrentMonth, setDate } = useCalendario()

  return (
      <Card 
      className="w-full max-w-md mx-auto h-fit shadow-md">
      <CardContent className="p-2 flex justify-center">
        <Calendar
          theme={CALENDAR_THEME}
          markedDates={{
            [dataString || '']: {
              ...MARKED_DATES_THEME
            }
          }}
          current={currentMonth.toISOString().split("T")[0]}
          onDayPress={(day) => setDate(new Date(day.timestamp))}
          onMonthChange={(month) => setCurrentMonth(new Date(month.timestamp))}
        />
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 p-4">
        {[
          { label: "Hoje", value: 0 },
          { label: "Amanhã", value: 1 },
          { label: "Em 3 dias", value: 3 },
          { label: "Em 1 semana", value: 7 },
          { label: "Em 2 semanas", value: 14 },
        ].map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            className="flex-1 min-w-[100px]"
            onPress={() => {
              const newDate = addDays(new Date(), preset.value)
              setDate(newDate)
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              )
            }}
          >
            <Text>{preset.label}</Text>
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
