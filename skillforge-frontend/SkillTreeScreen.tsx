import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { skillTree } from './data/skillTree';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SkillTreeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const renderNode = (skill: string, depth: number = 0) => {
    const node = skillTree[skill];
    return (
      <View key={skill} style={[styles.node, { marginLeft: depth * 30 }]}>
        <TouchableOpacity
          disabled={!node.unlocked}
          onPress={() =>
            navigation.navigate('Quest', {
              quest: {
                topic: skill,
                challenge: `Complete a challenge on ${skill}`,
              },
            })
          }
          style={[
            styles.circle,
            { backgroundColor: node.unlocked ? '#4CAF50' : '#BDBDBD' },
          ]}
        >
          <Text style={styles.label}>{skill}</Text>
        </TouchableOpacity>
        {node.children.map((child) => renderNode(child, depth + 1))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Skill Tree</Text>
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
});
