import type { RESUME_DATA } from "@/lib/resume-data"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface EducationContentProps {
  data: typeof RESUME_DATA.education
}

export function EducationContent({ data }: EducationContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Education</h1>
      {data.map((edu, index) => (
        <div key={index} className="mb-6 border-b border-vscode-border pb-4 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-vscode-fg/80">{edu.institution}</h2>
            {edu.link && (
              <Link
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-accent hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <p className="text-base text-vscode-fg/70">{edu.degree}</p>
          <p className="text-sm text-vscode-fg/60">
            {edu.location} - {edu.timeframe}
          </p>
          {edu.specialization && <p className="text-sm text-vscode-fg/70">Specialisation: {edu.specialization}</p>}
          {edu.grades && <p className="text-sm text-vscode-fg/70">Grades: {edu.grades}</p>}
        </div>
      ))}
    </div>
  )
}
