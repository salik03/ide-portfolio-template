import type { RESUME_DATA } from "@/lib/resume-data"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface ExperienceContentProps {
  data: typeof RESUME_DATA.experience
}

export function ExperienceContent({ data }: ExperienceContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Experience</h1>
      {data.map((job, index) => (
        <div key={index} className="mb-6 border-b border-vscode-border pb-4 last:border-b-0 last:pb-0">
          <h2 className="text-xl font-semibold text-vscode-fg/80">{job.role}</h2>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base text-vscode-fg/70">
              {job.company} - {job.location}
            </span>
            {job.link && (
              <Link
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-accent hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <p className="text-sm text-vscode-fg/60 mb-2">{job.timeframe}</p>
          <ul className="list-disc list-inside space-y-1">
            {job.description.map((desc, i) => (
              <li key={i} className="text-base">
                {desc}
              </li>
            ))}
          </ul>
          {job.technologies && (
            <p className="text-sm text-vscode-fg/70 mt-2">
              <span className="font-medium">Technologies:</span> {job.technologies}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
