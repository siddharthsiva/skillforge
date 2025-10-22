import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useBattleSession } from '../hooks/useBattleSession';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Battle'>;

export default function BattleScreen({ route }: Props) {
  const { sessionId, quiz } = route.params;
  const userId = 'user-id-123'; // Replace with actual user ID
  const { state, submitAnswer } = useBattleSession(sessionId, userId);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!submitted) handleSubmit(); // auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const handleSelect = (questionId: string, choice: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const handleSubmit = () => {
    submitAnswer(answers);
    setSubmitted(true);

    const calculatedScore = Object.entries(answers).reduce((acc, [qid, choice]) => {
      const correct = quiz.questions.find((q: any) => q.id === qid)?.answer;
      return acc + (choice === correct ? 1 : 0);
    }, 0);

    setScore(calculatedScore);
    set(ref(db, `battles/${sessionId}/scores/${userId}`), calculatedScore);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Battle Topic: {quiz.topic}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      {quiz.questions.map((q: any, i: number) => (
        <View key={i} style={styles.questionBlock}>
          <Text style={styles.prompt}>{q.prompt}</Text>
          {q.options.map((opt: string) => (
            <Button
              key={opt}
              title={opt}
              onPress={() => handleSelect(q.id, opt)}
              color={answers[q.id] === opt ? '#4CAF50' : '#2196F3'}
            />
          ))}
        </View>
      ))}

      {!submitted && (
        <Button title="Submit Answers" onPress={handleSubmit} color="#FF5722" />
      )}

      {score !== null && (
        <Text style={styles.score}>Your Score: {score} / {quiz.questions.length}</Text>
      )}

      {state?.answers && (
        <View style={styles.opponentBlock}>
          <Text style={styles.subtitle}>Opponent Answers:</Text>
          {Object.entries(state.answers).map(([uid, ans]) => (
            uid !== userId && (
              <Text key={uid} style={styles.opponentText}>
                {uid}: {JSON.stringify(ans)}
              </Text>
            )
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 18,
    color: '#f44336',
  },
  questionBlock: {
    marginBottom: 20,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  opponentBlock: {
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  opponentText: {
    fontSize: 14,
    color: '#555',
  },
});
