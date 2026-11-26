import { useCallback, useEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'viagem-theme'
const CHANGE_EVENT = 'viagem-theme-change'

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    return 'system'
  }
}

function savePreference(value: 'light' | 'dark') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    return
  }
}

function systemTheme(): 'light' | 'dark' {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)
  const [system, setSystem] = useState<'light' | 'dark'>(systemTheme)
  const resolved = preference === 'system' ? system : preference

  useEffect(() => {
    if (preference === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', preference)
    }
  }, [preference])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const update = () => setSystem(media.matches ? 'dark' : 'light')
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const sync = () => setPreference(readPreference())
    window.addEventListener(CHANGE_EVENT, sync)
    return () => window.removeEventListener(CHANGE_EVENT, sync)
  }, [])

  const toggle = useCallback(() => {
    const next = resolved === 'dark' ? 'light' : 'dark'
    savePreference(next)
    setPreference(next)
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [resolved])

  return { preference, resolved, toggle }
}