import { get } from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getLeaderboardData = async (region: string, gameMode: string) => {
  console.log('leaderboard called');

  const data = await get(`${NODE_SERVER}/getLeaderboard/${region}/${gameMode}`);
  return data;
};

export const getLeaderboardStats = async () => {
  const data = await get(`${NODE_SERVER}/getLeaderboardData`);
  console.log('leaderboard data called');

  return data;
};

export const setLeaderboardData = async () => null;
