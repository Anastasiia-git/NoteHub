"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {isLoading && <p className={css.status}>Loading, please wait...</p>}
        {isError && <p className={css.status}>Something went wrong.</p>}

        {!isLoading && !isError && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>
              <button
                type="button"
                className={css.closeBtn}
                onClick={() => router.back()}
                aria-label="Close"
              >
                ← Back
              </button>
            </div>

            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>

            <p className={css.date}>
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
