// src/app/api/colleges/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const search = searchParams.get('search') || undefined;
    const location = searchParams.get('location') || undefined;
    const type = searchParams.get('type') || undefined;
    const maxFees = searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : undefined;

    // Direct database query with conditional clause allocations
    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
          location && location !== 'All' ? { location: { contains: location, mode: 'insensitive' } } : {},
          type && type !== 'All' ? { type: type } : {},
          maxFees ? { fees: { lte: maxFees } } : {},
        ]
      },
      include: {
        courses: true
      }
    });

    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Database operations failure' }, { status: 500 });
  }
}