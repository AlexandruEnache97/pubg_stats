import React, { useContext, useReducer } from 'react';
import { LeaderboardContextAPI } from '../../../utils/interfaces';
import { SET_LEADERBOARD_DATA_COLLECTED, SET_MAX_SURVIVAL_MASTERIES, SET_REGION_PLATFORM } from './constants';

const LeaderboardGlobalContext = React.createContext<{
  state?: LeaderboardContextAPI,
  dispatch?: any
}>({});

const leaderboardGlobalState: LeaderboardContextAPI = {
  platform: 'psn',
  regionPlatform: 'psn-na',
  leaderboardDataCollected: null,
  maxSurvivalMasteries: null,
};

const leaderboardGlobalReducer = (
  state: LeaderboardContextAPI,
  { type, data }: { type: string, data: any },
) => {
  switch (type) {
    case SET_REGION_PLATFORM: {
      return {
        ...state,
        regionPlatform: data.regionPlatform,
        platform: data.regionPlatform.split('-')[0],
      };
    }
    case SET_LEADERBOARD_DATA_COLLECTED: {
      return {
        ...state,
        leaderboardDataCollected: data.leaderboardDataCollected,
      };
    }
    case SET_MAX_SURVIVAL_MASTERIES: {
      return {
        ...state,
        maxSurvivalMasteries: data.maxSurvivalMasteries,
      };
    }
    default: {
      throw new Error(`Unhandle action: ${type}`);
    }
  }
};

function LeaderboardContextProvider({ children }: { children: any }) {
  return (
    <LeaderboardGlobalContext.Provider value={(() => {
      const [state, dispatch] = useReducer(leaderboardGlobalReducer, leaderboardGlobalState);
      return { state, dispatch };
    })()}
    >
      {children}
    </LeaderboardGlobalContext.Provider>
  );
}

const useLeaderboardGlobalContext = () => {
  const leaderboardGlobalContextState = useContext<{
    state?: LeaderboardContextAPI,
    dispatch?: any
  }>(LeaderboardGlobalContext);
  if (typeof leaderboardGlobalContextState === 'undefined') {
    throw new Error('use state inside a context');
  }
  return leaderboardGlobalContextState;
};

export { LeaderboardContextProvider, useLeaderboardGlobalContext };
