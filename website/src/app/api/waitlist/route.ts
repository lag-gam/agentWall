// In-memory waitlist store (use a database in production)
const waitlist = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim()?.toLowerCase();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (waitlist.has(email)) {
      return Response.json(
        { message: "You're already on the list! We'll be in touch." },
        { status: 200 }
      );
    }

    waitlist.add(email);

    console.log(`[waitlist] New signup: ${email} (total: ${waitlist.size})`);

    return Response.json(
      {
        message: "You're on the list! We'll reach out when early access opens.",
        position: waitlist.size,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

export async function GET() {
  return Response.json({ count: waitlist.size });
}
