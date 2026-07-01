import Link from "next/link";
import Image from "next/image";
import { Home, NotebookText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import css from "./Header.module.css";

function Header() {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/" className={css.logo} aria-label="NoteHub home">
          <span className={css.logoMark} aria-hidden="true">
            <Image
              src="/favicon.png"
              alt=""
              width={28}
              height={28}
              className={css.logoIcon}
              unoptimized
            />
          </span>
          <span className={css.logoText}>NoteHub</span>
        </Link>

        <div className={css.rightGroup}>
          <nav className={css.nav} aria-label="Main navigation">
            <Link href="/" className={css.navLink}>
              <Home size={19} aria-hidden="true" />
              Home
            </Link>
            <Link href="/notes/filter/all" className={css.navLink}>
              <NotebookText size={19} aria-hidden="true" />
              Notes
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
