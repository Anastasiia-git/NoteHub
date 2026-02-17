import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesFilteredClient from "./Notes.client";

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filter = params.slug?.[0] ?? "all";
  const filterLabel =
    filter === "all"
      ? "All notes"
      : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} notes`;

  const title = `Notes — ${filterLabel} | NoteHub`;
  const description =
    filter === "all"
      ? "Browse all notes in NoteHub. Use filters and search to quickly find what you need."
      : `Browse ${filterLabel.toLowerCase()} in NoteHub. Use search to quickly find notes by keyword.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://note-hub-drab.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub — ${filterLabel}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const filter = slug?.[0] ?? "all";
  const tag = filter === "all" ? undefined : filter;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes({ tag, search: "", page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilteredClient tag={tag} />
    </HydrationBoundary>
  );
}
