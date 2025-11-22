import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";
import type { CSSProperties } from "react";

interface props{
  scale: number
}

export default function ThemeToggle({scale}: props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.switch} style={{"--scale": `${scale}`} as CSSProperties}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span className={styles.slider}>
        <span className={styles.iconWrapper}>
          {theme === "light" ? (
            <Sun size={16} className={`${styles.icon} ${styles.sun}`} />
          ) : (
            <Moon size={16} className={`${styles.icon} ${styles.moon}`} />
          )}
        </span>
      </span>
    </label>
  );
}
