import { useState, forwardRef, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'

const ToggleVisibility = forwardRef(({ showLabel, hideLabel, style, children }, refs) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  style = {
    ...style,
    width: 344,
    paddingRight: 8,
    paddingLeft: 8,
    margin: '36px 0'
  }

  return (
    <div style={style}>
      <div style={{ display: visibility ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility} style={{ marginTop: 25 }}>{hideLabel}</button>
      </div>
      <div style={{ display: visibility ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{showLabel}</button>
      </div>
    </div>
  )
})

ToggleVisibility.displayName = 'ToggleVisibility'

ToggleVisibility.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
}

export default ToggleVisibility