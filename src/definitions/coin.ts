export const name = 'Coin'
export const definition = `
 type ${name} { 
  asset_id: ID!
  name: String
  type_is_crypto: Int
  data_start: String
  data_end: String
  data_quote_start: String
  data_quote_end: String
  data_orderbook_start: String
  data_orderbook_end: String
  data_trade_start: String
  data_trade_end: String
  data_symbols_count: Int
  volume_1hrs_usd: Int
  volume_1day_usd: Int
  volume_1mth_usd: Int
  id_icon: String
}
`
