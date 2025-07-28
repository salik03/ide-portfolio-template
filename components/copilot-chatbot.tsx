"use client"

import type * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2, User, Bot } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CopilotChatbotProps {
  className?: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function CopilotChatbot({ className }: CopilotChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const API_URL = "https://your-chatbot-api/ask"

  useEffect(() => {
    // Initial welcome message
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm Salik's AI assistant. Ask me anything about his projects, skills, or experience!",
        },
      ])
    }
  }, [messages.length])

  useEffect(() => {
    setTimeout(() => {
      const scrollableViewport = scrollAreaRef.current?.querySelector("div[data-radix-scroll-area-viewport]")
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight
      }
    }, 100)
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error("The AI assistant is currently unavailable. Please try again later.")
      }

      const data = await response.json()
      const assistantMessage: Message = { role: "assistant", content: data.answer }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      // Remove the user's message if the API call fails
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("flex flex-col h-full bg-transparent text-vscode-fg", className)}>
      <CardContent className="flex-1 p-3 overflow-y-auto text-sm">
        <ScrollArea className="h-full pr-3" ref={scrollAreaRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn("mb-4 flex gap-2 animate-fade-in", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 bg-vscode-selection text-vscode-fg rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] p-3 rounded-lg",
                  msg.role === "user"
                    ? "bg-vscode-accent text-white"
                    : "bg-vscode-tab-bg text-vscode-fg border border-vscode-border/50",
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="w-6 h-6 bg-vscode-tab-bg text-vscode-fg rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex gap-2 animate-fade-in">
              <div className="w-6 h-6 bg-vscode-selection text-vscode-fg rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="max-w-[85%] p-3 rounded-lg bg-vscode-tab-bg text-vscode-fg border border-vscode-border/50">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t border-vscode-border">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-vscode-bg border-vscode-border text-vscode-fg placeholder:text-vscode-sidebar-fg/70 focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:ring-offset-0"
            disabled={isLoading}
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-vscode-accent hover:bg-vscode-accent-hover disabled:bg-vscode-selection"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
