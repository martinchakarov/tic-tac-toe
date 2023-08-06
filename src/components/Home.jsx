export default function Home(props) {
    
    return (
        <section className='start-game'>
            <h2 >Select Character</h2>
            <div className="select-character">
                <label className="select-char-btn-label" style={{backgroundColor: props.chars.playerChar === 'X' ? '#1c1976' : '', color: props.chars.playerChar === 'X' ? '#ffdc9f' : ''}}>
                    <input type="radio" className="select-char-btn char-x" value="x" name="char-btn" onClick={e => {props.chooseChar(e)}}/>
                    X
                </label>
                <label className="select-char-btn-label" style={{backgroundColor: props.chars.playerChar === 'O' ? '#1c1976' : '', color: props.chars.playerChar === 'O' ? '#ffdc9f' : ''}}>
                    <input type="radio" className="select-char-btn char-o" value="o" name="char-btn" onClick={e => {props.chooseChar(e)}}/>
                    O
                </label>
            </div>
      </section>
    )
}