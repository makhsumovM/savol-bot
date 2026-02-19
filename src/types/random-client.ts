import type { StaticImageData } from 'next/image'

export type RandomMode = 'frontend' | 'backend' | 'mobile'

export type RandomSpecificTopic =
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

export type RandomTopicValue = 'all' | RandomSpecificTopic

export type RandomTopicOption = {
  value: RandomTopicValue
  label: string
  icon?: StaticImageData
}

export const RANDOM_DEFAULT_TOPIC_BY_MODE: Record<RandomMode, RandomTopicValue> = {
  frontend: 'all',
  backend: 'csharp',
  mobile: 'all',
}