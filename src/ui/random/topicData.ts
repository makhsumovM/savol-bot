import type { RandomMode, RandomTopicOption } from '@/types/random-client'
import type { StaticImageData } from 'next/image'
import aspnetIcon from '../../../public/aspnet.png'
import charmIcon from '../../../public/ccharm.png'
import dapperIcon from '../../../public/dapper.png'
import entityIcon from '../../../public/entity.png'
import grpcIcon from '../../../public/grc.png'
import htmlcssIcon from '../../../public/html&css.png'
import jsIcon from '../../../public/js.png'
import kotlinIcon from '../../../public/kotlin.png'
import swiftIcon from '../../../public/swift.png'
import javaIcon from '../../../public/java.png'
import pythonIcon from '../../../public/python.png'
import mobileIcon from '../../../public/flutter.png'
import linqIcon from '../../../public/linq.png'
import netIcon from '../../../public/net.png'
import nextjsIcon from '../../../public/nextjs.png'
import reactIcon from '../../../public/react.png'
import reactNextjsIcon from '../../../public/nextjs&react.png'
import serilogIcon from '../../../public/serilog.png'
import signalRIcon from '../../../public/signalR.png'
import tsIcon from '../../../public/ts.png'
import xunitIcon from '../../../public/xunit.png'

interface RandomTopicTheme {
  topicIcon: StaticImageData
  topicActiveShadow: string
  topicActiveBorder: string
  topicActiveFill: string
  topicActiveGlow: string
  topicHoverGlow: string
  topicPanelGlow: string
  topicPanelGradient: string
}

const frontendTopics: RandomTopicOption[] = [
  { value: 'all', label: 'All', icon: reactIcon },
  { value: 'js', label: 'JavaScript', icon: jsIcon },
  { value: 'ts', label: 'TypeScript', icon: tsIcon },
  { value: 'htmlcss', label: 'HTML + CSS', icon: htmlcssIcon },
  { value: 'react', label: 'React', icon: reactIcon },
  { value: 'nextjs', label: 'Next.js', icon: nextjsIcon },
  { value: 'react-nextjs', label: 'React + Next.js', icon: reactNextjsIcon },
]

const mobileTopics: RandomTopicOption[] = [
  { value: 'all', label: 'All', icon: mobileIcon },
  { value: 'dart-flutter', label: 'Dart / Flutter', icon: mobileIcon },
  { value: 'kotlin', label: 'Kotlin', icon: kotlinIcon },
  { value: 'react-native', label: 'React Native', icon: reactIcon },
  { value: 'swift', label: 'Swift', icon: swiftIcon },
  { value: 'java', label: 'Java', icon: javaIcon },
  { value: 'python', label: 'Python', icon: pythonIcon },
]

const backendTopics: RandomTopicOption[] = [
  { value: 'all', label: 'All', icon: netIcon },
  { value: 'csharp', label: 'C#', icon: charmIcon },
  { value: 'dotnet', label: '.NET', icon: netIcon },
  { value: 'aspnet', label: 'ASP.NET', icon: aspnetIcon },
  { value: 'ef', label: 'Entity Framework Core', icon: entityIcon },
  { value: 'linq', label: 'LINQ', icon: linqIcon },
  { value: 'dapper', label: 'Dapper', icon: dapperIcon },
  { value: 'grpc', label: 'gRPC', icon: grpcIcon },
  { value: 'signalr', label: 'SignalR', icon: signalRIcon },
  { value: 'serilog', label: 'Serilog', icon: serilogIcon },
  { value: 'xunit', label: 'xUnit', icon: xunitIcon },
]

const frontendTheme: RandomTopicTheme = {
  topicIcon: reactIcon,
  topicActiveShadow: 'shadow-primary/30',
  topicActiveBorder: 'border-primary/60',
  topicActiveFill: 'bg-primary',
  topicActiveGlow: 'bg-linear-to-r from-primary/40 via-primary/20 to-primary/40',
  topicHoverGlow: 'bg-linear-to-r from-primary/10 via-primary/5 to-transparent',
  topicPanelGlow: 'bg-primary/15',
  topicPanelGradient: 'from-primary/12 via-transparent to-primary/5',
}

const backendTheme: RandomTopicTheme = {
  topicIcon: charmIcon,
  topicActiveShadow: 'shadow-primary-2/30',
  topicActiveBorder: 'border-primary-2/60',
  topicActiveFill: 'bg-primary-2',
  topicActiveGlow: 'bg-linear-to-r from-primary-2/40 via-primary-2/20 to-primary-2/40',
  topicHoverGlow: 'bg-linear-to-r from-primary-2/10 via-primary-2/5 to-transparent',
  topicPanelGlow: 'bg-primary-2/15',
  topicPanelGradient: 'from-primary-2/12 via-transparent to-primary-2/5',
}

export const RANDOM_MODE_ICON_BY_MODE: Record<RandomMode, StaticImageData> = {
  frontend: reactIcon,
  backend: charmIcon,
  mobile: mobileIcon,
}

export const getRandomTopicOptions = (
  mode: RandomMode,
  allTopicsLabel: string,
): RandomTopicOption[] => {
  const source = mode === 'frontend' ? frontendTopics : mode === 'backend' ? backendTopics : mobileTopics

  return source.map((option) => ({
    ...option,
    label: option.value === 'all' ? allTopicsLabel : option.label,
  }))
}

export const getRandomTopicTheme = (mode: RandomMode): RandomTopicTheme => {
  return mode === 'frontend' ? frontendTheme : backendTheme
}