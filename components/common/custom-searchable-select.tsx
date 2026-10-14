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
  value,
  onValueChange,
}: {
  items: T[]
  placeholder?: string
  value: string
  onValueChange: (value: string) => void
}) {
  const selectedItem = items.find((item) => item.key === value) ?? null
  return (
    <Combobox
      items={items}

      value={selectedItem}
      onValueChange={(item) => onValueChange(item?.key ?? "")}
      itemToStringLabel={(item) => item.value}
      itemToStringValue={(item) => item.key}
      isItemEqualToValue={(item, selected) => item.key === selected.key}
    >
      <ComboboxInput placeholder={placeholder} className={"h-10"} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.key} value={item}>
              {item.value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
