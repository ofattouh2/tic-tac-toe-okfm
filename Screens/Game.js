import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Board from '../Components/Board/Board';
import Actions from '../Components/Actions/Actions';
import Player from '../Components/Player/Player';
import checkSlots from '../utils/checkSlots';
import { AppContext } from '../context/AppContext';
// import { ANIMATION_DURATION } from '../utils/constants';

const init = initialState => ({
  slots: Array(9)
    .fill(0)
    .map(index => ({ id: index, filled: null })),
  player1: [],
  player2: [],
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'checkSlot':
      state.slots[action.payload.index] = {
        ...state.slots[action.payload.index],
        filled: action.payload.player,
        id: action.payload.index,
      };

      state[`player${action.payload.player}`] = [
        ...state[`player${action.payload.player}`],
        action.payload.index,
      ];

      // console.log('\n\n\n======checkSlot=======\n');
      // console.log('======action=======');
      // console.log(action);
      // console.log('\n======state=======');
      // console.log(state);
      return state;
    case 'resetSlots':
      // console.log('\n======resetSlots=======\n');
      // console.log(action);
      return init(action.payload);
    default:
      return state;
  }
};

const GameWrapper = styled(View)`
  flex: 1
  align-items: stretch;
  margin: 60px 0;
`;

const Game = ({ navigation, initialState }) => {
  const { setPlayerWins } = React.useContext(AppContext);
  const [state, dispatch] = React.useReducer(reducer, initialState, init);
  const [player, setPlayer] = React.useState(1);
  const [winner, setWinner] = React.useState(null);
  const [retry, setRetry] = React.useState(null);

  const setSlot = index => {
    dispatch({ type: 'checkSlot', payload: { index, player } });
    setPlayer(player === 1 ? 2 : 1);
  };

  const resetSlots = () => {
    dispatch({ type: 'resetSlots', payload: initialState });
    winner && setPlayer(winner);
    setWinner(null);
    setRetry(null);
  };

  const checkWinner = player => {
    const slots = state[`player${player}`];
    const filledSlots = state['player1'].length + state['player2'].length;

    if (slots.length >= 3) {
      // console.log('\n========checkSlots >3====\n');
      // console.log('\n======filledSlots=======\n');
      // console.log(filledSlots);
      // console.log(slots);

      if (checkSlots(slots)) {
        // console.log('\n========winner====\n');
        // console.log(player);
        // Add delay so when the winner slot is clicked, the animation effect will be noticable
        // setTimeout(() => {
          setWinner(player);
          setPlayerWins(player);
        // }, ANIMATION_DURATION);
      }

      if (filledSlots === 9 && !checkSlots(slots)) {
        // console.log('\n======retry=======\n');
        setRetry(true);
      }
    }

    return false;
  };

  React.useEffect(() => {
    checkWinner(player === 1 ? 2 : 1);
  }, [player]);

  return (
    <GameWrapper>
      <Player player={player} winner={winner} retry = {retry} />
      <Board slots={state.slots} winner={winner} setSlot={setSlot} />
      <Actions
        winner={winner}
        player={player}
        retry = {retry}
        resetSlots={resetSlots}
        navigation={navigation}
      />
    </GameWrapper>
  );
};

export default Game;
