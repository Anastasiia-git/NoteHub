"use client";

import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Delete this note?")) return;
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
              disabled={deleteMutation.isPending}
              className={css.button}
              aria-label={`Delete ${note.title}`}
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

function getTagClassName(tag: string) {
  const normalizedTag = tag.toLowerCase();

  if (normalizedTag === "personal") return "tagPersonal";
  if (normalizedTag === "meeting") return "tagMeeting";
  if (normalizedTag === "shopping") return "tagShopping";
  if (normalizedTag === "todo") return "tagTodo";

  return "tagWork";
}
