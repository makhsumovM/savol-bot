import { getUsersOnline } from '@/server/ga/getUsersOnline'
import { NextResponse } from 'next/server'

export async function GET() {
  const totalUsers = await getUsersOnline()
  return NextResponse.json({ totalUsers })
}
