import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Quest'>;

function QuestScreen({ route, navigation }: Props) {
  const { quest } = route.params;
  const userId = 'user-id-123'; // Replace with actual user ID
  const earnedXP = 50; // XP awarded per quest

  const handleComplete = async () => {
    try {
      // ✅ Mark skill as completed
      await set(ref(db, `users/${userId}/completedSkills/${quest.topic}`), true);

      // ✅ Award XP
      const xpRef = ref(db, `users/${userId}/xp`);
      const snapshot = await get(xpRef);
      const currentXP = snapshot.val() || 0;
      await set(xpRef, currentXP + earnedXP);

      Alert.alert('Quest Completed!', `You earned ${earnedXP} XP.`);
      navigation.goBack(); // or navigate to SkillTree
    } catch (error) {
      Alert.alert('Error', 'Could not complete quest.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest Topic</Text>
      <Text style={styles.topic}>{quest.topic}</Text>
      <Text style={styles.title}>Challenge</Text>
      <Text style={styles.challenge}>{quest.challenge}</Text>

      <Button title="Complete Quest" onPress={handleComplete} color="#4CAF50" />
    </View>
  );
}

export default QuestScreen;

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  topic: { fontSize: 16 },
  challenge: { fontSize: 16 },
});
