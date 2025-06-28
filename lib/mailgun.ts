export async function sendMailgunEmail({
  to,
  subject,
  html,
  text,
  from = `My Pathshaala <${process.env.MAILGUN_FROM_ADDRESS}>`,
}: {
  to: string
  subject: string
  html: string
  text: string
  from?: string
}): Promise<{ success: boolean; error?: string }> {
  const domain = process.env.MAILGUN_DOMAIN
  const apiKey = process.env.AUTH_MAILGUN_KEY

  if (!domain || !apiKey || !from) {
    return { success: false, error: "Missing Mailgun configuration" }
  }

  const form = new FormData()
  form.append("from", from)
  form.append("to", to)
  form.append("subject", subject)
  form.append("html", html)
  form.append("text", text)

  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
    },
    body: form,
  })

  if (!response.ok) {
    const errorText = await response.text()
    return { success: false, error: errorText }
  }

  return { success: true }
}