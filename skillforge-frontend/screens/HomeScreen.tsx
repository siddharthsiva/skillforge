import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import { startBattle } from '../services/api';

type RootStackParamList = {
  Home: undefined;
  Quest: { quest: any };
  Battle: { sessionId: string; quiz: any };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const handleStart = async () => {
    const quest = { topic: 'Python Loops', challenge: 'Write a for loop to sum numbers 1–10' };
    navigation.navigate('Quest', { quest });
  };

  const handleBattleStart = async () => {
  const { session_id, quiz } = await startBattle('user-id-123', 'Python Loops');
  navigation.navigate('Battle', { sessionId: session_id, quiz });

  };

  return (
    <View>
      <Text>Welcome to SkillForge</Text>
      <Button title="Start Quest" onPress={handleStart} />
    </View>
  );
}
