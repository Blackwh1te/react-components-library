import React from 'react'
import './App.pcss'
import Select from './components/Select/Select'

const App = () => {
  const selectOptions = [
    {
      label: 'Россия',
      value: 'Russia',
      isSelected: true
    },
    {
      label: 'Казахстан',
      value: 'Kazakhstan',
      isSelected: false
    },
    {
      label: 'Зимбабве',
      value: 'Zimbabwe',
      isSelected: false
    },
  ]
  const selectOptionsMultiple = [
    {
      label: 'Россия',
      value: 'Russia',
      isSelected: true
    },
    {
      label: 'Казахстан',
      value: 'Kazakhstan',
      isSelected: false
    },
    {
      label: 'Зимбабве',
      value: 'Zimbabwe',
      isSelected: true
    },
  ]

  return (
    <div className="app">
      <form action="">
        <Select
          name="country"
          label="Select country"
          options={selectOptions}
        />
        <Select
          id="countries"
          name="countries[]"
          label="Select countries"
          options={selectOptionsMultiple}
          multiple
        />
      </form>
    </div>
  )
}

export default App
