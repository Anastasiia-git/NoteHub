import css from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={css.container}>
      <section className={css.hero}>
        <p className={css.label}>Personal note manager</p>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.text}>
          Create, search, filter, and delete notes in a clean Next.js app with saved drafts and fast
          data updates.
        </p>
        <Link href="/notes/filter/all" className={css.link}>
          Open notes
        </Link>
      </section>

      <section className={css.features} aria-label="Project highlights">
        <article className={css.feature}>
          <h2>Draft autosave</h2>
          <p>Form progress is stored with Zustand persist and restored after refresh.</p>
        </article>
        <article className={css.feature}>
          <h2>Smart data sync</h2>
          <p>React Query refreshes notes after create and delete mutations.</p>
        </article>
        <article className={css.feature}>
          <h2>App Router</h2>
          <p>Routes, loading, error, modal, and details pages are split clearly.</p>
        </article>
      </section>
    </main>
  );
}
