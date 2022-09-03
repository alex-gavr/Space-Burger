import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './app.module.css';
import AppHeader from './header/app-header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constractor/burger-constructor';

const App = () => {
  return (
    <div className={styles.wrapper}>
        <AppHeader />
        <main className={styles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
