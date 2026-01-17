'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex justify-center items-center">
            <button type="button"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-xl transition-colors"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle Theme"
            >
                {resolvedTheme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
        </div >
    )
}
