"use client";

import { useState } from "react";

interface FormData {
  name: string;
  company: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setForm({ name: "", company: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Произошла ошибка");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Заявка отправлена!</h3>
        <p className="text-slate-500">
          Мы свяжемся с вами в течение 30 минут в рабочее время.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-accent hover:text-accent-dark font-medium transition-colors"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Иван Иванов"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
            Компания
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="ООО «Ваша Компания»"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          Телефон <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
          placeholder="+998 90 123-45-67"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={handleChange}
          placeholder="Расскажите о вашей задаче: что нужно оформить, откуда/куда, примерный объём..."
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{errorMsg || "Произошла ошибка. Попробуйте позже."}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-accent text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Отправка...
          </>
        ) : (
          "Отправить заявку"
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}
