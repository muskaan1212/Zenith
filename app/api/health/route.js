import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Zenith Healthcare API running',
    port: 3000,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    routes: [
      { path: '/api/appointments', method: 'GET, POST', records: 3 },
      { path: '/api/records',      method: 'GET, POST', records: 0 },
      { path: '/api/feedback',     method: 'GET, POST', records: 2 },
    ],
  })
}
