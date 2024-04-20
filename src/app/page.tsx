"use client";

import { useEffect, useState } from "react";
import { Hero } from "../components/hero";
import { appConfig } from "../utils/app-config";
import { heros } from "./data/heros";
import styles from "./page.module.scss";

export default function Home() {
  // state
  const [isClient, setIsClient] = useState(false);

  // effects
  useEffect(() => {
    setIsClient(true);
  }, []);

  // render
  return (
    <main className={styles.root}>
      <div className={`${styles.intro} text-slate-300`}>
        <div className={styles.largeHidden}>
          <h1 className={styles.title}>Split expenses quickly and easily, online or offline</h1>
          <p className={styles.text}>
            &quot;Torba Split Cost&quot; is your go-to free tool for managing shared expenses with friends and family
            effortlessly.
          </p>
        </div>
        <div className={styles.iframeContainer}>
          <iframe
            className={styles.iframe}
            id="player"
            width="299"
            height="651"
            src="https://www.youtube.com/embed/4ZCQGkUnbzw?rel=0&autohide=1&showinfo=0&wmode=opaque"
            title="Torba Split Cost Demo"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.smallHidden}>
            <h1 className={styles.title}>Split expenses quickly and easily, online or offline</h1>
            <p className={styles.text}>
              &quot;Torba Split Cost&quot; is your go-to free tool for managing shared expenses with friends and family
              effortlessly.
            </p>
          </div>
          <div className={styles.tryNow}>
            <p className={styles.text}>
              <strong>Free to try – no credit card or registration required.</strong>
            </p>
            <a href={appConfig.clientUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md">
              Try Now
            </a>
          </div>
        </div>
      </div>

      {heros.map((props, index) => (
        <Hero key={`${index}:${props.image}`} {...props} />
      ))}
    </main>
  );
}
