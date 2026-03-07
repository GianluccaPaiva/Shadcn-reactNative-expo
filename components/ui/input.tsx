import { cn } from "@/lib/utils"
import type * as React from "react"
import { TextInput, type TextInputProps } from "react-native"

type InputChangeEvent = {
  target: {
    value: string
  }
}

type InputProps = Omit<TextInputProps, "onChange" | "onChangeText" | "value"> & {
  value?: string
  onChange?: (event: InputChangeEvent) => void
  onChangeText?: (text: string) => void
}

function Input({ className, onChange, onChangeText, value, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "border-input bg-background text-foreground h-10 rounded-md border px-3 text-sm",
        className
      )}
      value={value}
      onChangeText={(text) => {
        onChangeText?.(text)
        onChange?.({ target: { value: text } })
      }}
      {...props}
    />
  )
}

export { Input }
