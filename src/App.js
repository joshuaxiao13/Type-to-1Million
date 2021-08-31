import { useState, useEffect, useReducer } from 'react';
import TypingArea from './TypingArea';
import HistoryModal from './HistoryModal';
import ShopModal from './ShopModal';
import SettingsModal from './SettingsModal';
import InfoModal from './InfoModal';
import GemsButton from './GemsButton';
import TimeNotification from './TimeNotification';
import { reducer } from './reducer';
import { items } from './items';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const defaultState = {
  wpm: 0,
  charCount: 0,
  goal_wpm: 50,
  gems_balance: 250,
  start_time: null,
  history: [],
  numberOfWords: 30,
  purple: false,
  purchased: {
    purpleDrip: false,
    tenFold: false,
    theFlash: false,
    gemRush: false,
    mysteryBox: false,
  },
  multiplier: 1,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isFlashing, setIsFlashing] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: null,
  });

  const actions = [
    () => dispatch({ type: 'PURPLE_DRIP' }),
    () => dispatch({ type: 'TEN_FOLD' }),
    () => dispatch({ type: 'THE_FLASH' }),
    () => dispatch({ type: 'GEM_RUSH' }),
    () => dispatch({ type: 'MYSTERY_BOX' }),
  ];

  for (let i = 0; i < items.length; ++i) {
    items[i].action = actions[i];
  }

  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing((prevIsFlashing) => {
        return !prevIsFlashing;
      });
    }, 1000);
    return () => clearInterval(flashInterval);
  }, []);

  useEffect(() => {
    if (state.purchased.theFlash) {
      setTimeout(() => {
        setNotification({ show: true, message: '20 seconds left' });
      }, 40000);
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 43000);
      setTimeout(() => {
        setNotification({ show: true, message: 'Time Is Up' });
        dispatch({ type: 'HANDLE_PURCHASE' });
      }, 60000);
      setTimeout(
        () => setNotification({ ...notification, show: false }),
        63000
      );
    }
  }, [state.purchased.theFlash]);

  return (
    <div className='App'>
      <TimeNotification
        show={notification.show}
        message={notification.message}
      />
      <div
        id='app-header'
        style={{ color: state.purple ? '#4C0099' : '#4169E1' }}
      >
        <span id='title'>Type to 1Million</span>
        <span id='flash'>
          <pre>{isFlashing ? '|' : ' '}</pre>
        </span>
      </div>
      <div id='typing-area'>
        <TypingArea
          numberOfWords={state.numberOfWords}
          updateHistory={() => dispatch({ type: 'UPDATE_HISTORY' })}
          updateWpm={() => dispatch({ type: 'UPDATE_WPM' })}
          updateCharCount={(newCharCount) =>
            dispatch({
              type: 'UPDATE_CHARACTER_COUNT',
              payload: { newCharCount },
            })
          }
          startTimer={() => dispatch({ type: 'START_TIMER' })}
          purple={state.purple}
          toggleTextColor={() => dispatch({ type: 'UPDATE_TEXT_COLOR' })}
          gameWon={state.purchased.mysteryBox}
        />
      </div>
      <div id='wpm-indicator'>
        <h3>{state.wpm} wpm</h3>
      </div>
      <div id='lower-bar'>
        <div>
          <div id='gem-balance-button'>
            <GemsButton gems_balance={state.gems_balance} />
          </div>
        </div>
        <div>
          <HistoryModal history={state.history} />
          <ShopModal
            gems_balance={state.gems_balance}
            items={items}
            purchased={state.purchased}
          />
          <SettingsModal
            updateNumberOfWords={(newNumberOfWords) => {
              dispatch({
                type: 'UPDATE_NUMBER_OF_WORDS',
                payload: { newNumberOfWords },
              });
            }}
            updateGoalWpm={(newGoalWpm) =>
              dispatch({ type: 'UPDATE_GOAL_WPM', payload: { newGoalWpm } })
            }
          />
        </div>
        <div>
          <InfoModal />
        </div>
      </div>
    </div>
  );
};

export default App;
