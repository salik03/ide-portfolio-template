import type { RESUME_DATA } from "@/lib/resume-data"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface AwardsContentProps {
  data: typeof RESUME_DATA.awards
}

export function AwardsContent({ data }: AwardsContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Awards & Achievements</h1>
      {data.map((award, index) => (
        <div key={index} className="mb-6 border-b border-vscode-border pb-4 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-vscode-fg/80">{award.title}</h2>
            {award.link && (
              <Link
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-accent hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <p className="text-base">{award.description}</p>
        </div>
      ))}
    </div>
  )
}
