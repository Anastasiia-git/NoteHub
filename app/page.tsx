import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Plus,
  RefreshCcw,
  Route,
  Save,
} from "lucide-react";
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
    <main className={css.container}>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <p className={css.label}>
            <FileText size={16} aria-hidden="true" />
            Personal note manager
          </p>
          <h1 className={css.title}>NoteHub</h1>
          <p className={css.text}>
            <span className={css.textLine}>
              Create, search, filter, and delete notes
            </span>{" "}
            <span className={css.textLine}>
              in a clean Next.js app with saved drafts
            </span>{" "}
            <span className={css.textLine}>and fast data updates.</span>
          </p>
          <div className={css.actions}>
            <Link href="/notes/filter/all" className={css.primaryLink}>
              Open notes
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link href="/notes/action/create" className={css.secondaryLink}>
              Create note
              <Plus size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={css.heroVisual} aria-hidden="true">
          <Image
            src="/heroLight.webp"
            alt=""
            width={748}
            height={526}
            className={css.heroImage}
            priority
          />
        </div>
      </section>

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
    </main>
  );
}
