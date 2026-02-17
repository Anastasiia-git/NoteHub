import type { Metadata } from "next";
import Link from "next/link";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NoteHub",

  description:
    "This page does not exist. The link may be broken or the page has been removed.",

  metadataBase: new URL("https://note-hub-drab.vercel.app/"),

  alternates: {
    canonical: "/404",
  },

  openGraph: {
    title: "404 — Page Not Found",
    description:
      "The page you are looking for does not exist or may have been moved.",
    url: "https://note-hub-drab.vercel.app/",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/" className={css.button}>
        Return to home page
      </Link>
    </main>
  );
}
