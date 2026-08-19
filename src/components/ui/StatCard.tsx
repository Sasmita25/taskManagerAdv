import Card from './Card'

type StatCardProps = {
  label: string
  value: number
  accent?: string
}

export default function StatCard({ label, value, accent = 'bg-gray-400 dark:bg-gray-600' }: StatCardProps) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className={`h-8 w-1.5 shrink-0 rounded-full ${accent}`} />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          {value}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      </div>
    </Card>
  )
}
