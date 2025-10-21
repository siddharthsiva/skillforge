import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Quest'>;

function QuestScreen({ route }: Props) {
  const { quest } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest Topic</Text>
      <Text style={styles.topic}>{quest.topic}</Text>
      <Text style={styles.title}>Challenge</Text>
      <Text style={styles.challenge}>{quest.challenge}</Text>
    </View>
  );
}

export default QuestScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  topic: { fontSize: 16, marginBottom: 16 },
  challenge: { fontSize: 16 },
});
