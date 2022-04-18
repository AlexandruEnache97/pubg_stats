import { useState } from 'react';
import { Player } from '../../utils/interfaces';

const useLeaderboard = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return {
    selectedPlayer,
    setSelectedPlayer,
  };
};

export default useLeaderboard;
