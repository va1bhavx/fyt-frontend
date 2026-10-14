"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
interface BaseItem {
  key: string
  value: string
}

export function CustomSearchableSelect<T extends BaseItem>({
  items,
  placeholder = "Select a framework",
}: {
  items: T[]
  placeholder?: string
}) {
  return (
    <Combobox items={items}>
      <ComboboxInput placeholder={placeholder} className={"h-10"} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.key} value={item.value}>
              {item.value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
