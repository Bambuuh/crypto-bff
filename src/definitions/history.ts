export const name = 'History'
export const definition = `
  type ${name} {
    time_period_start: String,
    time_period_end: String,
    time_open: String,
    time_close: String,
    price_open: Float,
    price_high: Int,
    price_low: Float,
    price_close: Float,
    volume_traded: Float,
    trades_count: Int
  }
`
