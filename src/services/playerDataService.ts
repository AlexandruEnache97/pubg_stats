import { get } from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getPlayerSurvivalMastery = async (platform: string, accountId: string) => {
  const data = await get(`${NODE_SERVER}/getSurvivalMastery/${platform}/${accountId}`);
  console.log('survival called');

  return data;
};

export const getPlayerWeaponMastery = async (platform: string, accountId: string) => {
  const data = await get(`${NODE_SERVER}/getWeaponMastery/${platform}/${accountId}`);
  return data;
};

export const setLeaderboardData = async () => null;