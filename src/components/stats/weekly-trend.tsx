'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface WeeklyData {
  week: string
  minutes: number
}

interface WeeklyTrendProps {
  data: WeeklyData[]
}

export function WeeklyTrend({ data }: WeeklyTrendProps) {
  const chartData = {
    labels: data.map(item => item.week),
    datasets: [
      {
        label: '週間学習時間',
        data: data.map(item => item.minutes),
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y || 0
            const hours = Math.floor(value / 60)
            const minutes = value % 60
            return hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            const hours = Math.floor(value / 60)
            return hours > 0 ? `${hours}h` : `${value}m`
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>週別学習時間の推移</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}