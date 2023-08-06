import './App.css';
import Board from './components/Board';
import Home from './components/Home';
import Leaderboards from './components/Leaderboards';
import { useState, useEffect } from 'react';

function App() {

  const [results, setResults] = useState({
    player: {
      wins: 0,
      losses: 0,
      draws: 0
    },
    opponent: {
      wins: 0,
      losses: 0,
      draws: 0
    }
  });

  const [viewLeaderboards, setViewLeaderboards] = useState(false);

  const [board, setBoard] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null
  });

  const winningCombos = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9], 
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9], 
    [3, 5, 7]];

  const [isPlayersTurn, setIsPlayersTurn] = useState(true);

  const [gameState, setGameState] = useState({
    newGame: true,
    activeGame: false,
    gameOver: false
  })

  const [chars, setChars] = useState({
    playerChar: null,
    opponentChar: null
  });

  const [message, setMessage] = useState();
  const [winner, setWinner] = useState();

  // useEffect( () => console.log(chars), [chars])

  function chooseChar(e) {
    const playerChar = e.target.value.toUpperCase();
    const opponentChar = playerChar === 'X' ? 'O' : 'X';

    setChars({playerChar, opponentChar});
    setGameState({newGame: false, activeGame: true, gameover: false})
  }

  function makeMove(e, position) {
    if (board[position] === null && gameState.activeGame) {
      setBoard(prevState => {
        return {...prevState, [position]: chars.playerChar}
      });
  
      setIsPlayersTurn(false);
    }
  }

function makeOpponentMove(currentBoardState) {
    if (!isPlayersTurn && !gameState.gameOver && gameState.activeGame) {
      // analyze current board
      const availablePositions = Object.entries(board).filter(x => x[1] == null).map(x => x = x[0]);


      // check if you can win

      let positionToChoose;

      for (const combo of winningCombos) {
        const currentPositions = {}
        for (let position of combo) {
          if (board[position] === chars.opponentChar) {
            currentPositions[position] = chars.opponentChar;
          } else if (board[position] === chars.playerChar) {
            currentPositions[position] = chars.playerChar;
          } else {
            currentPositions[position] = null;
          }
        }

        const oppPositions = Object.entries(currentPositions).filter(x => x[1] === chars.opponentChar).length;
        const playerPositions = Object.entries(currentPositions).filter(x => x[1] === chars.playerChar).length;

        if (oppPositions === 2) {
          const positionToPlay = Object.entries(currentPositions).filter(x => x[1] !== chars.opponentChar)[0][0];
          if (board[positionToPlay] === null) {
            positionToChoose = positionToPlay;
          break;  
          } 
        } else if (playerPositions === 2) {
          const positionToPlay = Object.entries(currentPositions).filter(x => x[1] !== chars.playerChar)[0][0];
          if (board[positionToPlay] === null) {
            positionToChoose = positionToPlay;
          break;    
        } 
        } else {
          positionToChoose = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        }
      }

      setBoard(prevState => {
        return {...prevState, [positionToChoose]: chars.opponentChar}
      });   

      }

      setIsPlayersTurn(true);
    };

  useEffect(() => {
    setMessage(prevState => {
      if (winner === chars.playerChar) {
        return 'You win!';
      } else if (winner === chars.opponentChar) {
        return 'You lose.';
      } else {
        return 'Draw.'
      }
    })
  }, [winner]);

  useEffect(() => {

    if (gameState.activeGame && !gameState.gameOver)  {

    const winningCombo = winningCombos.filter(combo => board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[0]] !== null);
    const boardIsFull = Object.values(board).filter(x => x === null).length === 0;

    if (winningCombo.length > 0 || boardIsFull) {

      setGameState(prevState => {
        return {...prevState,
                gameOver: true,
                activeGame: false}
      });

      if (winningCombo.length > 0) {

        let winner;

        for (const cell of winningCombo[0]) {
          winner = board[cell];
          const element = document.getElementsByClassName('cell')[cell-1]
          element.setAttribute('style', 'background-color: #1c1976; color: #ffdc9f; transition: color 0.2s, background-color 0.2s;')
        }

        if (winner === chars.playerChar) {
          setResults(prevState => {
            let results = prevState;

            results.player.wins = results.player.wins + 1;
            results.opponent.losses = results.opponent.losses + 1;

            setWinner(winner)
            return results;
          });
        } else if (winner === chars.opponentChar)  {
          setResults(prevState => {
          let results = prevState;

          results.opponent.wins = results.opponent.wins + 1;
          results.player.losses = results.player.losses + 1;

          setWinner(winner)
          return results;
        });
        }
      } else {
        setWinner('None');
        setResults(prevState => {
          let results = prevState;

          results.player.draws = results.player.draws + 1;
          results.opponent.draws = results.opponent.draws + 1;

          return results;
        });
        }
      } else {
        if (!isPlayersTurn) {
          makeOpponentMove(board);
      }
    }
  }

  }, [board, chars.opponentChar, chars.playerChar, gameState.activeGame, gameState.gameOver, isPlayersTurn, makeOpponentMove, winningCombos]);

  function newGame(e) {
    e.preventDefault();

    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(x => x.removeAttribute('style'));

    setBoard({
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null
    });

    setGameState({
      newGame: false,
      activeGame: true,
      gameOver: false
    });

    setWinner(null);
    setIsPlayersTurn(true);
  }

  function showLeaderboards(e) {
    setViewLeaderboards(true);
  }

  function hideLeaderboards(e) {
    setViewLeaderboards(false);
  }

  function resetLeaderboards(e) {
    setResults({
      player: {
        wins: 0,
        losses: 0,
        draws: 0
      },
      opponent: {
        wins: 0,
        losses: 0,
        draws: 0
      }
    })
  }


  return (
    <div className="App">
      <header>
        <h1 className='title'>Tic-Tac-Toe</h1>
      </header>
      <main className='main'>
      { gameState.newGame 
        ? <Home chooseChar={chooseChar} chars={chars}/>
        : viewLeaderboards 
        ? <Leaderboards 
                  results={results}
                  hideLeaderboards={hideLeaderboards}
                  resetLeaderboards={resetLeaderboards}
                  />
        : <Board  board={board} 
                  chars={chars} 
                  makeMove={makeMove} 
                  gameState={gameState} 
                  newGame={newGame} 
                  winner={winner} 
                  message={message}
                  showLeaderboards={showLeaderboards}
                  />
      }
      </main>
    </div>
  );
}

export default App;
