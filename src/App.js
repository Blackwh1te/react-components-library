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
  const selectOptionsHasSearch = [
    {
      label: 'Россия 11',
      value: 'Russia-1',
      isSelected: true
    },
    {
      label: 'Россия 211',
      value: 'Russia-2',
      isSelected: false
    },
    {
      label: 'Россия 3231',
      value: 'Russia-3',
      isSelected: false
    },
    {
      label: 'Россия 4312',
      value: 'Russia-4',
      isSelected: false
    },
    {
      label: 'Россия 53123',
      value: 'Russia-5',
      isSelected: false
    },
    {
      label: 'Россия 6412',
      value: 'Russia-6',
      isSelected: false
    },
    {
      label: 'Россия 7111',
      value: 'Russia-7',
      isSelected: false
    },
    {
      label: 'Россия 888',
      value: 'Russia-8',
      isSelected: false
    },
    {
      label: 'Казахстан 1',
      value: 'Kazakhstan-1',
      isSelected: false
    },
    {
      label: 'Казахстан 2',
      value: 'Kazakhstan-2',
      isSelected: false
    },
    {
      label: 'Казахстан 3',
      value: 'Kazakhstan-3',
      isSelected: false
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
        <Select
          name="country1"
          label="Select country (start typing...)"
          options={selectOptionsHasSearch}
          hasSearch
        />
      </form>
    </div>
  )
}

export default App
