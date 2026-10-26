import Image from "next/image";
import Link from "next/link";
import styles from "./SiteChrome.module.css";

export default function SiteHeader({ linkHome = false }: { linkHome?: boolean }) {
  const mark = (
    <Image
      src="/wordmark.svg"
      alt="Wroot Press"
      width={240}
      height={60}
      priority
      className={styles.wordmark}
    />
  );
  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        {linkHome ? <Link href="/">{mark}</Link> : mark}
      </div>
    </header>
  );
}
