import { createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import { LOGIN_URL, REGISTER_URL, PASSWORD_RESET_URL, NEW_PASSWORD_SAVE_URL, TOKEN_URL, USER_URL, LOGOUT_URL} from "../utils/config";
import Cookies from 'js-cookie';

const initialState = {
    name: "",
    email: "",

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

// USER CREATION
export const registerUser = createAsyncThunk(
    "user/createUser",
    async (userData) => {
        const { email, password, name } = userData;
        const res = await fetch(REGISTER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
        })
        
        return res.json();
    }
);

// LOGIN
export const login = createAsyncThunk("user/login", async (data) => {
    const { email, password } = data;
    const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return res.json();
});

// PASSWORD CHANGE INITIATION
export const resetPasswordInit = createAsyncThunk(
    "user/passwordReset",
    async (email) => {
        const res = await fetch(PASSWORD_RESET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return res.json();
    }
);

// NEW PASSWORD SET UP AND SAVE
export const newPasswordSave = createAsyncThunk(
    "user/newPasswordSave",
    async (data) => {
        const { password, token } = data;
        const res = await fetch(NEW_PASSWORD_SAVE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, token }),
        });
        return res.json();
    }
);


// TOKEN UPDATE
export const tokenUpdate = createAsyncThunk(
    "user/newToken",
    async () => {
        let token = Cookies.get("refreshToken");
        const res = await fetch(TOKEN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            Authorization: Cookies.get("accessToken"),
        },
            body: JSON.stringify({ token }),
        });
        return res.json();
    }
);


// FETCH USER DATA
export const fetchUserData = createAsyncThunk(
    "user/userData",
    async () => {
        const res = await fetch(USER_URL, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json" ,
                Authorization: Cookies.get("accessToken"),
            },
        })
        return res.json();
    }
);

// LOGOUT
export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        const token = Cookies.get("refreshToken");
        const res = await fetch(LOGOUT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
        return res.json();
    }
);

// USER PROFILE DATA CHANGE
export const profileDataChange = createAsyncThunk(
    "user/profileDataChange",
    async (userData) => {
        const { email, password, name } = userData;
        const res = await fetch(USER_URL, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                Authorization: Cookies.get("accessToken"),
            },
            body: JSON.stringify({ email, password, name }),
        })
        
        return res.json();
    }
);




export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        profileDataChangedToDefault(state) {
            state.profileDataChanged = null;
        },
    },
    extraReducers: {
        // USER CREATION
        [registerUser.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.accountExists = null;
            state.accountCreated = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            if (action.payload.message === "User already exists") {
                state.accountExists = true;
            } else {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                Cookies.set('refreshToken', action.payload.refreshToken);
                Cookies.set('accessToken', action.payload.accessToken);
                state.accountCreated = true;
            }
            state.loading = false;
        },
        [registerUser.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // LOGIN
        [login.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.loginSuccess = null;
        },
        [login.fulfilled]: (state, action) => {
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
        },
        [login.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // PASSWORD CHANGE INITIATION
        [resetPasswordInit.pending]: (state) => {
            state.error = false;
            state.initPasswordReset = null;
            state.loading = true;
        },
        [resetPasswordInit.fulfilled]: (state, action) => {
            state.initPasswordReset = action.payload.success;
            state.loading = false;
            state.allowToGoToPasswordReset = true;
        },
        [resetPasswordInit.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        //  NEW PASSWORD SET UP AND SAVE
        [newPasswordSave.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.passwordChanged = null;
            state.incorrectToken = null;
        },
        [newPasswordSave.fulfilled]: (state, action) => {
            if (action.payload.message === "Incorrect reset token") {
                state.incorrectToken = true;
            } else {
                state.passwordChanged = action.payload.success;
                state.allowToGoToPasswordReset = false;
            }
            state.loading = false;
        },
        [newPasswordSave.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // TOKEN UPDATE
        [tokenUpdate.pending]: (state) => {
            state.error = false;
            state.loading = true;
        },
        [tokenUpdate.fulfilled]: (state, action) => {
            Cookies.remove('refreshToken', { path: '/' });
            Cookies.remove('accessToken', { path: '/' });
            Cookies.set('refreshToken', action.payload.refreshToken);
            Cookies.set('accessToken', action.payload.accessToken);
            state.loading = false;
        },
        [tokenUpdate.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // FETCH USER DATA
        [fetchUserData.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.loginSuccess = null;
            state.tokenExpired = null;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            if (action.payload.message === "jwt expired") {
                state.tokenExpired = true;
            }
            else if (action.payload.message === "You should be authorised") {
                state.authorized = false;
                
            } else{
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.loginSuccess = true;
                state.logoutSuccess = null;
            }
            state.loading = false;
        },
        [fetchUserData.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // LOGOUT
        [logout.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.logoutSuccess = null;
        },
        [logout.fulfilled]: (state, action) => {
            Cookies.remove('refreshToken', { path: '/' });
            Cookies.remove('accessToken', { path: '/' });
            state.logoutSuccess = action.payload.success;
            state.loginSuccess = null;
            state.loading = false;
        },
        [logout.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },

        // USER PROFILE DATA CHANGE
        [profileDataChange.pending]: (state) => {
            state.error = false;
            state.loading = true;
            state.profileDataChanged = null;
        },
        [profileDataChange.fulfilled]: (state, action) => {
            if (action.payload.message === "jwt expired") {
                state.tokenExpired = true;
            } else{
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.profileDataChanged = action.payload.success
            }
            state.loading = false;
        },
        [profileDataChange.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },
    },
});

export const {profileDataChangedToDefault} = userSlice.actions;
export default userSlice.reducer;
