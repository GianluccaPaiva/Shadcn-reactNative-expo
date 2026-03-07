import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "react-native-calendars"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { addDays } from "date-fns"
import { useCalendario } from "@/hooks/useCalendario"
import { useColorScheme } from "nativewind"

export function Calendario() {
  const { dataString, currentMonth, setCurrentMonth, setDate } = useCalendario()
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'

  const dynamicCalendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: isDark ? '#64748b' : '#71717a',
    selectedDayBackgroundColor: '#8b5cf6',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#a78bfa',
    dayTextColor: isDark ? '#f8fafc' : '#09090b',
    textDisabledColor: isDark ? '#334155' : '#d4d4d8',
    arrowColor: isDark ? '#f8fafc' : '#09090b',
    monthTextColor: isDark ? '#f8fafc' : '#09090b',
    textDayFontFamily: 'System',
    textMonthFontFamily: 'System',
    textDayHeaderFontFamily: 'System',
    textMonthFontWeight: 'bold' as const,
  }

  return (
    <Card className="w-full max-w-md mx-auto h-fit shadow-md border-border bg-card">
      <CardContent className="p-2 flex justify-center">
        <Calendar
          theme={dynamicCalendarTheme}
          markedDates={{
            [dataString || '']: {
              selected: true,
              selectedColor: '#8b5cf6',
              selectedTextColor: '#ffffff'
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