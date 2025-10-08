import styles from "./User.module.css";
import {usecontext} from "react";
import { CartContext } from "../context/CartContext";


export function User() {
    const {session, handleSignOut} = useContext(CartContext);
    return (
    <div>
      <div className={styles.container}>
        <h1>User account</h1>
        <div className="styles.userInfo">
            <p><strong>username: </strong>
        {session.user.user_metadata.username}
        </p>
        <p><strong>email: </strong>
        {session.user.email}
        </p>
        <p><strong>id: </strong>
        {session.user.id}
        </p>
        </div>
        <button className={styles.button} onClick={handleSignOut}>Sign out</button>
        </div>
    </div>
  );
}