import {NextResponse} from 'next/server'
import {getTotalUsers} from '@/server/ga/getTotalUsers'

export async function GET() {
  const totalUsers = await getTotalUsers()
  return NextResponse.json({totalUsers})
}