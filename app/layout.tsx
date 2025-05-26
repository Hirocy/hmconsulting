import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "H&M Consulting - 新規事業開発のビジネスコンサルティング",
  description: "新規事業開発の壁を共に乗り越える。戦略策定から実行支援まで、新規事業開発の全プロセスをサポートします。",
  keywords:
    "新規事業開発, ビジネスコンサルティング, 事業戦略, 組織の壁, リソースの壁, スキルの壁, 新規事業立ち上げ, 事業計画策定",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
