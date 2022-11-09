import { FC, ReactNode, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { reorder } from '../../services/constructor-slice';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor.module.css';
import { AppDispatch } from '../../services/store';

interface Props {
    id: string;
    index: number;
    children: ReactNode;
}

const Card: FC<Props> = ({ id, children, index }): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }

                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }

                dispatch(reorder([dragIndex, hoverIndex]));

                item.index = hoverIndex;
            }
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={`${styles.draggableContainer} ${isDragging ? styles.opacityOff : styles.opacityOn}`} data-handler-id={handlerId}>
            {children}
        </div>
    );
};

export default Card;
