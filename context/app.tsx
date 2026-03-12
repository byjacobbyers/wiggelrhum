'use client'

import { createContext, useContext } from 'react'

const AppContext = createContext<Record<string, unknown> | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const value = {}
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
