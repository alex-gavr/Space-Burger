import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { LOGIN_URL, REGISTER_URL, PASSWORD_RESET_URL, NEW_PASSWORD_SAVE_URL, TOKEN_URL, USER_URL, LOGOUT_URL } from '../utils/config';
import Cookies from 'js-cookie';
import { request } from '../utils/request';
import { IUserState } from '../types/store-states';

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

interface IUserData {
    email: string;
    name: string;
    password: string;
    token: string;
}

// USER CREATION
export const registerUser = createAsyncThunk<any, Omit<IUserData, 'token'>>('user/createUser', async (userData) => {
    const { email, password, name } = userData;
    return await request(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });
});

// LOGIN
export const login = createAsyncThunk<any, Omit<IUserData, 'name' | 'token'>>('user/login', async (data) => {
    const { email, password } = data;
    return await request(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
});

// PASSWORD CHANGE INITIATION
export const resetPasswordInit = createAsyncThunk<any, string>('user/passwordReset', async (email) => {
    return await request(PASSWORD_RESET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
});

// NEW PASSWORD SET UP AND SAVE
export const newPasswordSave = createAsyncThunk<any, Omit<IUserData, 'name' | 'email'>>('user/newPasswordSave', async (data) => {
    const { password, token } = data;
    return await request(NEW_PASSWORD_SAVE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
    });
});

// TOKEN UPDATE
export const tokenUpdate = createAsyncThunk<any>('user/newToken', async () => {
    let token = Cookies.get('refreshToken');
    return await request(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: Cookies.get('accessToken') },
        body: JSON.stringify({ token }),
    });
});

// FETCH USER DATA
export const fetchUserData = createAsyncThunk<any>('user/userData', async () => {
    return await request(USER_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: Cookies.get('accessToken') },
    });
});

// LOGOUT
export const logout = createAsyncThunk<any>('user/logout', async () => {
    const token = Cookies.get('refreshToken');
    return await request(LOGOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });
});

// USER PROFILE DATA CHANGE
export const profileDataChange = createAsyncThunk<any, Omit<IUserData, 'token'>>('user/profileDataChange', async (userData) => {
    const { email, password, name } = userData;
    return await request(USER_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('accessToken'),
        },
        body: JSON.stringify({ email, password, name }),
    });
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        profileDataChangedToDefault(state) {
            state.profileDataChanged = null;
        },
    },
    extraReducers: (builder) => {
        // USER CREATION
        builder.addCase(registerUser.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.accountExists = null;
            state.accountCreated = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload.message === 'User already exists') {
                state.accountExists = true;
            } else {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                Cookies.set('refreshToken', action.payload.refreshToken);
                Cookies.set('accessToken', action.payload.accessToken);
                state.accountCreated = true;
            }
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        // LOGIN
        builder.addCase(login.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.loginSuccess = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload.success) {
                state.loginSuccess = false;
            } else {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                Cookies.remove('refreshToken', { path: '/' });
                Cookies.remove('accessToken', { path: '/' });
                Cookies.set('refreshToken', action.payload.refreshToken);
                Cookies.set('accessToken', action.payload.accessToken);
                state.loginSuccess = true;
                state.logoutSuccess = false;
                state.authorized = true;
            }
            state.loading = false;
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        // PASSWORD CHANGE INITIATION
        builder.addCase(resetPasswordInit.pending, (state) => {
            state.error = false;
            state.initPasswordReset = null;
            state.loading = true;
        });
        builder.addCase(resetPasswordInit.fulfilled, (state, action) => {
            state.initPasswordReset = action.payload.success;
            state.loading = false;
            state.allowToGoToPasswordReset = true;
        });
        builder.addCase(resetPasswordInit.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        //  NEW PASSWORD SET UP AND SAVE
        builder.addCase(newPasswordSave.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.passwordChanged = null;
            state.incorrectToken = null;
        });
        builder.addCase(newPasswordSave.fulfilled, (state, action) => {
            if (action.payload.message === 'Incorrect reset token') {
                state.incorrectToken = true;
            } else {
                state.passwordChanged = action.payload.success;
                state.allowToGoToPasswordReset = false;
            }
            state.loading = false;
        });
        builder.addCase(newPasswordSave.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        // TOKEN UPDATE
        builder.addCase(tokenUpdate.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(tokenUpdate.fulfilled, (state, action) => {
            Cookies.remove('refreshToken', { path: '/' });
            Cookies.remove('accessToken', { path: '/' });
            Cookies.set('refreshToken', action.payload.refreshToken);
            Cookies.set('accessToken', action.payload.accessToken);
            state.loading = false;
        });
        builder.addCase(tokenUpdate.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        // FETCH USER DATA
        builder.addCase(fetchUserData.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.loginSuccess = null;
            state.tokenExpired = null;
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.loginSuccess = true;
            state.logoutSuccess = null;
            state.loading = false;
        });
        builder.addCase(fetchUserData.rejected, (state) => {
            state.tokenExpired = true;
            state.loading = null;
            state.error = true;
        });

        // LOGOUT
        builder.addCase(logout.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.logoutSuccess = null;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            Cookies.remove('refreshToken', { path: '/' });
            Cookies.remove('accessToken', { path: '/' });
            state.logoutSuccess = action.payload.success;
            state.loginSuccess = null;
            state.authorized = null;
            state.loading = false;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        // USER PROFILE DATA CHANGE
        builder.addCase(profileDataChange.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.profileDataChanged = null;
        });
        builder.addCase(profileDataChange.fulfilled, (state, action) => {
            if (action.payload.message === 'jwt expired') {
                state.tokenExpired = true;
            } else {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.profileDataChanged = action.payload.success;
            }
            state.loading = false;
        });
        builder.addCase(profileDataChange.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

export const { profileDataChangedToDefault } = userSlice.actions;
export default userSlice.reducer;
