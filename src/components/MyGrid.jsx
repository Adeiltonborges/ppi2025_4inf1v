import styles from "./MyGrid.module.css";

export function MyGrid() {
  return (
    <div className={styles.container}>
      <header className={styles.header1} />
      <header className={styles.header2} />
      <aside className={styles.aside} />
      <aside className={styles.aside2} />
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
<img src="https://picsum.photos/200/300?random=1"></img>            
            <h2>text0</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1"></img>
            <h2>text 0</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=2"></img>
            <h2>text 1</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=3"></img>
            <h2>text 2</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=4"></img>
            <h2>text 3</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=9"></img>
            <h2>text 4</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>

          <div className={styles.header1}>
            
            <p>header 1 </p>
          </div>

          <div className={styles.header2}>
            <p>header 2</p>
          </div>
          
        </div>
      </div>
      <footer className={styles.footer} />
      <footer className={styles.footer2}/>
    </div>
  );
}
