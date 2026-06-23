import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - fetch saved colleges for logged in user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
  });

  return NextResponse.json(saved.map(s => s.college));
}

// POST - save a college
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collegeId } = await request.json();

  try {
    await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
    });
    return NextResponse.json({ message: 'College saved' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Already saved' }, { status: 400 });
  }
}

// DELETE - unsave a college
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collegeId } = await request.json();

  await prisma.savedCollege.deleteMany({
    where: {
      userId: session.user.id,
      collegeId,
    },
  });

  return NextResponse.json({ message: 'College unsaved' });
}