"use client";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { display, profile } from "@/data/portfolio";

export function ContactApp() {
  const [status, setStatus] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\nReply to: ${d.get("email")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app is ready to send the message.");
  }

  const links = [
    { icon: "mail", text: profile.email, href: `mailto:${profile.email}`, color: "text-blue-500" },
    { icon: "github", text: display.github, href: profile.github, color: "" },
    { icon: "linkedin", text: display.linkedin, href: profile.linkedin, color: "text-blue-500" },
  ];

  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-5 overflow-auto p-5 sm:grid-cols-2">
      <div>
        <h2 className="text-xl font-bold heading">Let&apos;s Connect</h2>
        <p className="mt-2 text-[13px] leading-relaxed muted">
          I&apos;m always open to discussing new opportunities, collaborating on exciting projects, or just having a chat about tech.
        </p>
        <ul className="mt-4 space-y-3 text-[13px]">
          {links.map((l) => (
            <li key={l.text}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 text-slate-700 transition hover:text-blue-500 dark:text-slate-200">
                <Icon name={l.icon} className={`h-5 w-5 ${l.color}`} />
                <span className="truncate">{l.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={submit} className="flex min-h-0 flex-col gap-2.5">
        <input name="name" required placeholder="Your Name" aria-label="Your name" className="field h-10" />
        <input name="email" type="email" required placeholder="Your Email" aria-label="Your email" className="field h-10" />
        <textarea name="message" required placeholder="Message" aria-label="Message" className="field min-h-16 flex-1 resize-none py-2.5" />
        <button type="submit" className="btn-primary h-10"><Icon name="send" className="h-4 w-4" /> Send Message</button>
        <p role="status" className="min-h-4 text-center text-[11px] muted">{status}</p>
      </form>
    </div>
  );
}
