import styles from "./FilterLayout.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <aside className={styles.sidebar}>{sidebar}</aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
