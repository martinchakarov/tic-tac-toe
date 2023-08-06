import './App.css';
import Board from './components/Board';
import Home from './components/Home';
import { useState, useEffect } from 'react';

function App() {

  const [chars, setChars] = useState({
    playerChar: null,
    opponentChar: null
  });

  // useEffect( () => console.log(chars), [chars])

  function chooseChar(e) {
    const playerChar = e.target.value.toUpperCase();
    const opponentChar = playerChar == 'X' ? 'O' : 'X';

    return setChars({playerChar, opponentChar})
  }

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
  })

  return (
    <div className="App">
      <header className='title'>
        <h1 className='text-center'>Tic-Tac-Toe</h1>
      </header>
      <main className='main'>
          <Home chooseChar={chooseChar} chars={chars}/>
          <Board gameState={board}/>
      </main>
    </div>
  );
}

export default App;
