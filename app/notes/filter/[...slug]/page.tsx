import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilteredClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

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

//----------
