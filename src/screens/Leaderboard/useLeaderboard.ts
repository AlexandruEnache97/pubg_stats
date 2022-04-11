import { useEffect, useState } from 'react';

import { getLeaderboardData } from '../../services/leaderboardService';
import { Player } from '../../utils/interfaces';

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Array<Player>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [region, setRegion] = useState<string>('psn-na');
  const [gameMode, setGameMode] = useState<string>('squad');

  const getLeaderboard = async () => {
    setLoading(true);
    const { data } = await getLeaderboardData(region, gameMode);
    setLeaderboard(data);
    setLoading(false);
  };

  useEffect(() => {
    getLeaderboard();
  }, [gameMode, region]);

  return {
    leaderboard,
    loading,
    region,
    setRegion,
    gameMode,
    setGameMode,
  };
};

export default useLeaderboard;
