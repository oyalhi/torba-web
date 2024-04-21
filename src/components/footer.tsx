import { appConfig } from "../utils/app-config";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={`${styles.footer} text-slate-50`}>
      <div className={styles.container}>
        <h3 className={styles.title}>Torba Split Cost</h3>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Yalhi Software Solutions Inc. All rights reserved.
        </p>
      </div>
      <div className={styles.container}>
        <h3 className={styles.infoTitle}>Company</h3>
        <ul className={styles.list}>
          <li>
            <a href={appConfig.legal.privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
