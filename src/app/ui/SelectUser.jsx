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

    const optionItems = options.map(value => <SelectItem className = "m-px" key = {value} value={ value }>{ value }</SelectItem>)

    return (
        <Select  onValueChange = {onChange}>
        <SelectTrigger className = " border-solid border-inherit border-1" >
            <SelectValue placeholder={ value } />
        </SelectTrigger>
        <SelectContent className= "p-4">
            <SelectGroup >
            <SelectLabel className="text-base">{ label }</SelectLabel>
            { optionItems }
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}
