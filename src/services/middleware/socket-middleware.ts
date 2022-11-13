import { RootState } from './../store';
import { Middleware } from 'redux';

export type TWsActions = {
    wsConnect: string;
    wsDisconnect: string;
    wsSendMessage?: string;
    wsConnecting: string;
    onOpen: string;
    onClose: string;
    onMessage: string;
    onError: string;
};

export const socketMiddleware: any = (wsAction: TWsActions): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = '';

        return (next) => (action) => {
            const { type, payload } = action;
            const { dispatch } = store;
            const { wsConnect, wsDisconnect, wsSendMessage, wsConnecting, onOpen, onClose, onMessage, onError } = wsAction;

            if (type === wsConnect) {
                url = payload;
                socket = new WebSocket(url);
                dispatch({ type: wsConnecting });
            }

            if (socket) {
                if (type === wsDisconnect) {
                    socket.close();
                    dispatch({ type: onClose });
                }

                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                if (wsSendMessage && type === wsSendMessage) {
                    socket.send(JSON.stringify(payload));
                }

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsed = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsed });
                };

                socket.onerror = (error) => {
                    dispatch({ type: onError, error: JSON.stringify(error) });
                };

                socket.onclose = (event) => {
                    if (event.code === 1000) {
                        dispatch({ type: onClose });
                    }
                    dispatch({ type: onError, error: event.code.toString() });
                };
            }

            next(action);
        };
    };
};
