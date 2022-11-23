import { IUserState } from '../types/store-states';
import userSlice, {
    fetchUserData,
    login,
    logout,
    newPasswordSave,
    profileDataChange,
    profileDataChangedToDefault,
    registerUser,
    resetPasswordInit,
    tokenUpdate,
} from './user-slice';

const initialState: IUserState = {
    name: '',
    email: '',

    authorized: null,

    loginSuccess: null,
    logoutSuccess: null,

    accountCreated: null,
    accountExists: null,

    initPasswordReset: null,
    allowToGoToPasswordReset: false,
    passwordChanged: null,

    incorrectToken: null,
    tokenExpired: null,

    profileDataChanged: null,

    loading: null,
    error: false,
};

const dummyUserResponse = {
    success: true,
    user: {
        name: 'Alexander',
        email: 'hello@world.com',
    },
};

describe('User Slice Tests', () => {
    // Test initial state
    test('should return the initial state of user slice', () => {
        expect(userSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    // Test set profileDataChanged to null
    test('should set profileDataChanged to null', () => {
        const action = {
            type: profileDataChangedToDefault,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            profileDataChanged: null,
        });
    });

    // Extra Reducers tests
    // Registration
    // Pending asynchronous function
    test('should set loading true while registration action is pending', () => {
        const action = { type: registerUser.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            accountExists: null,
            accountCreated: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name and email to payload when registration action is fulfilled', () => {
        const action = {
            type: registerUser.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            accountCreated: true,
            name: action.payload.user.name,
            email: action.payload.user.email,
        });
    });
    // Rejected asynchronous function
    test('should set error true when registration action is rejected', () => {
        const action = { type: registerUser.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // LOGIN
    // Pending asynchronous function
    test('should set loading true while LOGIN action is pending', () => {
        const action = { type: login.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            loginSuccess: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when LOGIN action is fulfilled', () => {
        const action = {
            type: login.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            loginSuccess: true,
            logoutSuccess: false,
            authorized: true,
            name: action.payload.user.name,
            email: action.payload.user.email,
        });
    });
    // Rejected asynchronous function
    test('should set error true when LOGIN action is rejected', () => {
        const action = { type: login.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // PASSWORD CHANGE INITIATION
    // Pending asynchronous function
    test('should set loading true while PASSWORD CHANGE action is pending', () => {
        const action = { type: resetPasswordInit.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            initPasswordReset: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when PASSWORD CHANGE action is fulfilled', () => {
        const action = {
            type: resetPasswordInit.fulfilled,
            payload: { success: true },
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            initPasswordReset: action.payload.success,
            allowToGoToPasswordReset: true,
        });
    });
    // Rejected asynchronous function
    test('should set error true when PASSWORD CHANGE action is rejected', () => {
        const action = { type: resetPasswordInit.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // NEW PASSWORD SET UP AND SAVE
    // Pending asynchronous function
    test('should set loading true while NEW PASSWORD SET UP action is pending', () => {
        const action = { type: newPasswordSave.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            passwordChanged: null,
            incorrectToken: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when NEW PASSWORD SET UP action is fulfilled', () => {
        const action = {
            type: newPasswordSave.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            passwordChanged: action.payload.success,
            allowToGoToPasswordReset: false,
        });
    });
    // Rejected asynchronous function
    test('should set error true when NEW PASSWORD SET UP action is rejected', () => {
        const action = { type: newPasswordSave.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // TOKEN UPDATE
    // Pending asynchronous function
    test('should set loading true while TOKEN UPDATE action is pending', () => {
        const action = { type: tokenUpdate.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when TOKEN UPDATE action is fulfilled', () => {
        const action = {
            type: tokenUpdate.fulfilled,
            payload: {
                refreshToken: 1111111,
                accessToken: 1111111,
            },
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
        });
    });
    // Rejected asynchronous function
    test('should set error true when TOKEN UPDATE action is rejected', () => {
        const action = { type: tokenUpdate.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // FETCH USER DATA
    // Pending asynchronous function
    test('should set loading true while FETCH USER DATA action is pending', () => {
        const action = { type: fetchUserData.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            loginSuccess: null,
            tokenExpired: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when FETCH USER DATA action is fulfilled', () => {
        const action = {
            type: fetchUserData.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            name: action.payload.user.name,
            email: action.payload.user.email,
            loginSuccess: true,
            logoutSuccess: null,
        });
    });
    // Rejected asynchronous function
    test('should set error true when FETCH USER DATA action is rejected', () => {
        const action = { type: fetchUserData.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
            tokenExpired: true,
        });
    });

    // LOGOUT
    // Pending asynchronous function
    test('should set loading true while LOGOUT action is pending', () => {
        const action = { type: logout.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            logoutSuccess: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when LOGOUT action is fulfilled', () => {
        const action = {
            type: logout.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            logoutSuccess: action.payload.success,
            loginSuccess: null,
            authorized: null,
        });
    });
    // Rejected asynchronous function
    test('should set error true when LOGOUT action is rejected', () => {
        const action = { type: logout.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });

    // USER PROFILE DATA CHANGE
    // Pending asynchronous function
    test('should set loading true while USER PROFILE DATA CHANGE action is pending', () => {
        const action = { type: profileDataChange.pending };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
            profileDataChanged: null,
        });
    });
    // Fulfilled asynchronous function
    test('should set name, email details to payload when USER PROFILE DATA CHANGE action is fulfilled', () => {
        const action = {
            type: profileDataChange.fulfilled,
            payload: dummyUserResponse,
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            name: action.payload.user.name,
            email: action.payload.user.email,
            profileDataChanged: action.payload.success,
        });
    });
    // Rejected asynchronous function
    test('should set error true when USER PROFILE DATA CHANGE action is rejected', () => {
        const action = { type: profileDataChange.rejected };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });
});
