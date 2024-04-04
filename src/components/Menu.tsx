import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

export const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        <li className={styles.link}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.link}>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
    </div>
  );
};
