import type { RESUME_DATA } from "@/lib/resume-data"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface LeadershipContentProps {
  data: typeof RESUME_DATA.leadership
}

export function LeadershipContent({ data }: LeadershipContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Leadership & Volunteer Experience</h1>
      {data.map((item, index) => (
        <div key={index} className="mb-6 border-b border-vscode-border pb-4 last:border-b-0 last:pb-0">
          <h2 className="text-xl font-semibold text-vscode-fg/80">{item.role}</h2>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-base text-vscode-fg/70">{item.organization}</p>
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-accent hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <p className="text-sm text-vscode-fg/60 mb-2">{item.timeframe}</p>
          <ul className="list-disc list-inside space-y-1">
            {item.description.map((desc, i) => (
              <li key={i} className="text-base">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
