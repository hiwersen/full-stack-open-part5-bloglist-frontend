import { useState } from 'react'

const ToggleComponent = ({ showLabel, hideLabel, children }) => {
  const [toggle, setToggle] = useState(false)

  const divStyle = {
    // backgroundColor: 'red',
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
      { toggle ? children[1] : children[0] }
      <div style={divStyle}>
        <a style={aStyle}
          onClick={() => { setToggle(!toggle) }}>{ toggle ? hideLabel : showLabel }
        </a>
      </div>
    </div>
  )
}

export default ToggleComponent