import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { skillTree, SkillNode } from '../data/skillTree';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const categoryColors: Record<string, string> = {
  Python: '#2196F3',
  Algorithms: '#9C27B0',
  AI: '#FF5722',
  Math: '#4CAF50',
};

const categories = Object.keys(categoryColors);

export default function SkillTreeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [prevUnlocked, setPrevUnlocked] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const userId = 'user-id-123'; // Replace with actual user ID

    const completedRef = ref(db, `users/${userId}/completedSkills`);
    const xpRef = ref(db, `users/${userId}/xp`);

    const unsubCompleted = onValue(completedRef, (snapshot) => {
      const data = snapshot.val() || {};
      setCompletedSkills(data);
    });

    const unsubXp = onValue(xpRef, (snapshot) => {
      setXp(snapshot.val() || 0);
    });

    return () => {
      unsubCompleted();
      unsubXp();
    };
  }, []);

  useEffect(() => {
    const updated: Record<string, boolean> = {};
    Object.keys(skillTree).forEach((skill) => {
      updated[skill] = isUnlocked(skill);
    });
    setPrevUnlocked(updated);
  }, [completedSkills, xp]);

  const isUnlocked = (skill: string): boolean => {
    const node = skillTree[skill];
    if (node.unlocked) return true;

    const parentCompleted = Object.entries(skillTree).some(
      ([parent, parentNode]) =>
        parentNode.children.includes(skill) && completedSkills[parent]
    );

    const meetsXP = node.requiredXP ? xp >= node.requiredXP : true;

    return parentCompleted && meetsXP;
  };

  const renderNode = (skill: string, depth: number = 0) => {
    const node: SkillNode = skillTree[skill];
    const unlocked = isUnlocked(skill);
    const progress = node.requiredXP
      ? Math.min((xp / node.requiredXP) * 100, 100)
      : 100;

    if (activeCategory && node.category !== activeCategory) return null;

    const scaleAnim = useRef(new Animated.Value(prevUnlocked[skill] ? 1 : 0.8)).current;

    useEffect(() => {
      if (!prevUnlocked[skill] && unlocked) {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }
    }, [unlocked]);

    const backgroundColor = unlocked
      ? categoryColors[node.category || ''] || '#4CAF50'
      : '#BDBDBD';

    return (
      <View key={skill} style={[styles.node, { marginLeft: depth * 30 }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            disabled={!unlocked}
            onPress={() =>
              navigation.navigate('Quest', {
                quest: {
                  topic: skill,
                  challenge: `Complete a challenge on ${skill}`,
                },
              })
            }
            style={[styles.circle, { backgroundColor }]}
          >
            <Text style={styles.label}>
              {node.icon ? `${node.icon} ` : ''}{skill}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {node.requiredXP && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        )}

        {node.children.map((child) => renderNode(child, depth + 1))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Skill Tree</Text>
      <Text style={styles.xp}>Your XP: {xp}</Text>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Categories:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat === activeCategory ? null : cat)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: categoryColors[cat],
                  opacity: activeCategory && activeCategory !== cat ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.categoryLabel}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {renderNode('Python Basics')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  xp: {
    fontSize: 16,
    marginBottom: 10,
  },
  legend: {
    marginBottom: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 14,
  },
  node: {
    marginVertical: 10,
  },
  circle: {
    padding: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginTop: 6,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#FFC107',
    borderRadius: 4,
  },
});
