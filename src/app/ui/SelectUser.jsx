import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectUser({ placeholder, label, options, value, onChange }) {

    const optionItems = options.map(value => <SelectItem className="text-base cursor-pointer" key = {value} value={ value }>{ value }</SelectItem>)

    return (
        <Select onValueChange = {onChange}>
        <SelectTrigger className = "text-base w-full border-solid border-inherit border-1 hover:bg-accent" >
            <SelectValue placeholder={ value } />
        </SelectTrigger>
        <SelectContent >
            <SelectGroup >
            <SelectLabel className="text-base">{ label }</SelectLabel>
            { optionItems }
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}
