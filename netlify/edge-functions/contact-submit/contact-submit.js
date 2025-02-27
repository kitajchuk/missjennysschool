const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

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

  return Response.json({
    name,
    email,
    children,
    message,
  });
};
