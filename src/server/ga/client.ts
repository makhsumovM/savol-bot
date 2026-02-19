import { GoogleAuth } from 'google-auth-library'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const auth = new GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GA_PROJECT_ID,
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
})

export const analyticsClient = new BetaAnalyticsDataClient({ auth })