import { backUpData, useStore } from '../store.js'
import { createElement } from '../reactive/create-element.js'

const sortData = (filterBy) => (state) => {
  if (backUpData.default.length === 0) {
    backUpData.default.push(...state)
  }
  return [...backUpData.default].sort((a, b) => {
    if (filterBy === 'dueDate' || filterBy === 'creationDate') {
      const aMill = Date.parse(a[filterBy])
      const bMill = Date.parse(b[filterBy])
      return bMill - aMill
    }
    return b[filterBy] - a[filterBy]
  })
}

const filterData = (filterBy) => (state) => {
  if (backUpData.default.length === 0) {
    backUpData.default.push(...state)
  }
  return [...backUpData.default].filter((entry) => !!entry[filterBy])
}

export const FilterButton = ({
  label,
  disabled,
  filterBy,
  isActive,
  setFilterIndex,
  index,
  isFilter,
}) => {
  const [, setData] = useStore()
  return createElement(
    'button',
    {
      'aria-selected': isActive ? 'true' : 'false',
      class: 'button-base button-outline button-rounded filter-button',
      disabled,
      onClick: () => {
        if (!isActive) {
          setFilterIndex(index)
          setData(!isFilter ? sortData(filterBy) : filterData(filterBy))
          return
        }
        setFilterIndex(-1)
        setData(backUpData.default)
      },
    },
    label
  )
}
