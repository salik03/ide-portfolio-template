interface AboutContentProps {
  data: string
  name: string
  profession: string
}

export function AboutContent({ data, name, profession }: AboutContentProps) {
  return (
    <div className="prose prose-invert max-w-none text-vscode-fg">
      <h1 className="text-2xl font-bold text-vscode-accent mb-4">{name}</h1>
      <h2 className="text-xl font-semibold text-vscode-fg/80 mb-6">{profession}</h2>
      <p className="text-base leading-relaxed">{data}</p>
    </div>
  )
}
