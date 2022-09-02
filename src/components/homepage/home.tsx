import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { transform } from 'typescript';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.bg}>
      <main className='text text_type_main-large' style={{textAlign: "center" ,width: "90%", position: "absolute", top: "50%", left: "50%", transform: `translate(${"-50%"}, ${"-50%"})`}}>HELLO WORLD</main>
    </div>
  );
}

export default Home;
