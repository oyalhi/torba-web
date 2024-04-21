import Image from "next/image";
import styles from "./hero.module.scss";

interface HeroProps {
  image: string;
  title: string;
  text: string;
  isReverse?: boolean;
}

export function Hero({ image, title, text, isReverse }: HeroProps) {
  return (
    <div className={`${styles.root} ${isReverse ? "bg-cyan-900 text-slate-50" : "bg-cyan-50 text-slate-900"}`}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            style={{ boxShadow: "0 0px 15px 6px rgba(0, 0, 0, 0.3)" }}
            alt="hero"
            src={image}
            className="shadow-2xl rounded-4xl"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.textContainer}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
