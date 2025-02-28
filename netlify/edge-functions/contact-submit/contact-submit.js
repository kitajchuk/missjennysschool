import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const SMTP_USERNAME = Deno.env.get("SMTP_USERNAME");
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD");
const SMTP_SEND_EMAIL = Deno.env.get("SMTP_SEND_EMAIL");

export default async (request) => {
  const body = await request.json();

  const name = body.name;
  const email = body.email;
  const children = body.children;
  const message = body.message;
  const token = body["cf-turnstile-response"];

  const formData = new FormData();
  formData.append("secret", TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );

  const outcome = await result.json();

  if (!outcome.success) {
    throw new Error("Turnstile verification failed", {
      cause: outcome["error-codes"],
    });
  }

  if (SMTP_SEND_EMAIL === "false") {
    return Response.json({
      success: true,
    });
  }

  if (!SMTP_USERNAME || !SMTP_PASSWORD) {
    throw new Error("SMTP credentials not found", {
      cause: ["SMTP_USERNAME", "SMTP_PASSWORD"],
    });
  }

  try {
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: SMTP_USERNAME,
          password: SMTP_PASSWORD,
        },
      },
    });

    await client.send({
      from: email,
      to: SMTP_USERNAME,
      subject: "Re: MJS website contact",
      content: `
Name:
${name}

Email:
${email}

Children:
${children}

Message:
${message}
`,
    });

    await client.close();

    return Response.json({
      success: true,
    });
  } catch (error) {
    throw new Error("Failed to send email", {
      cause: [error],
    });
  }
};
