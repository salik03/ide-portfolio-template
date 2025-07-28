"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { MessageSquare, X } from "lucide-react"
import { CopilotChatbot } from "./copilot-chatbot"

export function IdeCopilot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Trigger */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-8 rounded-l-md rounded-r-none bg-vscode-tab-bg hover:bg-vscode-selection text-vscode-fg border border-vscode-border border-r-0"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Trigger */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-vscode-accent hover:bg-vscode-accent-hover shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Universal Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="flex flex-col p-0 w-full max-w-md bg-vscode-sidebar-bg border-l border-vscode-border"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="flex flex-row items-center justify-between p-3 border-b border-vscode-border">
            <SheetTitle className="text-base font-semibold flex items-center text-vscode-fg">
              <MessageSquare className="w-4 h-4 mr-2 text-vscode-accent" />
              Salik's AI Copilot
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-vscode-fg">
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="flex-1 min-h-0">
            <CopilotChatbot className="border-0 rounded-none h-full" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
