export default function Cell(props) {
    return (
        <td className='cell text-center'><div className="cell-value">{props.value}</div></td>
    )
}