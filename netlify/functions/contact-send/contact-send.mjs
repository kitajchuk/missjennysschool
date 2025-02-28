import { createTransport } from "nodemailer";

const { TURNSTILE_SECRET_KEY, SMTP_USERNAME, SMTP_PASSWORD, SMTP_ENABLED } =
  process.env;

export default async (request) => {
  const body = await request.json();
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

  if (SMTP_ENABLED === "false") {
    return Response.json({
      success: true,
      smtp_enabled: false,
    });
  }

  if (!SMTP_USERNAME || !SMTP_PASSWORD) {
    throw new Error("SMTP credentials not found", {
      cause: ["SMTP_USERNAME", "SMTP_PASSWORD"],
    });
  }

  try {
    const name = body.name;
    const email = body.email;
    const children = body.children;
    const message = body.message;

    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: SMTP_USERNAME,
      replyTo: email,
      subject: "Re: MJS website contact",
      text: `
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

    console.log("Message sent: %s", info.messageId);

    return Response.json({
      success: true,
    });
  } catch (error) {
    throw new Error("Failed to send email", {
      cause: [error],
    });
  }
};
