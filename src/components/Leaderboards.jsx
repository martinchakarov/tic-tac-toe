export default function Leaderboards(props) {
    return (
        <section className="leaderboards-main">
            <table className="leaderboards-table">
                <thead>
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Draws</th>
                </thead>
                <tbody>
                    <tr>
                        <td>You</td>
                        <td>{props.results.player.wins}</td>
                        <td>{props.results.player.losses}</td>
                        <td>{props.results.player.draws}</td>
                    </tr>
                    <tr>
                        <td>Opponent</td>
                        <td>{props.results.opponent.wins}</td>
                        <td>{props.results.opponent.losses}</td>
                        <td>{props.results.opponent.draws}</td>
                    </tr>
                </tbody>
            </table>
            <div className="leaderboards-actions">
                <button type="button" className="game-button" onClick={props.hideLeaderboards}>Back</button>
                <button type="button" className="game-button" onClick={props.resetLeaderboards}>Reset</button>
            </div>
        </section>
    )
}