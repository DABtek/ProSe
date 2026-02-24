import { auth } from "@/auth";
import { getOrCreateActiveCase } from "@/lib/caseScope";
import { listDocuments } from "@/lib/documentStore";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activeCase = await getOrCreateActiveCase(userId);
  const documents = await listDocuments({
    userId,
    caseId: activeCase.id,
  });
  return NextResponse.json(documents);
}
