import { useState, forwardRef, useImperativeHandle } from 'react'

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

export default ToggleVisibility