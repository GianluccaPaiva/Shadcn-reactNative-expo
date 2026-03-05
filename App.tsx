import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 px-6">
      <StatusBar style="light" />

      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-white mb-2">
          NexusClass
        </Text>
        <Text className="text-slate-400 text-center text-base">
          Ambiente virtual rodando 100% nativo!
        </Text>
      </View>

      <TouchableOpacity className="w-full bg-violet-600 py-4 rounded-xl items-center active:bg-violet-700">
        <Text className="text-white font-bold text-lg">
          Entrar na Plataforma
        </Text>
      </TouchableOpacity>
    </View>
  );
}