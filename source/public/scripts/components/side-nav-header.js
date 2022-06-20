import { createElement } from '../reactive/create-element.js'
import { SearchInput } from './search-input.js'
import { FilterButton } from './filter-buttons.js'
import { useState } from '../reactive/use-state.js'
import { Switch } from './switch.js'
import { AddIcon } from './icons/add-icon.js'
import { useRouter } from '../reactive/use-router.js'

const filterGroup = { current: undefined }

export const SideNavHeader = () => {
  const [filterIndex, setFilterIndex] = useState(-1)
  const { push } = useRouter()

  return createElement(
    'div',
    { class: 'side-nav-header' },
    createElement(SearchInput),
    createElement(Switch),
    createElement(
      'div',
      {
        class: 'filter-group',
        ref: (ref) => {
          filterGroup.current = ref
        },
      },
      createElement(FilterButton, {
        label: 'Erledigt',
        filterBy: 'done',
        index: 0,
        setFilterIndex,
        isActive: filterIndex === 0,
        isFilter: true,
      }),
      createElement(FilterButton, {
        label: 'Datum',
        filterBy: 'dueDate',
        index: 1,
        setFilterIndex,
        isActive: filterIndex === 1,
      }),
      createElement(FilterButton, {
        label: 'Relevanz',
        filterBy: 'prio',
        index: 2,
        setFilterIndex,
        isActive: filterIndex === 2,
      }),
      createElement(FilterButton, {
        label: 'Erstellung',
        filterBy: 'creationDate',
        index: 3,
        setFilterIndex,
        isActive: filterIndex === 3,
      })
    ),
    createElement(
      'button',
      {
        class: 'button-base add-button',
        title: 'neue Notiz erstellen',
        onClick: () => {
          push('/new/create-new')
        },
      },
      createElement(AddIcon)
    )
  )
}
