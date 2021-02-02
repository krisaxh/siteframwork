import styles from "../styles/navbar.module.scss";

export default function Navbar({ isLogin }) {
  return (
    <div className={styles.navbar}>
      {!isLogin && (
        <ul>
          <li>Dashboard</li>
          <li>Docs</li>
          <li>About</li>
        </ul>
      )}

      <img src="/logo.svg" alt="Logo" />
    </div>
  );
}
