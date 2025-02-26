import { useState, forwardRef, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'

const ToggleVisibility = forwardRef(({ showLabel, hideLabel, children }, refs) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={{ display: visibility ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
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