import type { RESUME_DATA } from "@/lib/resume-data"
import Link from "next/link"

interface ProjectsContentProps {
  data: typeof RESUME_DATA.projects
}

export function ProjectsContent({ data }: ProjectsContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Projects & Research</h1>
      {data.map((project, index) => (
        <div key={index} className="mb-6 border-b border-vscode-border pb-4 last:border-b-0 last:pb-0">
          <h2 className="text-xl font-semibold text-vscode-fg/80">{project.title}</h2>
          {project.timeframe && <p className="text-sm text-vscode-fg/60 mb-2">{project.timeframe}</p>}
          <p className="text-base mb-2">{project.description}</p>
          {project.techStack && (
            <p className="text-sm text-vscode-fg/70">
              <span className="font-medium">Tech Stack:</span> {project.techStack}
            </p>
          )}
          {project.purpose && (
            <p className="text-sm text-vscode-fg/70">
              <span className="font-medium">Purpose:</span> {project.purpose}
            </p>
          )}
          {project.features && project.features.length > 0 && (
            <p className="text-sm text-vscode-fg/70">
              <span className="font-medium">Features:</span> {project.features.join(", ")}
            </p>
          )}
          {project.links && project.links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vscode-accent hover:underline text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
