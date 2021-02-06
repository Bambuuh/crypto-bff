import axios from 'axios'
import { config } from '../constants'
import { SymbolId } from './types'

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

export async function getHistory({ assetId }: { assetId: string }) {
  var aYearAgo = new Date()
  aYearAgo.setFullYear(aYearAgo.getFullYear() - 1)
  const { data } = await axiosClient.get(
    `/v1/ohlcv/${assetId}/USD/history?period_id=1MTH&time_start=${aYearAgo.toISOString()}`
  )
  return data
}
