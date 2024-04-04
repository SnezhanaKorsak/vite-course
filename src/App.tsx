import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from '@/components/Menu';

import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import CalendarIcon from '@/assets/calendar.svg?react';

import styles from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  const mode = import.meta.env.MODE;
  const isProd = mode === 'production';

  return (
    <div className={styles.container}>
      <Menu />

      <div className={styles.content}>
        <div className={styles.info}>
          <h1>Count is: {count}</h1>
          <button type="button" className={styles.button} onClick={increment}>
            Add
          </button>

          <hr />
          <CalendarIcon width="75" height="75" />
          <Outlet />

          {!isProd && (
            <div className={styles.mode}>
              Mode:
              {import.meta.env.APP_PREFIX}
            </div>
          )}
        </div>

        <div className={styles.image}>
          <img src={avatarPng} alt="avatar" />
          <img src={avatarJpg} alt="avatar" />
        </div>
      </div>
    </div>
  );
};
