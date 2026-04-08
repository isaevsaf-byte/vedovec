import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, phone, message } = body as {
    name?: string;
    company?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Имя и телефон обязательны" },
      { status: 400 }
    );
  }

  const results = await Promise.allSettled([
    sendEmail({ name, company, phone, message }),
    sendTelegram({ name, company, phone, message }),
  ]);

  const emailResult = results[0];
  const telegramResult = results[1];

  // At least one channel must succeed
  if (emailResult.status === "rejected" && telegramResult.status === "rejected") {
    console.error("Both email and telegram failed:", emailResult.reason, telegramResult.reason);
    return NextResponse.json(
      { error: "Ошибка отправки. Позвоните нам напрямую: +998 90 973-30-90" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

async function sendEmail({
  name,
  company,
  phone,
  message,
}: {
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Сайт Vedovec <noreply@vedovec.uz>",
    to: "info@vedovec.uz",
    subject: `Новая заявка с сайта — ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #003399; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">🔔 Новая заявка с сайта vedovec.uz</h2>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; width: 120px;">👤 Имя</td>
              <td style="padding: 12px 0; color: #1a1a2e; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b; font-size: 13px;">🏢 Компания</td>
              <td style="padding: 12px 0; color: #1a1a2e;">${company || "не указана"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b; font-size: 13px;">📞 Телефон</td>
              <td style="padding: 12px 0; color: #1a1a2e; font-weight: 600;">
                <a href="tel:${phone}" style="color: #003399; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;">💬 Сообщение</td>
              <td style="padding: 12px 0; color: #1a1a2e;">${message || "не указано"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 12px 16px; background: #00339920; border-left: 3px solid #003399; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #003399;">
              Заявка получена ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })} (Ташкент)
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

async function sendTelegram({
  name,
  company,
  phone,
  message,
}: {
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) throw new Error("Telegram env vars not set");

  const text = [
    "🔔 *Новая заявка с сайта*",
    "",
    `👤 *Имя:* ${name}`,
    `🏢 *Компания:* ${company || "не указана"}`,
    `📞 *Телефон:* ${phone}`,
    `💬 *Сообщение:* ${message || "не указано"}`,
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Telegram error: ${JSON.stringify(err)}`);
  }
}
