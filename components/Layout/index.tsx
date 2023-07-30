import React from "react"
import SideNav from "./SideNav"
import Header from "./Header"

type ILayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="grid w-full grid-flow-col grid-cols-[max-content_auto]">
      <SideNav />
      <div className="flex min-h-screen flex-col items-start justify-start w-full">
        <Header />
        {children}
      </div>
    </div>
  )
} 