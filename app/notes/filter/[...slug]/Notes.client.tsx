"use client";

import css from "./NotesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { fetchNotes } from "@/lib/api";

export default function NotesFilteredClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, search, page],
    queryFn: () => fetchNotes({ tag, search, page }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];

  const onChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={onChange} />

        <div className={css.paginationWrap}>
          {data && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>

        <button onClick={() => setModal(true)} className={css.createBtn}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {modal && (
        <Modal onClose={() => setModal(false)}>
          <NoteForm onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
}
