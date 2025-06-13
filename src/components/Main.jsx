import styles from './Main.module.css';

const cards = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: `My Text ${i}`,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
  image: `https://picsum.photos/400/300?random=${i + 1}`
}));

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {cards.map(card => (
          <div key={card.id} className={styles.card}>
            <img src={card.image} alt={card.title} className={styles.image} />
            <h2 className={styles.title}>{card.title}</h2>
            <p className={styles.text}>{card.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
