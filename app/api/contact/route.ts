import { NextRequest, NextResponse } from "next/server";

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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json(
      { error: "Сервис временно недоступен" },
      { status: 500 }
    );
  }

  const text = [
    "🔔 *Новая заявка с сайта*",
    "",
    `👤 *Имя:* ${name}`,
    `🏢 *Компания:* ${company || "не указана"}`,
    `📞 *Телефон:* ${phone}`,
    `💬 *Сообщение:* ${message || "не указано"}`,
  ].join("\n");

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const telegramRes = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!telegramRes.ok) {
    const err = await telegramRes.json();
    console.error("Telegram API error:", err);
    return NextResponse.json(
      { error: "Ошибка отправки сообщения" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
