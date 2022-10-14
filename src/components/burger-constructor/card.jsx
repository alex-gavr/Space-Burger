import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { reorder } from "../../services/constructor-slice";
import { useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";

const Card = ({ id, children, index }) => {
    const dispatch = useDispatch();

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(reorder([dragIndex, hoverIndex]));

            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`${styles.draggableContainer} ${
                isDragging ? styles.opacityOff : styles.opacityOn
            }`}
            data-handler-id={handlerId}
        >
            {children}
        </div>
    );
};

export default Card;
