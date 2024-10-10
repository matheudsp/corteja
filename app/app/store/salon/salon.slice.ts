
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalonState } from './salon.types';

const initialState: SalonState = {
    salonId: '',
    date: '',
    salonServiceId: '',
    couponId: '',
    customerId: '',
    employeeId: '',
    salonAvatar: '',
    salonName: '',
    salonServiceName: '',
    salonServicePrice: 0,
    salonServiceDuration: 0,
};

const salonSlice = createSlice({
    name: 'salon',
    initialState,
    reducers: {
        setSalonId(state, action: PayloadAction<string>) {
            state.salonId = action.payload;
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },
        setSalonServiceId(state, action: PayloadAction<string>) {
            state.salonServiceId = action.payload;
        },
        setCouponId(state, action: PayloadAction<string>) {
            state.couponId = action.payload;
        },
        setCustomerId(state, action: PayloadAction<string>) {
            state.customerId = action.payload;
        },
        setEmployeeId(state, action: PayloadAction<string>) {
            state.employeeId = action.payload;
        },
        setSalonAvatar(state, action: PayloadAction<string>) {
            state.salonAvatar = action.payload;
        },
        setSalonName(state, action: PayloadAction<string>) {
            state.salonName = action.payload;
        },
        setSalonServiceName(state, action: PayloadAction<string>) {
            state.salonServiceName = action.payload;
        },
        setSalonServicePrice(state, action: PayloadAction<number>) {
            state.salonServicePrice = action.payload;
        },
        setSalonServiceDuration(state, action: PayloadAction<number>) {
            state.salonServiceDuration = action.payload;
        },
        resetSalonState() {
            return initialState; 
        }
    },
});

export const {
    setSalonId,
    setDate,
    setSalonServiceId,
    setCouponId,
    setCustomerId,
    setEmployeeId,
    setSalonAvatar,
    setSalonName,
    setSalonServiceName,
    setSalonServicePrice,
    setSalonServiceDuration,
    resetSalonState, 
} = salonSlice.actions;

export default salonSlice.reducer;
