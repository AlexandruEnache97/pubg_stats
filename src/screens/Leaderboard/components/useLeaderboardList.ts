import { useEffect, useState } from 'react';

import { getLeaderboardData, getLeaderboardStats } from '../../../services/leaderboardService';
import { Player } from '../../../utils/interfaces';
import { SET_LEADERBOARD_DATA_COLLECTED } from '../contexts/constants';
import { useLeaderboardGlobalContext } from '../contexts/LeaderboardContext';

const useLeaderboardList = () => {
  const [leaderboard, setLeaderboard] = useState<Array<Player>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [gameMode, setGameMode] = useState<string>('squad');

  const {
    state: { platform, regionPlatform, leaderboardDataCollected },
    dispatch: leaderboardDispatch,
  }: {
    state?: any,
    dispatch?: any
  } = useLeaderboardGlobalContext();

  const getLeaderboard = async () => {
    setLoading(true);

    const { data } = await getLeaderboardData(regionPlatform, gameMode);
    if (!leaderboardDataCollected) {
      const leaderboardStats = await getLeaderboardStats();
      leaderboardDispatch({
        type: SET_LEADERBOARD_DATA_COLLECTED,
        data: { leaderboardDataCollected: leaderboardStats.data },
      });
    }

    const myProfile = {
      id: 'account.fc0d2522f004475093b3740538845f14',
      type: 'player',
      attributes: {
        name: 'Raikam23',
        rank: 0,
        stats: {
          averageDamage: 0,
          averageRank: 0,
          games: 1,
          kda: 5,
          killDeathRatio: 0,
          kills: 5,
          rankPoints: 0,
          subTier: 1,
          tier: 'Iron',
          winRatio: 0,
          wins: 0,
        },
      },
    };

    setLeaderboard([...data, myProfile]);
    setLoading(false);
  };
  useEffect(() => {
    getLeaderboard();
  }, [gameMode, regionPlatform]);

  return {
    leaderboard,
    loading,
    regionPlatform,
    platform,
    gameMode,
    setGameMode,
  };
};

export default useLeaderboardList;
