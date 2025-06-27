import { Chart as ChartJS, defaults } from 'chart.js'

// Chart.jsのデフォルト設定
defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
defaults.font.size = 12
defaults.color = '#374151'
defaults.responsive = true
defaults.maintainAspectRatio = false

export function configureChartJS() {
  // 追加の設定があればここに記述
}