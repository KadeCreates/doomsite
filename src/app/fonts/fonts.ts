import { JetBrains_Mono, Cormorant_Garamond } from 'next/font/google'

export const displayFont = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const monoFont = JetBrains_Mono({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
