"use client";

import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export default function SidebarNotes() {
  const segment = useSelectedLayoutSegment();
  const active = segment ?? "all";

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          className={`${css.menuLink} ${active === "all" ? css.active : ""}`}
        >
          All notes
        </Link>
      </li>

      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${active === tag ? css.active : ""}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
