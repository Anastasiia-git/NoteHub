"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { NOTE_TAGS, type CreateNoteDto, type NoteTag } from "@/types/note";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const draft = useNoteDraftStore((s) => s.draft);
  const setDraft = useNoteDraftStore((s) => s.setDraft);
  const clearDraft = useNoteDraftStore((s) => s.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });

      toast.success("Note created");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const createNoteAction = async (formData: FormData) => {
    const tag = String(formData.get("tag") ?? "Todo");

    if (!isNoteTag(tag)) return;

    const values: CreateNoteDto = {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
      tag,
    };

    if (values.title.length < 3 || values.title.length > 50) return;

    await mutation.mutateAsync(values);
  };

  return (
    <form method="post" className={css.form} aria-busy={mutation.isPending}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft.tag}
          onChange={(e) => {
            if (isNoteTag(e.target.value)) {
              setDraft({ tag: e.target.value });
            }
          }}
        >
          {NOTE_TAGS.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>

        <button
          type="submit"
          formAction={createNoteAction}
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>

      {mutation.isError && (
        <span className={css.error}>Failed to create note. Try again.</span>
      )}
    </form>
  );
}

function isNoteTag(value: string): value is NoteTag {
  return NOTE_TAGS.includes(value as NoteTag);
}
