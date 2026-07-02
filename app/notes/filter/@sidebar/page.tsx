"use client";

import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTE_TAGS } from "@/types/note";

export default function SidebarNotes() {
  const pathname = usePathname();
  const active = getActiveFilter(pathname);

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          className={`${css.menuLink} ${active === "all" ? css.active : ""}`}
          aria-current={active === "all" ? "page" : undefined}
        >
          All notes
        </Link>
      </li>

      {NOTE_TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${
              active === tag.toLowerCase() ? css.active : ""
            }`}
            aria-current={active === tag.toLowerCase() ? "page" : undefined}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function getActiveFilter(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const filter = segments[segments.length - 1] ?? "all";

  return decodeURIComponent(filter).toLowerCase();
}
