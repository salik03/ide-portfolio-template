"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { IdeSidebar } from "@/components/ide-sidebar"
import { IdeWorkspace } from "@/components/ide-workspace"
import { IdeTerminal } from "@/components/ide-terminal"
import { RESUME_DATA } from "@/lib/resume-data"
import { SidebarProvider } from "@/components/ui/sidebar"
import { IdeCopilot } from "@/components/ide-copilot"

export default function HomePage() {
  const [openTabs, setOpenTabs] = useState<{ id: string; title: string; icon: React.ElementType }[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial tab to 'about' if no tabs are open
    if (openTabs.length === 0 && RESUME_DATA.sections.length > 0) {
      const aboutSection = RESUME_DATA.sections.find((section) => section.id === "about")
      if (aboutSection) {
        setOpenTabs([aboutSection])
        setActiveTab(aboutSection.id)
      }
    }
  }, [])

  const handleOpenTab = (sectionId: string) => {
    const section = RESUME_DATA.sections.find((s) => s.id === sectionId)
    if (section) {
      if (!openTabs.some((tab) => tab.id === sectionId)) {
        setOpenTabs((prev) => [...prev, section])
      }
      setActiveTab(sectionId)
    }
  }

  const handleCloseTab = (tabId: string) => {
    setOpenTabs((prev) => prev.filter((tab) => tab.id !== tabId))
    if (activeTab === tabId) {
      // If the closed tab was active, activate the next available tab or null
      const remainingTabs = openTabs.filter((tab) => tab.id !== tabId)
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[0].id : null)
    }
  }

  const handleTerminalCommand = (command: string) => {
    const section = RESUME_DATA.sections.find((s) => s.id === command)
    if (section) {
      handleOpenTab(section.id)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-vscode-bg text-vscode-fg overflow-hidden font-sans">
        {/* Left Sidebar (Explorer) */}
        <IdeSidebar
          sections={RESUME_DATA.sections}
          socialLinks={RESUME_DATA.socialLinks}
          activeTab={activeTab}
          onOpenTab={handleOpenTab}
        />

        {/* Main Content Area (Workspace + Terminal) */}
        <main className="flex flex-col flex-1 min-w-0">
          {/* Workspace */}
          <IdeWorkspace
            openTabs={openTabs}
            activeTab={activeTab}
            onSetActiveTab={setActiveTab}
            onCloseTab={handleCloseTab}
            resumeData={RESUME_DATA}
          />

          {/* Terminal - Hidden on mobile */}
          <div className="hidden md:block">
            <IdeTerminal
              onCommand={handleTerminalCommand}
              name={RESUME_DATA.name}
              profession={RESUME_DATA.profession}
              terminalRef={terminalRef}
            />
          </div>
        </main>

        {/* Right Sidebar (Copilot) - Universal Component */}
        <IdeCopilot />
      </div>
    </SidebarProvider>
  )
}
