import { useEffect, useState } from 'react';

import { getLeaderboardData, getLeaderboardStats } from '../../../services/leaderboardService';
import { LeaderboardCollectedData, Player } from '../../../utils/interfaces';

const useLeaderboardList = () => {
  const [leaderboard, setLeaderboard] = useState<Array<Player>>([]);
  // eslint-disable-next-line max-len
  const [leaderboardCollected, setLeaderboardCollected] = useState<Array<LeaderboardCollectedData>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [region, setRegion] = useState<string>('psn-na');
  const [gameMode, setGameMode] = useState<string>('squad');

  const getLeaderboard = async () => {
    setLoading(true);
    const { data } = await getLeaderboardData(region, gameMode);
    const leaderboardStats = await getLeaderboardStats();
    setLeaderboardCollected(leaderboardStats.data);
    setLeaderboard(data);
    setLoading(false);
  };
  useEffect(() => {
    getLeaderboard();
  }, [gameMode, region]);

  return {
    leaderboard,
    leaderboardCollected,
    loading,
    region,
    setRegion,
    gameMode,
    setGameMode,
  };
};

export default useLeaderboardList;
