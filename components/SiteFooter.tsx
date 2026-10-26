import styles from "./SiteChrome.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <p className={styles.colophon}>
          Wroot Press is the publishing imprint of Wroot Labs. Named for{" "}
          <a href="https://en.wikipedia.org/wiki/Wroot" rel="noopener">
            Wroot
          </a>
          , the Lincolnshire fen-edge village where the Wesley family lived in
          the early eighteenth century.
        </p>
        <p className={styles.colophonMeta}>
          © {new Date().getFullYear()} Wroot Labs ·{" "}
          <a href="https://wrootlabs.com" rel="noopener">
            wrootlabs.com
          </a>{" "}
          ·{" "}
          <a href="https://methodisthistory.substack.com" rel="noopener">
            History of Methodism newsletter
          </a>
        </p>
      </div>
    </footer>
  );
}
