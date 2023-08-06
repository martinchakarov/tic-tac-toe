import Cell from "./Cell"

export default function Board(props) {
    return (
        <section className="game">
            <table className='board'>
                <tbody>
                    <tr className='bpard-row'>
                        <Cell position={1} value={props.board[1]} makeMove={props.makeMove}/>
                        <Cell position={2} value={props.board[2]} makeMove={props.makeMove}/>
                        <Cell position={3} value={props.board[3]} makeMove={props.makeMove}/>
                    </tr>
                    <tr className='bpard-row'>
                        <Cell position={4} value={props.board[4]} makeMove={props.makeMove}/>
                        <Cell position={5} value={props.board[5]} makeMove={props.makeMove}/>
                        <Cell position={6} value={props.board[6]} makeMove={props.makeMove}/>
                    </tr>
                    <tr className='bpard-row'>
                        <Cell position={7} value={props.board[7]} makeMove={props.makeMove}/>
                        <Cell position={8} value={props.board[8]} makeMove={props.makeMove}/>
                        <Cell position={9} value={props.board[9]} makeMove={props.makeMove}/>
                    </tr>
                </tbody>
            </table>
            <div className="end-game-message">
            {props.winner
            ? <h3 className="message">{props.message}</h3>
            : ""}
            </div>

            <div className="leaderboards">
                <button className="game-button leaderbords-button" onClick={props.showLeaderboards}>Leaderbords</button>
            </div>

            <div className="new-game">
            {props.gameState.gameOver
            ? <button type="button" className="game-button new-game-button" onClick={(e) => props.newGame(e)}>New Game</button> 
            : ''}
            </div>
        </section>
    )
}