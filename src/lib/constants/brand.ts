// Studyminus Brand Constants

export const BRAND_COLORS = {
  primary: '#8B1A1A',      // 深い赤
  secondary: '#1A1A1A',    // ほぼ黒
  accent: '#DC2626',       // 明るい赤
  background: '#FAFAFA',   // オフホワイト
  text: '#0A0A0A',         // ソフトブラック
  surface: '#FFFFFF',      // 純白
  muted: '#6B7280',        // グレー
  border: '#E5E7EB',       // ライトグレー
} as const

export const BRAND_GRADIENTS = {
  primary: 'bg-gradient-to-r from-red-600 to-red-700',
  secondary: 'bg-gradient-to-r from-gray-800 to-gray-900',
  accent: 'bg-gradient-to-r from-red-500 to-red-600',
  hero: 'bg-gradient-to-br from-red-50 via-red-25 to-white',
} as const

export const BRAND_SHADOWS = {
  subtle: 'shadow-sm',
  card: 'shadow-md hover:shadow-lg',
  float: 'shadow-lg hover:shadow-xl',
  glow: 'shadow-red-200/50',
} as const

export const BRAND_ANIMATIONS = {
  scale: 'hover:scale-105 transition-transform duration-200',
  float: 'hover:-translate-y-1 transition-transform duration-200',
  glow: 'hover:shadow-lg hover:shadow-red-200/50 transition-shadow duration-200',
} as const

export const BRAND_FONTS = {
  primary: "'Plus Jakarta Sans', sans-serif",
  mono: "'Roboto Mono', monospace",
  fallback: "system-ui, sans-serif",
} as const