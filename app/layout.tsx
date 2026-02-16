import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub — a clean and efficient note-taking app to organize your ideas and stay productive.",

  openGraph: {
    title: "NoteHub — Simple Note Manager",
    description:
      "Create, organize, and access your notes with a clean and fast interface.",

    url: "https://notehub.app",

    siteName: "NoteHub",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub — Simple Note Manager",
    description:
      "Create, organize, and manage your notes with a clean interface.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <div id="modal-root" />
          <footer>
            <Footer />
          </footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
