"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CommonProps {
  id?: string
  placeholder?: string
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  showWeekNumber?: boolean
}

type CustomCalendarProps = CommonProps &
  (
    | {
        mode?: "single"
        value: Date | undefined
        onChange: (value: Date | undefined) => void
      }
    | {
        mode: "range"
        value: DateRange | undefined
        onChange: (value: DateRange | undefined) => void
      }
    | {
        mode: "multiple"
        value: Date[] | undefined
        onChange: (value: Date[] | undefined) => void
      }
  )

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function CustomCalendar(props: CustomCalendarProps) {
  const [open, setOpen] = React.useState(false)

  const {
    id,
    placeholder = "Choose a date",
    captionLayout = "dropdown",
    showWeekNumber = false,
  } = props

  const commonProps = {
    captionLayout,
    showWeekNumber,
    className: "rounded-lg",
  }

  let label = placeholder
  let hasSelection = false
  let calendar: React.ReactNode

  if (props.mode === "range") {
    const range = props.value

    if (range?.from) {
      hasSelection = true
      label = range.to
        ? `${formatDate(range.from)} – ${formatDate(range.to)}`
        : `${formatDate(range.from)} – Choose end date`
    }

    calendar = (
      <Calendar
        {...commonProps}
        mode="range"
        selected={range}
        onSelect={(value) => {
          props.onChange(value)

          if (value?.from && value.to) {
            setOpen(false)
          }
        }}
      />
    )
  } else if (props.mode === "multiple") {
    const dates = props.value

    if (dates?.length) {
      hasSelection = true
      label =
        dates.length === 1
          ? formatDate(dates[0])
          : `${dates.length} dates selected`
    }

    calendar = (
      <Calendar
        {...commonProps}
        mode="multiple"
        selected={dates}
        onSelect={(value) => props.onChange(value)}
      />
    )
  } else {
    const date = props.value

    if (date) {
      hasSelection = true
      label = formatDate(date)
    }

    calendar = (
      <Calendar
        {...commonProps}
        mode="single"
        selected={date}
        onSelect={(value) => {
          props?.onChange(value)
          setOpen(false)
        }}
        captionLayout={props.captionLayout}
      />
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            className={`h-11 w-full min-w-0 justify-start text-left font-normal ${
              hasSelection ? "" : "text-muted-foreground"
            }`}
          />
        }
      >
        <span className="truncate">{label}</span>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        {calendar}
      </PopoverContent>
    </Popover>
  )
}
