import {
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react'

import { IoSearch } from 'react-icons/io5'
import React from 'react'
import { useAsyncList } from '@react-stately/data'
import { useRouter } from 'next/navigation'

export default function Search() {
  const [valueSearch, setValueSearch] = React.useState<any>([])
  const { push,refresh } = useRouter()
  let list = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/videos?search=${filterText}`, { signal })
      let json = await res.json()
      return {
        items: Array.isArray(json) ? json : [], 
      }
    },
  })

  const handleSearch = (value) => {
    console.log('SEARCH:', value)

    push(`/watch/${value}`)
  }
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      refresh()
      push(`/search?search=${valueSearch}`)
    }
    e.continuePropagation()
  }
  return (
    <div className=" glass rounded-full px-4 border border-gray-600 border-opacity-30 shadow-2xl">
      <Autocomplete
        classNames={{
          base: 'max-w-xs ',
          listboxWrapper: 'max-h-[320px]',
          selectorButton: 'text-white',
          text: 'text-white',
        }}
        onInputChange={(v) => {
          list.setFilterText(v)
          setValueSearch(v)
        }}
        onKeyDown={onEnter}
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        // defaultItems={data}
        inputProps={{
          classNames: {
            input: 'ml-1 bg-transparent hover:bg-transparent placeholder-gray-900',
            innerWrapper: 'bg-transparent hover:bg-transparent',
            base: 'bg-transparent hover:bg-transparent',
            mainWrapper: 'bg-transparent hover:bg-transparent',
            inputWrapper:
              'h-[48px] bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent',
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'dark:data-[hover=true]:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[hover=true]:bg-default-200',
              'data-[selectable=true]:focus:bg-default-100',
              'data-[focus-visible=true]:ring-default-500',
            ],
          },
        }}
        aria-label="Type to search..."
        placeholder="Type to search..."
        //   popoverProps={{
        //     offset: 10,
        //     classNames: {
        //       content: 'p-1 border-small border-default-100 bg-background',
        //     },
        //   }}
        startContent={<IoSearch className="text-white" size={30} />}
        endContent={false}
        // variant="underlined"
        onSelectionChange={handleSearch}
      >
        {(item) => (
          <AutocompleteItem key={item.video_id} textValue={item.title}>
            {item.title}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}
