import React, {useEffect, useRef, useState} from 'react'
import './Select.pcss'
import '../Input/Input.pcss'
import classNames from 'classnames/bind';
import {getRandomString} from '../../utils/getRandomString'
import {isMobileDevice} from '../../utils/isMobileDevice'

export const messages = {
  notSelected: 'Не выбрано',
  severalOptionsSelected: 'Выбрано несколько вариантов'
}

const Select = (props) => {
  const {
    className,
    name = 'select-1',
    id = name,
    label = 'Select variants',
    labelIsHidden,
    required,
    disabled,
    multiple,
    form,
    options: defaultOptions = [],
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const selectedOptions = options.filter((option) => option.isSelected)
  const value = selectedOptions.map((selectedOption) => selectedOption.value)
  const currentVariant = (selectedOptions.length > 1) ? messages.severalOptionsSelected :
    (selectedOptions.length === 0) ? messages.notSelected : selectedOptions[0].label
  const ariaActivedescendant = selectedOptions[0] ? selectedOptions[0].value : ''
  const selectRef = useRef()

  const toggleVisibility = () => {
    setIsOpen(!isOpen)
  }

  const selectPrevOption = () => {
    const selectedOptionIndex = options.findIndex((option, index) => option.isSelected)
    const previousOptionIndex = (selectedOptionIndex > 0) ? (selectedOptionIndex - 1) : options.length - 1
    const newOptions = options.map((option, index) => ({
      ...option,
      isSelected: index === previousOptionIndex
    }))

    setOptions(newOptions)
  }

  const selectNextOption = () => {
    const selectedOptionIndex = options.findIndex((option, index) => option.isSelected)
    const nextOptionIndex = (selectedOptionIndex < options.length) ? (selectedOptionIndex + 1) : 0
    const newOptions = options.map((option, index) => ({
      ...option,
      isSelected: index === nextOptionIndex
    }))

    setOptions(newOptions)
  }

  const handleKeyDown = (event) => {
    if (multiple) return

    switch (event.key) {
      case 'ArrowUp': {
        selectPrevOption()
        break
      }
      case 'ArrowDown': {
        selectNextOption()
        break
      }
      default: {
        break
      }
    }
  }

  const handleOpenButtonClick = () => {
    toggleVisibility()
  }

  const handleOpenButtonKeyPress = (event) => {
    if (event.key === 'Enter') {
      toggleVisibility()
    }
  }

  const handleChange = (event) => {
    const newOptions = options.map((option, index) => ({
      ...option,
      isSelected: event.target.options[index].selected
    }))

    setOptions(newOptions)
  }

  const handleOptionClick = (option) => {
    const {label, value, isSelected} = option

    const newOptions = (multiple) ?
      options.map((option) => {
        return (option.value === value) ? {
          ...option,
          isSelected: !isSelected
        } : option
      }) :
      options.map((option) => ({
        ...option,
        isSelected: option.value === value
      }))

    setOptions(newOptions)

    if (!multiple) {
      setIsOpen(false)
    }
  }

  const handleClick = (event) => {
    const isClickOutside = !event.path.includes(selectRef.current)

    if (isClickOutside) {
      setIsOpen(false)
    }
  }

  const handleLabelClick = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    document.addEventListener('click', (event) => handleClick(event))
  }, [])

  return (
    <div
      className={classNames('select', className, {
        'is-open': isOpen
      })}
      ref={selectRef}
      onKeyDown={handleKeyDown}
    >
      <select
        className="select__control"
        id={id}
        name={name}
        tabIndex={isMobileDevice() ? 0 : -1}
        required={required}
        disabled={disabled}
        multiple={multiple}
        form={form}
        value={multiple ? value : value[0]}
        onChange={handleChange}
      >
        {
          options.map(({label, value}) => {
            return (
              <option
                value={value}
                key={value}
              >
                {label}
              </option>
            )
          })
        }
      </select>
      <label
        className={classNames('select__label', {
          'visually-hidden': labelIsHidden
        })}
        id={ `select-label-${id}`}
        htmlFor={name}
        onClick={handleLabelClick}
      >
        <span>{label}</span>
        {
          required &&
          <span className="form-star-required">*</span>
        }
      </label>
      <div className="select__body">
        <div
          className="select__input form-input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-labelledby={`select-label-${id}`}
          aria-owns={`select-dropdown-${id}`}
          aria-activedescendant={ariaActivedescendant}
          tabIndex={isMobileDevice() ? -1 : 0}
          onClick={handleOpenButtonClick}
          onKeyPress={handleOpenButtonKeyPress}
        >
          <span
            className="select__current-variant"
          >
            {currentVariant}
          </span>
          {/*<svg className="select__arrow-icon i-icon">*/}
          {/*  <use href="#icon-arrow-down"></use>*/}
          {/*</svg>*/}
          <span className="select__arrow-icon">
            ▽
          </span>
        </div>
        <div
          className="select__dropdown"
          id={`select-dropdown-${id}`}
        >
          <ul
            className="select__dropdown-list"
            role="listbox"
          >
            {
              options.map((option) => {
                const {
                  label,
                  value,
                  isSelected
                } = option

                return (
                  <li
                    className="select__dropdown-item"
                    role="presentation"
                    key={value}
                  >
                    <button
                      className={classNames('select__option', {
                        'is-selected': isSelected
                      })}
                      id={value}
                      type="button"
                      role="option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {label}
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Select
