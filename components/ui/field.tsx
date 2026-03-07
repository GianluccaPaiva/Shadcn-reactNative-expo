import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
import type * as React from "react"
import { View, type ViewProps } from "react-native"

function FieldSet({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn("gap-4", className)} {...props} />
}

function FieldGroup({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn("gap-4", className)} {...props} />
}

function Field({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn("gap-2", className)} {...props} />
}

type FieldLabelProps = React.ComponentProps<typeof Text> & {
  htmlFor?: string
}

function FieldLabel({ className, htmlFor: _htmlFor, ...props }: FieldLabelProps) {
  return <Text className={cn("text-sm font-medium", className)} {...props} />
}

function FieldDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-muted-foreground text-xs", className)} {...props} />
}

export { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet }
