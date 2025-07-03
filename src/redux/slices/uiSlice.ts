import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  modals: {
    editBook: boolean
    borrowBook: boolean
    deleteBook: boolean
    returnBook: boolean
  }
  notifications: {
    id: string
    message: string
    type: "success" | "error" | "info"
  }[]
}

const initialState: UIState = {
  modals: {
    editBook: false,
    borrowBook: false,
    deleteBook: false,
    returnBook: false,
  },
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = true
    },

    closeModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = false
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key as keyof UIState["modals"]] = false
      })
    },

    addNotification: (
      state,
      action: PayloadAction<{
        message: string
        type: "success" | "error" | "info"
      }>,
    ) => {
      const id = Math.random().toString(36).substring(2, 9)
      state.notifications.push({ ...action.payload, id })
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { openModal, closeModal, closeAllModals, addNotification, removeNotification } = uiSlice.actions

export default uiSlice.reducer
