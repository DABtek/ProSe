import prisma from "@/lib/prisma";
import { DEMO_CASE_ID, PROSE_DEMO_MODE } from "@/lib/runtimeMode";

type ActiveCase = {
  id: string;
  userId: string;
  name: string;
  caseNumber: string | null;
  state: string | null;
  county: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getOrCreateActiveCase(userId: string): Promise<ActiveCase> {
  if (PROSE_DEMO_MODE) {
    const now = new Date();
    return {
      id: DEMO_CASE_ID,
      userId,
      name: "Johnson v. Johnson",
      caseNumber: "24-2-01984-5",
      state: "Washington",
      county: "Pierce County",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
  }

  const active = await prisma.case.findFirst({
    where: {
      userId,
      isActive: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (active) {
    return active;
  }

  return prisma.case.create({
    data: {
      userId,
      name: "New Family Case",
      state: "Washington",
      county: "Pierce County",
      isActive: true,
    },
  });
}
