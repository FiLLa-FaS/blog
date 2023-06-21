import React from 'react'
import PropTypes from 'prop-types'

import classes from './UiButton.module.scss'

function UiButton({
  classElement,
  disabled,
  small,
  large,
  borderless,
  accent,
  submit,
  prime,
  alert,
  onClickFunction,
  children,
}) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className={`
      ${classElement}
      ${classes.button} 
      ${borderless && classes['button--type--borderless']} 
      ${large && classes['button--size--large']}
      ${small && classes['button--size--small']}
      ${submit && classes['button--type--submit']}
      ${prime && classes['button--type--prime']}
      ${alert && classes['button--type--alert']}
      ${accent && classes['button--type--accent']}`}
      onClick={() => onClickFunction()}
    >
      {children}
    </button>
  )
}

UiButton.defaultProps = {
  small: false,
  large: false,
  borderless: false,
  accent: false,
  onClickFunction() {},
}

UiButton.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  borderless: PropTypes.bool,
  accent: PropTypes.bool,
  onClickFunction: PropTypes.func,
}

export default UiButton
