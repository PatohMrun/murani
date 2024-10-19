'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex justify-center items-center">
            <button type="button"
                className="text-white dark:text-black text-2xl"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                {theme === 'dark' ? <FiSun className="text-white" /> : <FiMoon className="text-black" />}
            </button>
        </div>
    )
}
