import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useColorScheme } from "nativewind"
import { Menu, User, Mail, Bell, AlertCircle, LogOutIcon, Edit, Sun, Moon } from "lucide-react-native"
import { iconWithClassName } from "@/lib/iconWithClassName"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

iconWithClassName(Menu);
iconWithClassName(Sun);
iconWithClassName(Moon);
iconWithClassName(Bell);
iconWithClassName(Mail);
iconWithClassName(AlertCircle);
iconWithClassName(User);
iconWithClassName(Edit);
iconWithClassName(LogOutIcon);

export function Navbar() {
    const { colorScheme, setColorScheme } = useColorScheme()

    const [notifications, setNotifications] = React.useState({
        email: true,
        alert: true,
    })

    return (
        <View className="flex-row items-center justify-between px-2 py-4 bg-background border-b border-border mt-8">

            {/* Esquerda: Menu e Título */}
            <View className="flex-row items-center gap-2">
                <TouchableOpacity className="p-2">
                    <Menu className="text-foreground" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-foreground">
                    NexusClass
                </Text>
            </View>

            {/* Direita: Dropdowns */}
            <View className="flex-row items-center gap-1">

                {/* Notificações */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Bell className="text-foreground" size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Tipos de Notificação</DropdownMenuLabel>
                            <DropdownMenuCheckboxItem
                                checked={notifications.email}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, email: !!checked })}
                            >
                                <View className="flex-row items-center">
                                    <Mail className="text-foreground mr-2" size={16} />
                                    <Text className="text-foreground">Mensagens</Text>
                                </View>
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={notifications.alert}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, alert: !!checked })}
                            >
                                <View className="flex-row items-center">
                                    <AlertCircle className="text-foreground mr-2" size={16} />
                                    <Text className="text-foreground">Alertas</Text>
                                </View>
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Tema */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            {colorScheme === 'dark' ? (
                                <Moon className="text-foreground" size={20} />
                            ) : (
                                <Sun className="text-foreground" size={20} />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onPress={() => setColorScheme("light")}>
                            <Text className="text-foreground">Claro</Text>
                        </DropdownMenuItem>
                        <DropdownMenuItem onPress={() => setColorScheme("dark")}>
                            <Text className="text-foreground">Escuro</Text>
                        </DropdownMenuItem>
                        <DropdownMenuItem onPress={() => setColorScheme("system")}>
                            <Text className="text-foreground">Sistema</Text>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Perfil */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 w-9 rounded-full p-0 ml-1">
                            <Avatar className="h-8 w-8" alt="User avatar">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <Text>US</Text>
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <View className="flex-row items-center">
                                <User className="text-foreground mr-2" size={16} />
                                <Text className="text-foreground">Perfil</Text>
                            </View>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <View className="flex-row items-center">
                                <Edit className="text-foreground mr-2" size={16} />
                                <Text className="text-foreground">Editar</Text>
                            </View>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <View className="flex-row items-center">
                                <LogOutIcon className="text-destructive mr-2" size={16} />
                                <Text className="text-destructive font-medium">Sair</Text>
                            </View>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </View>
        </View>
    )
}