import { analyticsClient } from './client'

export async function getUsersOnline() {
  const propertyId = process.env.GA_PROPERTY_ID
  if (!propertyId) throw new Error('GA_PROPERTY_ID is missing')
  const [response] = await analyticsClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    metrics: [{ name: 'activeUsers' }],
    minuteRanges: [{ startMinutesAgo: 15, endMinutesAgo: 2 }],
  })

  return (response.rows ?? []).reduce((sum, row) => {
    const value = Number(row.metricValues?.[0]?.value ?? 0)
    return sum + value
  }, 0)
}
