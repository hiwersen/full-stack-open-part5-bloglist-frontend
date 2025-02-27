import { useState } from 'react'
import PropTypes from 'prop-types'

const ToggleComponents = ({ showByDefault, hideByDefault, children }) => {
    const [toggle, setToggle] = useState(false)

    const divStyle = {
        textAlign: 'center',
        marginTop: 36
    }

    const aStyle = {
        cursor: 'pointer',
        fontSize: 14,
        borderBottom: '0.5px solid #aaa'
    }

    return (
        <div>
            { children[toggle & 1] }
            <div style={divStyle}>
                <a style={aStyle}
                    onClick={() => { setToggle(!toggle) }}>{ toggle ? hideByDefault : showByDefault }
                </a>
            </div>
        </div>
    )
}

ToggleComponents.propTypes = {
    showByDefault: PropTypes.string.isRequired,
    hideByDefault: PropTypes.string.isRequired
}

export default ToggleComponents