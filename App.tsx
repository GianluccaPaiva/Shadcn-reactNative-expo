import './global.css';
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { PortalHost } from '@rn-primitives/portal';

import { Navbar } from "@/components/Navbar";

export default function App() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-1 bg-background ${isDark ? 'dark' : ''}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Navbar />

      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-foreground text-center text-lg">
          O Portal foi aberto! Teste os botões e o tema agora.
        </Text>
      </View>

      <PortalHost />
    </View>
  )
}