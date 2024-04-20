/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
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
      <Header />
      {/* show youtube player */}

      <div className={`${styles.intro} text-slate-300`}>
        <div
          css={css`
            flex: 1;
            display: flex;
            justify-content: flex-end;
          `}>
          <iframe
            css={css`
              border-radius: 42px;
            `}
            id="player"
            width="299"
            height="651"
            src="https://www.youtube.com/embed/4ZCQGkUnbzw?rel=0&autohide=1&showinfo=0&wmode=opaque"
            title="Torba Split Cost Demo"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div
          css={css`
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}>
          <h1 className="text-5xl font-bold">Split expenses quickly and easily, online or offline</h1>
          <p className="text-xl py-6">
            &quot;Torba Split Cost&quot; is your go-to free tool for managing shared expenses with friends and family
            effortlessly.
          </p>
        </div>
      </div>

      {heros.map((props, index) => (
        <Hero key={`${index}:${props.image}`} {...props} />
      ))}
    </main>
  );
}
