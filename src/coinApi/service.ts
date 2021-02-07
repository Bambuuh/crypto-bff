import axios from 'axios'
import { config } from '../constants'
import moment from 'moment'

const axiosClient = axios.create({
  baseURL: 'https://rest.coinapi.io',
  headers: {
    'X-CoinAPI-Key': config.coinApiKey,
  },
})

export async function getCoins() {
  const { data } = await axiosClient.get('/v1/assets')
  return data
}

export async function getIcons() {
  const { data } = await axiosClient.get('/v1/assets/icons/small')
  return data
}

function mapPeriod(period: string) {
  const res: { period: string; start: string } = {
    period: '',
    start: '',
  }
  const now = moment()
  switch (period.toLowerCase()) {
    case 'hour':
      res.period = '10MIN'
      res.start = now.subtract(1, 'hour').toISOString()
      break
    case 'day':
      res.period = '2HRS'
      res.start = now.subtract(1, 'day').toISOString()
      break
    case 'week':
      res.period = '1DAY'
      res.start = now.subtract(1, 'week').toISOString()
      break
    case 'month':
      res.period = '3DAY'
      res.start = now.subtract(1, 'month').toISOString()
      break
    case '1year':
      res.period = '1MTH'
      res.start = now.subtract(1, 'year').toISOString()
      break
    case '5year':
      res.period = '6MTH'
      res.start = now.subtract(5, 'year').toISOString()
      break
    default:
      res.period = '1YRS'
      res.start = now.subtract(20, 'years').toISOString()
      break
  }
  return res
}

export async function getHistory({
  assetId,
  period,
}: {
  assetId: string
  period: string
}) {
  const res = mapPeriod(period)
  const { data } = await axiosClient.get(
    `/v1/ohlcv/${assetId}/USD/history?period_id=${res.period}&time_start=${res.start}`
  )
  return data
}
