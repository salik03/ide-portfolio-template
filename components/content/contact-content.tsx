import type { RESUME_DATA } from "@/lib/resume-data"
import { Mail, Phone, ExternalLink, Terminal } from "lucide-react"
import Link from "next/link"

interface ContactContentProps {
  data: typeof RESUME_DATA.contact
}

export function ContactContent({ data }: ContactContentProps) {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/salik-uddin/",
      icon: "🔗",
    },
    {
      name: "GitHub",
      url: "https://github.com/salik03",
      icon: "💻",
    },
    {
      name: "Portfolio (Bento)",
      url: "https://bento.me/salikuddin",
      icon: "🌐",
    },
    {
      name: "Codeforces",
      url: "https://codeforces.com/profile/uddinsalik03",
      icon: "🏆",
    },
    {
      name: "PyPI",
      url: "https://pypi.org/project/salik/",
      icon: "🐍",
    },
  ]

  const researchLinks = [
    {
      title: "Fake News Detection Using BERT",
      url: "https://docs.google.com/document/d/1CZ7s6gePiYMPSjzPM8F97CnGa23uskVLW8NE2OsNaAY/edit?usp=sharing",
      description: "Deep learning system for identifying fake news using BERT architecture",
    },
    {
      title: "Real-Time Speech To Sign Language Translation",
      url: "https://docs.google.com/document/d/1V2Ay9WeruQYuR-EFGt9CnUiD9lRbppEpXRPkurzBW4U/edit?usp=sharing",
      description: "Comprehensive analysis of speech-to-sign language translation methodologies",
    },
  ]

  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-xl md:text-2xl font-bold text-vscode-accent mb-4 md:mb-6">Contact Me</h1>

      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Mail className="w-4 h-4 md:w-5 md:h-5 text-vscode-accent flex-shrink-0" />
          <Link
            href="mailto:uddinsalik@outlook.com"
            className="text-sm md:text-base text-vscode-accent hover:underline break-all"
          >
            uddinsalik@outlook.com
          </Link>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-vscode-accent flex-shrink-0" />
          <Link href="tel:+919044431440" className="text-sm md:text-base text-vscode-accent hover:underline">
            +91 9044431440
          </Link>
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-semibold text-vscode-fg/80 mb-3 md:mb-4">Find me online:</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 mb-6 md:mb-8">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-vscode-tab-bg border border-vscode-border rounded-md hover:bg-vscode-selection transition-colors"
          >
            <span className="text-lg md:text-xl flex-shrink-0">{link.icon}</span>
            <span className="text-sm md:text-base text-vscode-fg hover:text-vscode-accent">{link.name}</span>
          </Link>
        ))}
      </div>

      <h2 className="text-lg md:text-xl font-semibold text-vscode-fg/80 mb-3 md:mb-4">Research Publications:</h2>
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {researchLinks.map((research) => (
          <div key={research.title} className="p-3 md:p-4 bg-vscode-tab-bg border border-vscode-border rounded-md">
            <Link
              href={research.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-vscode-accent hover:underline font-medium mb-2"
            >
              <span className="text-sm md:text-base">{research.title}</span>
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
            </Link>
            <p className="text-xs md:text-sm text-vscode-fg/70">{research.description}</p>
          </div>
        ))}
      </div>

      <div className="p-3 md:p-4 bg-vscode-tab-bg border border-vscode-border rounded-md">
        <div className="flex items-start gap-2 mb-2">
          <Terminal className="w-4 h-4 text-vscode-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-vscode-fg/70">
            <strong>Desktop Tip:</strong> You can use the terminal below to navigate through my portfolio. Try typing{" "}
            <code className="bg-vscode-bg px-1 rounded text-xs">help</code> to see available commands!
          </p>
        </div>
        <p className="text-xs text-vscode-fg/60 md:hidden">
          <strong>Mobile:</strong> Use the menu button (☰) in the top-right to navigate between sections.
        </p>
      </div>
    </div>
  )
}
