"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"

export function DatePicker( { name, value, minDate, maxDate, handleChange, placeHolder } ) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="w-full flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline"
            id="date"
            className="text-base cursor-pointer justify-between rounded-[5px]"
          >
            {value ? value : placeHolder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            disabled={{ before: new Date(Date.parse(minDate)), after: new Date(Date.parse(maxDate)) }}
            onSelect={(date) => {
              handleChange(name, date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
