import { createSlice } from '@reduxjs/toolkit';
import { store } from 'app/store';

interface initialStateProps {
    show: boolean;
    text: string;
    type: string;
    color: string;
}

const initialState = {
    show: false,
    text: '',
    type: '',
    color: '',
} as initialStateProps;

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        toggleAction(state, { payload }) {
            state = {
                ...payload,
                show: true,
            };

            return state;
        },
        dismissAction() {
            return initialState;
        },
    },
});

const { dismissAction: defaultDismissAction, toggleAction: defaultToggleAction } =
    notificationSlice.actions;

export const dismissAction = () => {
    store.dispatch(defaultDismissAction());
};

export const toggleAction = (params: any) => {
    store.dispatch(defaultToggleAction(params));
};

export default notificationSlice.reducer;
