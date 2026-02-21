import { analyticsClient } from './client'

export async function getUsersOnline() {
  const propertyId = process.env.GA_PROPERTY_ID
  const [response] = await analyticsClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    metrics: [{ name: 'activeUsers' }],
  })

  return Number(response.rows?.[0]?.metricValues?.[0]?.value || 0)
}
