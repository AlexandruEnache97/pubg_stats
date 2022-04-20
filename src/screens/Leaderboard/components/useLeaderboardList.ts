import { useEffect, useState } from 'react';

import { getLeaderboardData, getLeaderboardStats } from '../../../services/leaderboardService';
import { LeaderboardContextAPI, Player } from '../../../utils/interfaces';
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
    state?: LeaderboardContextAPI,
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
    setLeaderboard(data);
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
