'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SubjectStats {
  subjectName: string
  subjectColor: string
  totalMinutes: number
  percentage: number
}

interface SubjectChartProps {
  data: SubjectStats[]
}

export function SubjectChart({ data }: SubjectChartProps) {
  const chartData = {
    labels: data.map(item => item.subjectName),
    datasets: [
      {
        data: data.map(item => item.totalMinutes),
        backgroundColor: data.map(item => item.subjectColor),
        borderColor: data.map(item => item.subjectColor),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed || 0
            const hours = Math.floor(value / 60)
            const minutes = value % 60
            const timeStr = hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`
            return `${label}: ${timeStr} (${context.dataset.data[context.dataIndex]}分)`
          },
        },
      },
    },
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>科目別学習時間</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-gray-500">
          データがありません
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>科目別学習時間</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Pie data={chartData} options={options} />
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.subjectColor }}
                />
                <span>{item.subjectName}</span>
              </div>
              <span className="text-gray-600">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}