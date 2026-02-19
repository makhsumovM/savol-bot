import {analyticsClient} from './client'

export async function getTotalUsers() {
  const propertyId = process.env.GA_PROPERTY_ID
  if (!propertyId) throw new Error('GA_PROPERTY_ID is missing')
  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{startDate: '2015-08-14', endDate: 'today'}],
    metrics: [{name: 'sessions'}],
  })
  const value = response.rows?.[0]?.metricValues?.[0]?.value
  return Number(value ?? 0)
}