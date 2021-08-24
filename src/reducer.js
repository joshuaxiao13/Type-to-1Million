export const reducer = (state, action) => {
  if (action.type === 'UPDATE_CHARACTER_COUNT') {
    return { ...state, charCount: action.payload.newCharCount };
  } else if (action.type === 'START_TIMER') {
    return { ...state, start_time: Date.now() };
  } else if (action.type === 'UPDATE_WPM') {
    const newWpm = Math.ceil(
      (12.0 * state.charCount) / ((Date.now() - state.start_time) / 1000)
    );
    return { ...state, wpm: newWpm };
  } else if (action.type === 'UPDATE_HISTORY') {
    let gemsGained =
      state.wpm >= state.goal_wpm
        ? state.goal_wpm
        : Math.round((state.goal_wpm / 45) * (state.wpm - state.goal_wpm));
    gemsGained *= state.multiplier;
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    if (state.purchased.gemRush) {
      if (state.wpm >= state.goal_wpm) gemsGained *= 100;
      else gemsGained = -state.gems_balance;
    }

    gemsGained = Math.max(-state.gems_balance, gemsGained);
    const newGemsBalance = state.gems_balance + gemsGained;

    return {
      ...state,
      gems_balance: newGemsBalance,
      history: [
        ...state.history,
        {
          wpm: state.wpm,
          gemsGained,
          time,
        },
      ],
      purchased: { ...state.purchased, gemRush: false },
    };
  } else if (action.type === 'UPDATE_NUMBER_OF_WORDS') {
    return { ...state, numberOfWords: action.payload.newNumberOfWords };
  } else if (action.type === 'UPDATE_GOAL_WPM') {
    return { ...state, goal_wpm: action.payload.newGoalWpm };
  } else if (action.type === 'PURPLE_DRIP') {
    const newBalance =
      state.gems_balance - (!state.purchased.purpleDrip && 200);
    return {
      ...state,
      gems_balance: newBalance,
      purple: !state.purple,
      purchased: { ...state.purchased, purpleDrip: true },
    };
  } else if (action.type === 'TEN_FOLD') {
    return {
      ...state,
      gems_balance: state.gems_balance - 1000,
      purchased: { ...state.purchased, tenFold: true },
      multiplier: state.multiplier * 10,
    };
  } else if (action.type === 'GEM_RUSH') {
    return {
      ...state,
      gems_balance: state.gems_balance - 7500,
      purchased: { ...state.purchased, gemRush: true },
    };
  } else if (action.type === 'THE_FLASH') {
    return {
      ...state,
      numberOfWords: 1,
      gems_balance: state.gems_balance - 150000,
      purchased: { ...state.purchased, theFlash: true },
    };
  } else if (action.type === 'MYSTERY_BOX') {
    setTimeout(() => window.open('https://youtu.be/QtBDL8EiNZo'), 2000);
    return {
      ...state,
      gems_balance: state.gems_balance - 1000000,
      purchased: { ...state.purchased, mysteryBox: true },
    };
  } else if (action.type === 'HANDLE_PURCHASE') {
    return {
      ...state,
      numberOfWords: 30,
      purchased: { ...state.purchased, start_time: null, theFlash: false },
    };
  }
  throw new Error('action type not found');
};
