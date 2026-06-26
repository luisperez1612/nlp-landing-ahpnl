import type { Metadata } from 'next'
import { Dancing_Script, Open_Sans } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Free Workbook – Reprogramming the Subconscious Mind | Fabian Tejada',
  description:
    'Get your free workbook on Reprogramming the Subconscious Mind for Automatic Success. A hands-on resource by Fabian Tejada, NLP trainer and coach.',
  openGraph: {
    title: 'Free Workbook – Reprogramming the Subconscious Mind',
    description:
      'Get your free workbook on Reprogramming the Subconscious Mind for Automatic Success.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${openSans.variable}`}>
      <body className="font-sans bg-white text-gray-800 antialiased">{children}</body>
    </html>
  )
}
