import { cn } from "@/lib/utils"
import type * as React from "react"
import { TextInput, type TextInputProps } from "react-native"

type TextareaChangeEvent = {
  target: {
    value: string
  }
}

type TextareaProps = Omit<TextInputProps, "onChange" | "onChangeText" | "value"> & {
  value?: string
  rows?: number
  onChange?: (event: TextareaChangeEvent) => void
  onChangeText?: (text: string) => void
}

function Textarea({ className, onChange, onChangeText, rows = 4, value, ...props }: TextareaProps) {
  return (
    <TextInput
      className={cn(
        "border-input bg-background text-foreground min-h-[96px] rounded-md border px-3 py-2 text-sm",
        className
      )}
      value={value}
      multiline
      numberOfLines={rows}
      textAlignVertical="top"
      onChangeText={(text) => {
        onChangeText?.(text)
        onChange?.({ target: { value: text } })
      }}
      {...props}
    />
  )
}

export { Textarea }
