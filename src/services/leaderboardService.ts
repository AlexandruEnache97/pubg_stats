import { get } from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getLeaderboardData = async (region: string, gameMode: string) => {
  const data = await get(`${NODE_SERVER}/getLeaderboard/${region}/${gameMode}`);
  return data;
};

export const setLeaderboardData = async () => null;
