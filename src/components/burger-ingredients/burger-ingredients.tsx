import '@ya.praktikum/react-developer-burger-ui-components';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from './ingredient-category';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { INGREDIENT_TYPES } from '../../utils/ingredient-types';
import { useDispatch } from 'react-redux';
import { deleteDetails } from '../../services/ingredient-details-slice';
import { onCloseModal } from '../../services/modal-slice';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../services/store';

const BurgerIngredients = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleCloseModal = (): void => {
        dispatch(onCloseModal());
        dispatch(deleteDetails());
        navigate('/');
    };

    const [current, setCurrent] = useState<string>(INGREDIENT_TYPES.BUN);

    const bun = useRef<HTMLDivElement>(null);
    const sauce = useRef<HTMLDivElement>(null);
    const main = useRef<HTMLDivElement>(null);

    // TRACKING SCROLLING
    useEffect(() => {
        const element = document.getElementById('id');
        if (element !== null) {
            const onScroll = () => {
                const bunHeight = bun.current?.clientHeight;
                const sauceHeight = sauce.current?.clientHeight;
                const gapHeightBetweenDivs = 40;
                if (bunHeight && sauceHeight) {
                    const bunAndSauceAndGap = bunHeight + sauceHeight + gapHeightBetweenDivs;

                    if (element.scrollTop >= bunHeight && element.scrollTop <= bunAndSauceAndGap) {
                        setCurrent(INGREDIENT_TYPES.SAUCE);
                    } else if (element.scrollTop >= bunAndSauceAndGap) {
                        setCurrent(INGREDIENT_TYPES.MAIN);
                    } else {
                        setCurrent(INGREDIENT_TYPES.BUN);
                    }
                }
            };
            element.addEventListener('scroll', onScroll);

            return () => {
                element.removeEventListener('scroll', onScroll);
            };
        }
    }, []);

    const executeScroll = (ref: RefObject<HTMLDivElement>): void => {
        ref.current?.scrollIntoView()
    }

    return (
        <section className={styles.wrapper}>
            <div className='mt-10'>
                <h1 className='text text_type_main-large mb-5'>Собери бургер</h1>
                <div className={styles.containerTabs}>
                    <Tab value={INGREDIENT_TYPES.BUN} active={current === INGREDIENT_TYPES.BUN} onClick={() => executeScroll(bun)}>
                        Булки
                    </Tab>
                    <Tab value={INGREDIENT_TYPES.SAUCE} active={current === INGREDIENT_TYPES.SAUCE} onClick={() => executeScroll(sauce)}>
                        Соусы
                    </Tab>
                    <Tab value={INGREDIENT_TYPES.MAIN} active={current === INGREDIENT_TYPES.MAIN} onClick={() => executeScroll(main)}>
                        Начинка
                    </Tab>
                </div>
            </div>
            <div className={styles.ingredientsContainer} id={'id'}>
                {/* Булки */}
                <div ref={bun}>
                    <IngredientCategory title='Булки' type={INGREDIENT_TYPES.BUN} />
                </div>
                {/* Соусы */}
                <div ref={sauce}>
                    <IngredientCategory title='Соусы' type={INGREDIENT_TYPES.SAUCE} />
                </div>
                {/* Начинка */}
                <div ref={main}>
                    <IngredientCategory title='Начинка' type={INGREDIENT_TYPES.MAIN} />
                </div>
            </div>
            <Modal onClose={handleCloseModal}>
                <IngredientDetails />
            </Modal>
        </section>
    );
};
export default BurgerIngredients;
