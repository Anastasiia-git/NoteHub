import Hero from "@/components/Hero/Hero";
import { RefreshCcw, Route, Save } from "lucide-react";
import css from "./page.module.css";

const FEATURES = [
  {
    title: "Draft autosave",
    text: "Form progress is stored with Zustand persist and restored after refresh.",
    Icon: Save,
    tone: "violet",
  },
  {
    title: "Smart data sync",
    text: "React Query refreshes notes after create and delete mutations.",
    Icon: RefreshCcw,
    tone: "teal",
  },
  {
    title: "App Router",
    text: "Routes, loading, error, modal, and details pages are split clearly.",
    Icon: Route,
    tone: "blue",
  },
] as const;

export default function Home() {
  return (
    <div className={css.container}>
      <Hero />

      <section className={css.features} aria-label="Project highlights">
        {FEATURES.map(({ title, text, Icon, tone }) => (
          <article className={css.feature} key={title}>
            <span
              className={`${css.featureIcon} ${css[tone]}`}
              aria-hidden="true"
            >
              <Icon size={32} strokeWidth={2.2} />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
