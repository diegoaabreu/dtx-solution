import { NextRequest, NextResponse } from "next/server";

async function getAccessToken(): Promise<string> {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AZURE_CLIENT_ID!,
        client_secret: process.env.AZURE_CLIENT_SECRET!,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  );
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to obtain access token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const token = await getAccessToken();
    const recipient = process.env.CONTACT_EMAIL!;

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${recipient}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: `[DTX Website] New message from ${name}`,
            body: {
              contentType: "HTML",
              content: `
                <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
                  <tr><td style="padding:8px;font-weight:bold;width:140px">Name</td><td style="padding:8px">${name}</td></tr>
                  <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
                  <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service || "—"}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${message || "—"}</td></tr>
                </table>
              `,
            },
            toRecipients: [{ emailAddress: { address: recipient } }],
            replyTo: [{ emailAddress: { address: email, name } }],
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Graph API error:", err);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
