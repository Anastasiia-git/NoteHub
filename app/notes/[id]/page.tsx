import { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    const description =
      note.content?.slice(0, 120) || "Read this note on NoteHub.";

    return {
      title: `Note: ${note.title} | NoteHub`,
      description,

      openGraph: {
        title: `Note: ${note.title}`,
        description,
        url: `https://note-hub-drab.vercel.app/notes/${params.id}`,
        siteName: "NoteHub",

        images: [
          {
            url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],

        type: "article",
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note does not exist or was removed.",
    };
  }
}

export default function NoteDetailsPage() {
  return <NoteDetailsClient />;
}
