import Cell from "./Cell"

export default function Board(props) {

    return (
        <section className="game">
            <table className='board'>
                <tbody>
                    <tr className='bpard-row'>
                        <Cell value={props.gameState[1]}/>
                        <Cell value={props.gameState[2]}/>
                        <Cell value={props.gameState[3]}/>
                    </tr>
                    <tr className='bpard-row'>
                        <Cell value={props.gameState[4]}/>
                        <Cell value={props.gameState[5]}/>
                        <Cell value={props.gameState[6]}/>
                    </tr>
                    <tr className='bpard-row'>
                        <Cell value={props.gameState[7]}/>
                        <Cell value={props.gameState[8]}/>
                        <Cell value={props.gameState[9]}/>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="new-game-button btn btn-outline-primary btn-lg">New Game</button>
        </section>
    )
}