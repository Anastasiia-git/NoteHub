import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";
import css from "./Hero.module.css";

function Hero() {
  return (
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
          className={`${css.heroImage} ${css.heroImageLight}`}
          priority
        />
        <Image
          src="/heroDark.webp"
          alt=""
          width={748}
          height={526}
          className={`${css.heroImage} ${css.heroImageDark}`}
          priority
        />
      </div>
    </section>
  );
}

export default Hero;
