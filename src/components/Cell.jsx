export default function Cell(props) {
    return (
        <td className='cell text-center' onClick={(e) => {props.makeMove(e, props.position)}}><div className="cell-value">{props.value}</div></td>
    )
}