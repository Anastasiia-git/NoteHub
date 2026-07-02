"use client";

import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Note, NoteTag } from "@/types/note";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

interface NoteListProps {
  notes: Note[];
}

const TAG_CLASS_NAMES: Record<NoteTag, string> = {
  Todo: "tagTodo",
  Work: "tagWork",
  Personal: "tagPersonal",
  Meeting: "tagMeeting",
  Shopping: "tagShopping",
};

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Delete this note?")) return;

    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.cardHeader}>
            <span className={`${css.tag} ${css[getTagClassName(note.tag)]}`}>
              {note.tag}
            </span>
          </div>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <time className={css.date} dateTime={note.createdAt}>
              {formatNoteDate(note.createdAt)}
            </time>
            <Link href={`/notes/${note.id}`} className={css.link}>
              <Eye size={17} aria-hidden="true" />
              <span className={css.actionText}>View</span>
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
              className={css.button}
              aria-label={
                deletingId === note.id
                  ? `Deleting ${note.title}`
                  : `Delete ${note.title}`
              }
            >
              <Trash2 size={17} aria-hidden="true" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getTagClassName(tag: NoteTag) {
  return TAG_CLASS_NAMES[tag];
}
