import styles from './order-card.module.css';
import { FC } from 'react';

interface IProps {
    unseen: number;
}

export const UnseenIngredients: FC<IProps> = ({ unseen }) => {
    return <span className={`${styles.unseenIngredients} text text_type_digits-default`}>+{unseen}</span>;
};
