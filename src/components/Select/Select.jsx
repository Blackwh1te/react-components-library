import React, {useEffect, useRef, useState} from 'react'
import './Select.pcss'
import {classNames} from '../../utils/classNames'
import {isMobileDevice} from '../../utils/isMobileDevice'
import {wait} from '../../utils/wait'
import Input from '../Input/Input'

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
    hasSearch = false,
    options: defaultOptions = [],
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [searchInputValue, setSearchInputValue] = useState('')
  const selectedOptions = options.filter(({isSelected}) => isSelected)
  const value = selectedOptions.map((selectedOption) => selectedOption.value)
  const currentVariant = (selectedOptions.length > 1) ? messages.severalOptionsSelected :
    (selectedOptions.length === 0) ? messages.notSelected : selectedOptions[0].label
  const selectRef = useRef(null)
  const searchInputRef = useRef(null)

  const toggleVisibility = () => {
    setIsOpen(!isOpen)
  }

  const selectPrevOption = () => {
    const selectedOptionIndex = options.findIndex((option) => option.isSelected)
    const previousOptionIndex = (selectedOptionIndex > 0) ? (selectedOptionIndex - 1) : options.length - 1
    const newOptions = options.map((option, index) => ({
      ...option,
      isSelected: index === previousOptionIndex
    }))

    setOptions(newOptions)
  }

  const selectNextOption = () => {
    const selectedOptionIndex = options.findIndex(({isSelected}) => isSelected)
    const nextOptionIndex = (selectedOptionIndex < options.length) ? (selectedOptionIndex + 1) : 0
    const newOptions = options.map((option, index) => ({
      ...option,
      isSelected: index === nextOptionIndex
    }))

    setOptions(newOptions)
  }

  const focusSeachInput = () => {
    if (searchInputRef.current) {
      wait(100).then(() => {
        searchInputRef.current.focus()
      })
    }
  }

  const filterOptions = () => {
    const cleanValue = searchInputValue.trim().toLowerCase()
    const newFilteredOptions = options.filter(({label}) => label.trim().toLowerCase().includes(cleanValue))

    setFilteredOptions(newFilteredOptions)
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
    const {value, isSelected} = option

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
    setIsOpen(false)
  }

  const handleSearchInput = (event) => {
    setSearchInputValue(event.target.value)
    filterOptions()
  }

  const bindEvents = () => {
    document.addEventListener('click', (event) => handleClick(event))
  }

  useEffect(() => {
    bindEvents()
  }, [])

  useEffect(() => {
    setSearchInputValue('')
    filterOptions()

    if (isOpen) {
      focusSeachInput()
    }
  }, [isOpen])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

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
        {
          hasSearch &&
          <>
            <Input
              className="select__search-input"
              ref={searchInputRef}
              value={searchInputValue}
              onInput={handleSearchInput}
            />
            <button
              className={classNames('select__search-input-clear-button', {
                'is-shown': false
              })}
            >
              X
            </button>
          </>
        }
        <div
          className="select__input input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-controls={id}
          aria-labelledby={`select-label-${id}`}
          aria-owns={`select-dropdown-${id}`}
          aria-activedescendant={selectedOptions[0] ? selectedOptions[0].value : ''}
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
        {
          Boolean(filteredOptions.length) &&
          <div
            className="select__dropdown"
            id={`select-dropdown-${id}`}
          >
            <ul
              className="select__dropdown-list"
              role="listbox"
            >
              {
                filteredOptions.map((option) => {
                  const {
                    label,
                    value,
                    isSelected,
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
                        aria-selected={isSelected}
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
        }
      </div>
    </div>
  )
}

export default Select
