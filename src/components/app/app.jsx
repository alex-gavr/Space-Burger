import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect , createContext} from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useFetch } from '../../utils/hook-fetch';

export const DataContext = createContext(); 

const App = () => {
  
  const api = 'https://norma.nomoreparties.space/api/ingredients';
  const { isLoading, isError, data, getData } = useFetch(api);

  useEffect(() => {
    getData()
  },[])

  const DataProvider = ({children}) => {
    return(
      <DataContext.Provider value={[data]}>{children}</DataContext.Provider>
    )
  }

  return (
    <DataProvider>
      <div className={styles.wrapper}>
          <AppHeader />
          <main className={styles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
      </div>
    </DataProvider>
  );
}

export default App;
