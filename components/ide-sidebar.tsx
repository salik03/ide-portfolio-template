"use client"

import { useState } from "react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Folder, ChevronRight, ChevronDown, Menu } from "lucide-react"
import type { RESUME_DATA } from "@/lib/resume-data"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface IdeSidebarProps {
  sections: typeof RESUME_DATA.sections
  socialLinks: typeof RESUME_DATA.socialLinks
  activeTab: string | null
  onOpenTab: (id: string) => void
}

export function IdeSidebar({ sections, socialLinks, activeTab, onOpenTab }: IdeSidebarProps) {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const SidebarContent = () => (
    <TooltipProvider>
      <div className="flex h-full">
        {/* Activity Bar */}
        <div className="w-12 bg-vscode-tab-bg border-r border-vscode-border flex flex-col items-center py-4 space-y-4">
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vscode-fg hover:text-vscode-accent transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-vscode-tab-bg text-vscode-fg border border-vscode-border">
                {link.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Sidebar Explorer */}
        <div className="w-64 bg-vscode-sidebar-bg border-r border-vscode-border flex flex-col">
          <div className="p-3 text-sm font-semibold text-vscode-fg border-b border-vscode-border">EXPLORER</div>
          <div className="flex-1 overflow-y-auto text-sm">
            <div className="px-3 py-2">
              <button
                onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                className="flex items-center w-full text-left text-vscode-fg hover:text-vscode-accent transition-colors"
              >
                {isPortfolioOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                <Folder className="w-4 h-4 mr-2 text-vscode-accent" />
                <span>portfolio</span>
              </button>
              {isPortfolioOpen && (
                <div className="ml-6 mt-1 space-y-0.5">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onOpenTab(section.id)
                        setIsMobileOpen(false) // Close mobile sidebar when item is selected
                      }}
                      className={`flex items-center w-full text-left py-0.5 px-1 rounded ${
                        activeTab === section.id
                          ? "bg-vscode-selection text-white"
                          : "text-vscode-sidebar-fg hover:bg-vscode-tab-bg hover:text-vscode-fg"
                      } transition-colors`}
                    >
                      <section.icon className="w-4 h-4 mr-2" />
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 right-4 z-50 bg-vscode-tab-bg hover:bg-vscode-selection text-vscode-fg border border-vscode-border"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 bg-vscode-bg border-vscode-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
