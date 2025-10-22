import axios from 'axios';
import { API_URL } from '@env';

export const api = axios.create({
  baseURL: API_URL,
});

export const generateQuest = async (userId: string, topic: string) => {
  const res = await api.post('/quests', { user_id: userId, topic });
  return res.data;
};

export const startBattle = async (userId: string, topic: string) => {
  const res = await api.post('/battle/start', { user_id: userId, topic });
  return res.data;
};
