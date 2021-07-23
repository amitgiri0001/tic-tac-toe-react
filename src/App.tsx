import React from 'react';
import { ElementRef, useEffect } from 'react';
import './App.css';
import './Core.css'

function App() {
  const initialArray = Array<string>(9).fill('');
  const [gameState, setGameState] = React.useState<string[]>([]);
  const [xPositons, setXPositons] = React.useState<string>('');
  const [oPositons, setOPositons] = React.useState<string>('');
  const [winningState, setWinningState] = React.useState<string>('');
  const [xPlaying, setXPlaying] = React.useState<boolean>(true);
  const [WINNING_PATTERNS] = React.useState<string[]>(['012', '345', '678', '048', '246', '147', '036', '258']);

  useEffect(() => {
    init(initialArray);
  }, [])

  const init = (initialArray:  string[]) => {
    setGameState(initialArray);
    setXPositons('');
    setOPositons('');
    setWinningState('');
    setXPlaying(true);
  }

  const resetGame = () => {
    init(initialArray);
  }


  const handlePlay = (index: number, e: React.SyntheticEvent<EventTarget>) => {
    let currentPositions = ''
    if(gameState[index] || winningState) return;

    if (gameState[index] === '') {
      if(xPlaying) {
        gameState[index] = 'x';
        currentPositions = xPositons + String(index);
        setXPositons(currentPositions);
      }
      else {
        gameState[index] = 'o';
        currentPositions  = oPositons + String(index)
        setOPositons(currentPositions);
      }
    }

    if (!findWinner(currentPositions)) {
      setXPlaying(!xPlaying);
    }
  }

  const findWinner = (currentPositions: string) => {
    let playerPattern = '';
    let theWinningPattern = '';
    
    playerPattern = currentPositions;

    if(playerPattern.length < 3) return false;

    for (var i = 0; i < WINNING_PATTERNS.length; i++) {
      const hasWon = playerPattern.split('').filter((c) => WINNING_PATTERNS[i].includes(c));
      if (hasWon.length === 3) {
        theWinningPattern = WINNING_PATTERNS[i];
        break;
      }
    }

    if (theWinningPattern) {
      for (var cellNum = 0; cellNum < 9; cellNum++) {
        if (theWinningPattern.includes(String(cellNum))) {
          setWinningState(theWinningPattern);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">
      <header className="App-header"> 
        <table>
          <tr>
            <td id="cell0" onClick={(e) => handlePlay(0, e)} className={winningState.includes('0') ? 'winningCell' : ''}>{gameState[0]}</td>
            <td id="cell1" onClick={(e) => handlePlay(1, e)} className={winningState.includes('1') ? 'winningCell' : ''}>{gameState[1]}</td>
            <td id="cell2" onClick={(e) => handlePlay(2, e)} className={winningState.includes('2') ? 'winningCell' : ''}>{gameState[2]}</td>
          </tr>
          <tr>
            <td id="cell3" onClick={(e) => handlePlay(3, e)} className={winningState.includes('3') ? 'winningCell' : ''}>{gameState[3]}</td>
            <td id="cell4" onClick={(e) => handlePlay(4, e)} className={winningState.includes('4') ? 'winningCell' : ''}>{gameState[4]}</td>
            <td id="cell5" onClick={(e) => handlePlay(5, e)} className={winningState.includes('5') ? 'winningCell' : ''}>{gameState[5]}</td>
          </tr>
          <tr>
            <td id="cell6" onClick={(e) => handlePlay(6, e)} className={winningState.includes('6') ? 'winningCell' : ''}>{gameState[6]}</td>
            <td id="cell7" onClick={(e) => handlePlay(7, e)} className={winningState.includes('7') ? 'winningCell' : ''}>{gameState[7]}</td>
            <td id="cell8" onClick={(e) => handlePlay(8, e)} className={winningState.includes('8') ? 'winningCell' : ''}>{gameState[8]}</td>
          </tr>
        </table>
        <input type="button" value="Reset" className={`reset_button`} onClick={resetGame}></input>
      </header>
    </div>
  );
}

export default App;
