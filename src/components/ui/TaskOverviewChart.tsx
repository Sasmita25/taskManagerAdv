import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type TooltipItem,
} from 'chart.js'
import type { TaskStatus } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const STATUS_ORDER: TaskStatus[] = ['To Do', 'In Progress', 'Done']

const LIGHT_COLORS = ['#898781', '#2a78d6', '#0ca30c']
const DARK_COLORS = ['#898781', '#3987e5', '#0ca30c']
const LIGHT_GRID = '#e1dcd9'
const DARK_GRID = '#2c2c2a'
const MUTED_INK = '#898781'

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])
  return isDark
}

type TaskOverviewChartProps = {
  counts: Record<TaskStatus, number>
}

export default function TaskOverviewChart({ counts }: TaskOverviewChartProps) {
  const isDark = useIsDarkMode()

  return (
    <div className="h-64 w-full">
      <Bar
        data={{
          labels: STATUS_ORDER,
          datasets: [
            {
              data: STATUS_ORDER.map((status) => counts[status] ?? 0),
              backgroundColor: isDark ? DARK_COLORS : LIGHT_COLORS,
              borderRadius: 4,
              maxBarThickness: 40,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: (ctx: TooltipItem<'bar'>) =>
                  `${ctx.formattedValue} task${ctx.parsed.y === 1 ? '' : 's'}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: MUTED_INK, font: { size: 12 } },
            },
            y: {
              beginAtZero: true,
              ticks: { color: MUTED_INK, precision: 0 },
              grid: { color: isDark ? DARK_GRID : LIGHT_GRID },
            },
          },
        }}
      />
    </div>
  )
}
