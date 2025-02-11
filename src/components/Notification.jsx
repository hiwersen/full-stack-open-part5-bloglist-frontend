const Notification = ({ message }) => {
    if (!message) return null

    const color = message.error ? 'red': 'green'

    const style = {
        backgroundColor: 'light-gray',
        borderRadius: 2,
        border: `solid 2px ${color}`,
        padding: '1em',
        color,
    }

    return (
        <div>
            <p style={style} >{message.message}</p>
        </div>
    )
}

export default Notification