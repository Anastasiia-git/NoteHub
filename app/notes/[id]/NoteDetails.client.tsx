"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <button className={css.cancelButton} onClick={handleGoBack}>
        ← Back
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}
