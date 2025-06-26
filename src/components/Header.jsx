import styles from './Header.module.css';
import { Brain  } from 'lucide-react';

export function Header() {
  return (
    <header className={styles.header}>
      <Brain  className={styles.icon} />
      <h1 className={styles.title}>Foco, Força, Fé e Disciplina</h1>
    </header>
  );
}
