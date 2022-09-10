import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useFetch } from '../../utils/hook-fetch';
import { Preloader } from '../preloader/preloader';
import { DataContext } from '../../utils/create-context';


const App = () => {
  
  const api = 'https://norma.nomoreparties.space/api/ingredients';
  const { isLoading, isError, data, getData } = useFetch(api);

  useEffect(() => {
    getData()
  },[])

  return(
    <>
      { isLoading ? <Preloader /> :
        <DataContext.Provider value={data}>
          <div className={styles.wrapper}>
              <AppHeader />
              <main className={styles.container}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
          </div>
        </DataContext.Provider>
      }
    </>
    
  );
}

export default App;
