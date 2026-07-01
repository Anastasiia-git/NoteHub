"use client";

import css from "./NotesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { ListFilter, Plus } from "lucide-react";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

export default function NotesFilteredClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, search, page],
    queryFn: () => fetchNotes({ tag, search, page }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const selectedTag = tag ?? "All notes";

  const onChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <section className={css.heading}>
        <span className={css.headingIcon} aria-hidden="true">
          <ListFilter size={34} />
        </span>
        <div>
          <h1>{selectedTag === "All notes" ? "All notes" : selectedTag}</h1>
          <p>Your ideas, thoughts, and plans - all in one place.</p>
        </div>
      </section>

      <header className={css.toolbar}>
        <SearchBox value={search} onChange={onChange} />
        <Link href="/notes/action/create" className={css.createBtn}>
          Create note
          <Plus size={18} aria-hidden="true" />
        </Link>
      </header>

      {data && data.totalPages > 1 && (
        <div className={css.paginationWrap}>
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </div>
      )}

      {isLoading && <p className={css.status}>Loading, please wait...</p>}
      {isError && <p className={css.status}>Something went wrong.</p>}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && !isError && notes.length === 0 && (
        <p className={css.status}>No notes found.</p>
      )}
    </div>
  );
}
