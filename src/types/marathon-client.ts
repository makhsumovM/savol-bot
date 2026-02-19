import type { StaticImageData } from 'next/image'

export const MARATHON_DIFFICULTIES = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const

export type MarathonDifficulty = (typeof MARATHON_DIFFICULTIES)[number]
export type MarathonMode = 'frontend' | 'backend' | 'mobile'

export type MarathonSpecificTopic =
  | 'js'
  | 'ts'
  | 'htmlcss'
  | 'react'
  | 'nextjs'
  | 'react-nextjs'
  | 'dart-flutter'
  | 'kotlin'
  | 'react-native'
  | 'swift'
  | 'java'
  | 'python'
  | 'csharp'
  | 'dotnet'
  | 'aspnet'
  | 'ef'
  | 'linq'
  | 'dapper'
  | 'grpc'
  | 'signalr'
  | 'serilog'
  | 'xunit'

export type MarathonTopicValue = 'all' | MarathonSpecificTopic

export type MarathonTopicOption = {
  value: MarathonTopicValue
  label: string
  icon?: StaticImageData
}

export const MARATHON_DEFAULT_TOPIC_BY_MODE: Record<MarathonMode, MarathonTopicValue> = {
  frontend: 'all',
  backend: 'csharp',
  mobile: 'all',
}

export const MARATHON_LOCAL_STORAGE_KEYS = {
  frontend: 'marathon_best_frontend',
  backend: 'marathon_best_backend',
  mobile: 'marathon_best_mobile',
} as const
