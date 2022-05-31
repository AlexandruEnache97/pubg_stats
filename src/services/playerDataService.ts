import { get } from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getPlayerSurvivalMastery = async (platform: string, accountId: string) => {
  const data = await get(`${NODE_SERVER}/getSurvivalMastery/${platform}/${accountId}`);
  console.log('survival called');

  return data;
};

export const getMaxPlayerSurvivalMastery = async (platform: string) => {
  const data = await get(`${NODE_SERVER}/maxSurvivalMastery/${platform}`);

  return data;
};

export const getPlayerWeaponMastery = async (platform: string, accountId: string) => {
  const data = await get(`${NODE_SERVER}/getWeaponMastery/${platform}/${accountId}`);
  console.log('weapon called');

  return data;
};

export const getTestedWeapons = async () => {
  const data = await get(`${NODE_SERVER}/getWeaponsTested`);
  return data;
};

export const setLeaderboardData = async () => null;
