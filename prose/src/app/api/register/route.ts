import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid registration payload." },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Account already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  await prisma.case.create({
    data: {
      userId: user.id,
      name: "New Family Case",
      state: "Washington",
      county: "Pierce County",
      isActive: true,
    },
  });

  return NextResponse.json({
    ok: true,
  });
}
