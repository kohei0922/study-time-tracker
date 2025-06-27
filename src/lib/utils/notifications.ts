export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192x192.png', // アプリアイコンのパスに変更してください
      badge: '/icon-192x192.png',
      ...options
    })
  }
}

export function scheduleStudyReminder(time: string) {
  // 実装例: 指定時刻に通知を送る
  const [hours, minutes] = time.split(':').map(Number)
  const now = new Date()
  const scheduledTime = new Date()
  scheduledTime.setHours(hours, minutes, 0, 0)

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1)
  }

  const timeout = scheduledTime.getTime() - now.getTime()

  setTimeout(() => {
    showNotification('勉強の時間です！', {
      body: '今日の学習目標を達成しましょう',
      tag: 'study-reminder',
      requireInteraction: true
    })
  }, timeout)
}