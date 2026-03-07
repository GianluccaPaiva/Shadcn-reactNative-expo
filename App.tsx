import './global.css';
import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { PortalHost } from '@rn-primitives/portal';
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { useGerenciador } from "@/hooks/useGerenciador";

export default function App() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { usuario, mudarInscricao, estaInscrito, marcarMural, navegarPara } = useGerenciador();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <View className={`flex-1 bg-background ${isDark ? 'dark' : ''}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Navbar onAbrirMenu={() => setSidebarAberta(true)} />

      {/*GerenciadorTelas entrará aqui depois */}
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-foreground text-center text-lg">
          O Portal foi aberto! Teste os botões e o tema agora.
        </Text>
      </View>

      {/* Modal que cria o efeito de Drawer (Menu Lateral) para o mobile */}
      <Modal
        visible={sidebarAberta}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSidebarAberta(false)}
      >
        <View className="flex-1 flex-row">
          <View className="w-64 h-full bg-background shadow-2xl">
            <AppSidebar
              navegarPara={(tela) => {
                navegarPara(tela);
                setSidebarAberta(false);
              }}
              inscricoes={usuario?.inscricoes || {}}
              marcarMural={marcarMural}
            />
          </View>
          <TouchableOpacity
            className="flex-1 bg-black/50"
            activeOpacity={1}
            onPress={() => setSidebarAberta(false)}
          />
        </View>
      </Modal>

      <PortalHost />
    </View>
  )
}