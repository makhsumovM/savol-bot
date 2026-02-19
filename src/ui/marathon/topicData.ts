import type { MarathonMode, MarathonTopicOption } from '@/types/marathon-client'
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

interface MarathonTopicTheme {
  topicIcon: StaticImageData
  topicActiveShadow: string
  topicActiveBorder: string
  topicActiveFill: string
  topicActiveGlow: string
  topicHoverGlow: string
  topicPanelGlow: string
  topicPanelGradient: string
}

const frontendTopics: MarathonTopicOption[] = [
  { value: 'all', label: 'All', icon: reactIcon },
  { value: 'js', label: 'JavaScript', icon: jsIcon },
  { value: 'ts', label: 'TypeScript', icon: tsIcon },
  { value: 'htmlcss', label: 'HTML + CSS', icon: htmlcssIcon },
  { value: 'react', label: 'React', icon: reactIcon },
  { value: 'nextjs', label: 'Next.js', icon: nextjsIcon },
  { value: 'react-nextjs', label: 'React + Next.js', icon: reactNextjsIcon },
]

const mobileTopics: MarathonTopicOption[] = [
  { value: 'all', label: 'All', icon: mobileIcon },
  { value: 'dart-flutter', label: 'Dart / Flutter', icon: mobileIcon },
  { value: 'kotlin', label: 'Kotlin', icon: kotlinIcon },
  { value: 'react-native', label: 'React Native', icon: reactIcon },
  { value: 'swift', label: 'Swift', icon: swiftIcon },
  { value: 'java', label: 'Java', icon: javaIcon },
  { value: 'python', label: 'Python', icon: pythonIcon },
]

const backendTopics: MarathonTopicOption[] = [
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

const marathonTopicThemes: Record<MarathonMode, MarathonTopicTheme> = {
  frontend: {
    topicIcon: reactIcon,
    topicActiveShadow: 'shadow-primary/30',
    topicActiveBorder: 'border-primary/60',
    topicActiveFill: 'bg-primary',
    topicActiveGlow: 'bg-linear-to-r from-primary/40 via-primary/20 to-primary/40',
    topicHoverGlow: 'bg-linear-to-r from-primary/10 via-primary/5 to-transparent',
    topicPanelGlow: 'bg-primary/15',
    topicPanelGradient: 'from-primary/12 via-transparent to-primary/5',
  },
  backend: {
    topicIcon: charmIcon,
    topicActiveShadow: 'shadow-primary-2/30',
    topicActiveBorder: 'border-primary-2/60',
    topicActiveFill: 'bg-primary-2',
    topicActiveGlow: 'bg-linear-to-r from-primary-2/40 via-primary-2/20 to-primary-2/40',
    topicHoverGlow: 'bg-linear-to-r from-primary-2/10 via-primary-2/5 to-transparent',
    topicPanelGlow: 'bg-primary-2/15',
    topicPanelGradient: 'from-primary-2/12 via-transparent to-primary-2/5',
  },
  mobile: {
    topicIcon: reactIcon,
    topicActiveShadow: 'shadow-purple-500/40',
    topicActiveBorder: 'border-purple-500/70',
    topicActiveFill: 'bg-gradient-to-r from-purple-600 to-purple-500',
    topicActiveGlow: 'bg-linear-to-r from-purple-500/50 via-purple-400/25 to-purple-500/50',
    topicHoverGlow: 'bg-linear-to-r from-purple-500/15 via-purple-400/8 to-transparent',
    topicPanelGlow: 'bg-purple-500/20',
    topicPanelGradient: 'from-purple-500/15 via-transparent to-purple-400/6',
  },
}

export const MARATHON_MODE_ICON_BY_MODE: Record<MarathonMode, StaticImageData> = {
  frontend: reactIcon,
  backend: charmIcon,
  mobile: mobileIcon,
}

export const getMarathonTopicOptions = (
  mode: MarathonMode,
  allTopicsLabel: string,
): MarathonTopicOption[] => {
  const source = mode === 'frontend' ? frontendTopics : mode === 'backend' ? backendTopics : mobileTopics

  return source.map((option) => ({
    ...option,
    label: option.value === 'all' ? allTopicsLabel : option.label,
  }))
}

export const getMarathonTopicTheme = (mode: MarathonMode): MarathonTopicTheme => {
  return marathonTopicThemes[mode]
}