const Notification = ({ message }) => {
    if (!message) return null

    const color = message.error ? 'red': 'green'

    const style = {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -0%)',
        minWidth: 360,
        maxWidth: 720,
        width: '100%',
        backgroundColor: 'lightGray',
        opacity: 0.9,
        borderRadius: 2,
        border: `solid 2px ${color}`,
        padding: '1em',
        color,
        textAlign: 'center',
        zIndex: 99
    }

    return (
        <div style={style}>
            <p>{message.message}</p>
        </div>
    )
}

export default Notification