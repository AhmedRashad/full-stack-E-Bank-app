import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountServicd";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  charge_success: false,
  transfer_success: false,
  deposit_success: false,
  message: "",
  current_account: null,
  account_modal: false,
  charge_modal: false,
  transfer_modal: false,
  deposit_modal: false,
};

export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (accountData, thunkAPI) => {
    try {
      return await accountService.addAccount(accountData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const transferMoney = createAsyncThunk(
  "account/transferMoney",
  async (accountData, thunkAPI) => {
    try {
      return await accountService.transferMoney(accountData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chargeMoney = createAsyncThunk(
  "account/chargeMoney",
  async (accountData, thunkAPI) => {
    try {
      return await accountService.chargeMoney(accountData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const depositMoney = createAsyncThunk(
  "account/depositMoney",
  async (accountData, thunkAPI) => {
    try {
      return await accountService.depositMoney(accountData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.charge_success = false;
      state.transfer_success = false;
      state.deposit_success = false;
      state.message = "";
    },
    setCurrentAccount: (state, action) => {
      state.current_account = action.payload;
    },
    setChargeModal: (state, action) => {
      state.charge_modal = action.payload;
    },
    setTransferModal: (state, action) => {
      state.transfer_modal = action.payload;
    },
    setDepositModal: (state, action) => {
      state.deposit_modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userAccounts = action.payload;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(transferMoney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transfer_success = true;
        state.current_account = action.payload;
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(chargeMoney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chargeMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.charge_success = true;
        state.current_account = action.payload;
      })
      .addCase(chargeMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(depositMoney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deposit_success = true;
        state.current_account = action.payload;
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  resetAccount,
  setCurrentAccount,
  setChargeModal,
  setTransferModal,
  setDepositModal,
} = accountSlice.actions;
export default accountSlice.reducer;
