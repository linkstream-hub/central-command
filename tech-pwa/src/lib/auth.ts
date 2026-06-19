import { TechSession } from './types'

const AUTH_KEY = 'apt_tech_session';

export function setSession(session: TechSession) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  }
}

export function getSession(): TechSession | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(AUTH_KEY)
  if (!data) return null;
  try {
    const parsed = JSON.parse(data) as TechSession
    if (new Date(parsed.expiresAt) < new Date()) {
      clearSession()
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
  }
}
