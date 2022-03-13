import React, {forwardRef} from 'react'
import {classNames} from '../../utils/classNames'
import './Input.pcss'

const Input = forwardRef((props, ref) => {
  const {
    className,
    id = String(Date.now()),
    name = id,
    type = 'text'
  } = props

  return (
    <input
      {...props}
      className={classNames('input', className)}
      id={id}
      name={name}
      type={type}
      ref={ref}
    />
  )
})

export default Input
