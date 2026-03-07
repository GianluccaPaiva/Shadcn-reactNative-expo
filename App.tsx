import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
export default function App() {
  return (
    <LinearGradient
      colors={['#8B5CF6', '#EC4899']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-4 rounded-xl"
    >
      <Text className="text-white font-bold">Botão com Gradiente Nativo!</Text>
    </LinearGradient>
  );
}