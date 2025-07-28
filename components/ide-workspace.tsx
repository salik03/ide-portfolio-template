"use client"

import type React from "react"

import { X } from "lucide-react"
import type { RESUME_DATA } from "@/lib/resume-data"
import { AboutContent } from "@/components/content/about-content"
import { ExperienceContent } from "@/components/content/experience-content"
import { SkillsContent } from "@/components/content/skills-content"
import { ProjectsContent } from "@/components/content/projects-content"
import { EducationContent } from "@/components/content/education-content"
import { CertificationsContent } from "@/components/content/certifications-content"
import { LeadershipContent } from "@/components/content/leadership-content"
import { AwardsContent } from "@/components/content/awards-content"
import { ContactContent } from "@/components/content/contact-content"
import { ScrollArea } from "@/components/ui/scroll-area"

interface IdeWorkspaceProps {
  openTabs: { id: string; title: string; icon: React.ElementType }[]
  activeTab: string | null
  onSetActiveTab: (id: string) => void
  onCloseTab: (id: string) => void
  resumeData: typeof RESUME_DATA
}

export function IdeWorkspace({ openTabs, activeTab, onSetActiveTab, onCloseTab, resumeData }: IdeWorkspaceProps) {
  const renderContent = (tabId: string) => {
    switch (tabId) {
      case "about":
        return <AboutContent data={resumeData.about} name={resumeData.name} profession={resumeData.profession} />
      case "experience":
        return <ExperienceContent data={resumeData.experience} />
      case "skills":
        return <SkillsContent data={resumeData.skills} />
      case "projects":
        return <ProjectsContent data={resumeData.projects} />
      case "education":
        return <EducationContent data={resumeData.education} />
      case "certifications":
        return <CertificationsContent data={resumeData.certifications} />
      case "leadership":
        return <LeadershipContent data={resumeData.leadership} />
      case "awards":
        return <AwardsContent data={resumeData.awards} />
      case "contact":
        return <ContactContent data={resumeData.contact} />
      default:
        return <div className="p-4 text-vscode-fg">{"// File not found or content not implemented."}</div>
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-vscode-bg">
      {/* Tabs */}
      <div className="flex border-b border-vscode-border bg-vscode-tab-bg">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`relative flex items-center px-3 md:px-4 py-2 text-sm cursor-pointer border-r border-vscode-border transition-colors duration-200 min-w-0 ${
                  activeTab === tab.id
                    ? "bg-vscode-bg text-vscode-fg"
                    : "bg-vscode-tab-bg text-vscode-sidebar-fg hover:bg-vscode-bg hover:text-vscode-fg"
                }`}
                onClick={() => onSetActiveTab(tab.id)}
              >
                {/* Active tab indicator */}
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-vscode-accent transition-transform duration-300 ease-in-out ${
                    activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <tab.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{tab.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onCloseTab(tab.id)
                  }}
                  className="ml-2 md:ml-3 p-1 rounded-sm hover:bg-vscode-selection/50 transition-colors flex-shrink-0"
                  aria-label={`Close ${tab.title}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6 text-sm leading-relaxed">
            {activeTab ? (
              <div className="animate-fade-in">{renderContent(activeTab)}</div>
            ) : (
              <div className="flex items-center justify-center h-full text-vscode-sidebar-fg/70">
                {"// Select a file from the sidebar to view its content."}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
