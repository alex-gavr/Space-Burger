import modalSlice, { onCloseModal, onOpenModal, openModalOrder, openModalWithCookie } from './modal-slice';
import { IModalState } from '../types/store-states';

const initialState: IModalState = {
    title: '',
    isModalOpen: false,
};

describe('Ingredients Details Slice Tests', () => {
    // Test initial state
    test('should return the initial state of ingredients slice', () => {
        expect(modalSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    //  Test Modal Open
    test('should open modal', () => {
        const action = {
            type: onOpenModal,
            payload: 'test title',
        };
        const state = modalSlice(initialState, action);
        expect(state).toEqual({
            title: 'test title',
            isModalOpen: true,
        });
    });
    // Test Modal Close
    test('should close modal', () => {
        const action = {
            type: onCloseModal,
        };
        const state = modalSlice(initialState, action);
        expect(state).toEqual(initialState);
    });
    // Test Modal open with Cookies
    test('should open modal with cookies', () => {
        const action = {
            type: openModalWithCookie,
            payload: 'test title'
        };
        const state = modalSlice(initialState, action);
        expect(state).toEqual({
            title: 'test title',
            isModalOpen: true
        });
    });
    // Test Modal open without title
    test('should open modal without title change', () => {
        const action = {
            type: openModalOrder,
        };
        const state = modalSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isModalOpen: true,
        });
    });
});
