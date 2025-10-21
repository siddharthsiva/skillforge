import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Quest: { quest: any };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const handleStart = async () => {
    const quest = { topic: 'Python Loops', challenge: 'Write a for loop to sum numbers 1–10' };
    navigation.navigate('Quest', { quest });
  };

  return (
    <View>
      <Text>Welcome to SkillForge</Text>
      <Button title="Start Quest" onPress={handleStart} />
    </View>
  );
}
