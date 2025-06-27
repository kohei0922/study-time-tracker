'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DailyStats {
  date: string
  minutes: number
}

interface DailyChartProps {
  data: DailyStats[]
}

export function DailyChart({ data }: DailyChartProps) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: '学習時間（分）',
        data: data.map(item => item.minutes),
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: 1,
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
            return value + '分'
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>過去7日間の学習時間</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}