import React, { useState } from "react"
import { View, Text, TouchableOpacity, Switch, Modal, Pressable } from "react-native"
import { Settings, X } from "lucide-react-native"
import { iconListWithClassName } from "@/lib/iconWithClassName"
import { useConfiguracoes } from "@/hooks/useConfiguracoes"
import type { OpcoesTela } from "@/hooks/useGerenciador"

type ConfiguracoesProps = {
  navegarPara?: (tela: OpcoesTela) => void
}

const icons = [Settings, X];
iconListWithClassName(icons);

export function Configuracoes({ navegarPara }: ConfiguracoesProps) {
  const { notificacoes, clickarNotificacoes } = useConfiguracoes();
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center py-2 px-3 rounded-md active:bg-secondary/50"
        onPress={() => setMenuAberto(true)}
      >
        <Settings size={20} className="text-foreground" />
        <Text className="ml-3 text-base font-medium text-foreground">
          Configurações
        </Text>
      </TouchableOpacity>

      <Modal
        visible={menuAberto}
        transparent={true}
        animationType="fade"
        onRequestClose={fecharMenu}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={fecharMenu}
        >
          {/* Conteúdo do Menu */}
          <Pressable className="bg-background m-4 p-4 rounded-xl shadow-lg border border-border">
            <View className="flex-row justify-between items-center mb-4 border-b border-border pb-2">
              <Text className="text-lg font-bold text-foreground">Configurações</Text>
              <TouchableOpacity onPress={fecharMenu}>
                <X size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>

            {/* Switch de Notificações */}
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-base text-foreground">Notificações</Text>
              <Switch
                value={notificacoes}
                onValueChange={clickarNotificacoes}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={notificacoes ? "#ffffff" : "#f4f3f4"}
              />
            </View>

            <View className="h-[1px] w-full bg-border my-1" />

            <TouchableOpacity className="py-3">
              <Text className="text-base text-foreground">Configurações avançadas</Text>
            </TouchableOpacity>

            <View className="h-[1px] w-full bg-border my-1" />

            <TouchableOpacity
              className="py-3"
              onPress={() => {
                fecharMenu();
                if (navegarPara) navegarPara("suporte");
              }}
            >
              <Text className="text-base text-foreground">Suporte</Text>
            </TouchableOpacity>

            <View className="h-[1px] w-full bg-border my-1" />

            <TouchableOpacity className="py-3 mb-2">
              <Text className="text-base text-foreground">Sobre acordo de privacidade</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}