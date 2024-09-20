"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import dark from "@/public/assets/dark.svg"
import light from "@/public/assets/light.svg"

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const {resolvedTheme} = useTheme()
  const [icon, setIcon] = useState(light)

  useEffect(() => {
    setMounted(true)
    resolvedTheme == "dark" ? setIcon(dark) : setIcon(light)
  }, [resolvedTheme])

  if (!mounted) {
    return null
  }

  function handleTheme() {
    if(resolvedTheme == "dark") {
      console.log(theme)
        setTheme("light")
    } else if(resolvedTheme == "light") {
        setTheme("dark")
    }
}

return (
    <div className='bg-zinc-100 dark:bg-zinc-500 rounded-full p-2' onClick={handleTheme}>
        <Image src={icon} alt='Change theme' className='select-none' />
    </div>
    )
}

export default ThemeSwitch