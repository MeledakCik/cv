// app/api/clan/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://www.pointblank.id/clan/detail?div=2&env=c0g2TkxCOWZqMStTUDhHQWVCT3E1dTNuaW9aRnNteTY1eTVNaDZ3V1BKdk5hdU9BQjBnNEtEYU9hcTRmUERRdQ==';

  try {
    const response = await fetch(url, {
      method: 'POST', // Gunakan POST sesuai header curl kamu
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-G981B)',
      },
      next: { revalidate: 3600 } 
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clan data' }, { status: 500 });
  }
}