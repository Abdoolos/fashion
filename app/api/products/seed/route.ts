import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  return NextResponse.json({ message: 'Seed not available in demo mode' });
};
