import type { RESUME_DATA } from "@/lib/resume-data"

interface SkillsContentProps {
  data: typeof RESUME_DATA.skills
}

export function SkillsContent({ data }: SkillsContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">Skills</h1>
      {Object.entries(data).map(([category, skills], index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold text-vscode-fg/80 capitalize mb-2">
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-vscode-tab-bg text-vscode-fg px-3 py-1 rounded-md text-sm border border-vscode-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
