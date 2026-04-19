import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Candidate application endpoint.
 * Intentionally minimal — wire this up to your ATS, CRM, or email provider.
 * Uses multipart form-data so the CV file can be forwarded to storage.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Expected multipart/form-data" },
      { status: 415 },
    );
  }

  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());

  // eslint-disable-next-line no-console
  console.log("[Nexus] received application:", {
    email: payload.email,
    role: payload.role,
  });

  // TODO: forward to Greenhouse / Workable / Slack / email.
  return NextResponse.json({ ok: true }, { status: 200 });
}
