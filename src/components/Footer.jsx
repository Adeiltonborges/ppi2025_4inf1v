import styles from './Footer.module.css';
import { FacebookIcon, InstagramIcon, GithubIcon, MailIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>IFRN - Campus Macau</p>
        <p>Curso Técnico em Informática</p>
        <p>Programação para Internet 2025</p>
      </div>

      <div className={styles.center}>
        <p>Adeilton Cruz Borges da Silva</p>
      </div>

      <div className={styles.right}>
        <a href="mailto:adeilton.cruz@escolar.ifrn.edu.br">
          <MailIcon className={styles.icon} />
        </a>
        <a href="https://instagram.com/adeil.ton_borges7" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className={styles.icon} />
        </a>
        <a href="https://github.com/Adeiltonborges/ppi2025_4inf1v" target="_blank" rel="noopener noreferrer">
          <GithubIcon className={styles.icon} />
        </a>
      </div>
    </footer>
  );
}
