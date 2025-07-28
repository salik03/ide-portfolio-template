"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { TerminalIcon, ChevronUp, ChevronDown } from "lucide-react"
import { RESUME_DATA } from "@/lib/resume-data"

interface IdeTerminalProps {
  onCommand: (command: string) => void
  name: string
  profession: string
  terminalRef: React.RefObject<HTMLDivElement>
}

export function IdeTerminal({ onCommand, name, profession, terminalRef }: IdeTerminalProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const outputEndRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const commands = RESUME_DATA.sections.map((s) => s.id).concat(["help", "clear"])

  useEffect(() => {
    const welcomeMessage = [
      `Welcome to ${name}'s interactive portfolio!`,
      `I'm a ${profession}.`,
      "",
      "Type 'help' to see available commands.",
      "--------------------------------------------------------------------------------",
    ]
    setOutput(welcomeMessage)
  }, [name, profession])

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [output])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return

    setOutput((prev) => [...prev, `> ${command}`])
    setInput("")

    switch (command) {
      case "help":
        setOutput((prev) => [...prev, "", "Available commands:", ...commands.map((cmd) => `  - ${cmd}`), ""])
        break
      case "clear":
        setOutput([])
        break
      case "about":
      case "experience":
      case "skills":
      case "projects":
      case "education":
      case "certifications":
      case "leadership":
      case "awards":
      case "contact":
        onCommand(command)
        setOutput((prev) => [...prev, `Opening ${command}.`])
        break
      default:
        setOutput((prev) => [...prev, `Command not found: ${command}. Type 'help' for a list of commands.`])
        break
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      ref={terminalRef}
      className={`flex flex-col bg-vscode-terminal-bg border-t border-vscode-border font-mono text-sm transition-all duration-200 ${
        isCollapsed ? "h-10" : "h-64"
      }`}
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 border-b border-vscode-border bg-vscode-tab-bg">
        <TerminalIcon className="w-4 h-4 mr-2 text-vscode-fg" />
        <span className="text-vscode-fg">Terminal</span>
        <button
          onClick={toggleCollapse}
          className="ml-auto p-1 rounded-sm hover:bg-vscode-selection transition-colors"
          aria-label={isCollapsed ? "Expand Terminal" : "Collapse Terminal"}
        >
          {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Output */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 text-vscode-terminal-fg scrollbar-thin scrollbar-thumb-vscode-selection scrollbar-track-vscode-terminal-bg">
          {output.map((line, index) => (
            <pre key={index} className="whitespace-pre-wrap">
              {line}
            </pre>
          ))}
          <div ref={outputEndRef} />
        </div>
      )}

      {/* Terminal Input */}
      {!isCollapsed && (
        <form onSubmit={handleCommandSubmit} className="flex items-center p-4 border-t border-vscode-border">
          <span className="text-vscode-terminal-green mr-2">{"user@portfolio:~$"} </span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 bg-transparent outline-none text-vscode-terminal-fg caret-vscode-accent"
            autoFocus
            spellCheck="false"
          />
        </form>
      )}
    </div>
  )
}
