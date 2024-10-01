'use client'

import { z } from 'zod'
import { courseObject } from './schema'
import { Fragment } from 'react'
import { joinText } from './util'

type Props = Pick<z.infer<typeof courseObject>, 'outline'>

const Item = ({ Title, Description, children }: Props['outline'][0]) => {
  if (Array.isArray(children) && children.length > 0) {
    return (
      <div className="flex w-full flex-col items-center md:items-start">
        <div className="peer flex items-center gap-x-4 break-all">
          <p className="rounded-xl bg-main px-3 py-1 text-lg font-bold leading-[1.8] text-white md:rounded-[20px] md:text-xl">
            {Title}
          </p>
          <p className="my-2 ml-5 hidden break-all text-base font-bold leading-[1.8] text-main md:inline-block md:text-xl">
            {Description}
          </p>
          <input
            type="checkbox"
            className="size-6 origin-center cursor-pointer appearance-none bg-[url('/images/outline-toggle.svg')] bg-center bg-no-repeat checked:rotate-180"
          />
        </div>
        <p className="my-2 break-all text-base font-bold leading-[1.8] text-main md:hidden">
          {Description}
        </p>
        <div className="hidden w-full flex-col gap-y-1 peer-has-[input:checked]:flex md:mb-1 md:mt-3 md:gap-y-0 md:pl-[116px] lg:mb-2 lg:mt-4 lg:gap-y-2">
          {children.map((data) => (
            <Fragment key={data.ID}>{Item(data)}</Fragment>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <p className="break-all text-center text-base font-medium leading-[1.8] text-[#4D4D4D] md:text-start md:text-xl">
        {joinText(Title, Description)}
      </p>
    )
  }
}

export default function Outline({ outline }: Props) {
  return (
    <div className="flex w-full flex-col gap-y-6 px-6 md:gap-y-4 md:px-40">
      {outline.map((data) => (
        <Fragment key={data.ID}>{Item(data)}</Fragment>
      ))}
    </div>
  )
}
