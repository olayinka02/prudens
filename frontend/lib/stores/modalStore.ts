import { create } from "zustand"

type ModalType =
  | "resend-notification"
  | "process-refund"
  | "manual-transfer"
  | "approve-transaction"
  | "reject-transaction"
  | null

interface ModalData {
  transactionId?: string
  transactionReference?: string
  // Add more fields as needed for different modals
  [key: string]: unknown
}

interface ModalState {
  activeModal: ModalType
  modalData: ModalData
  isOpen: boolean
  openModal: (type: ModalType, data?: ModalData) => void
  closeModal: () => void
}

/**
 * Modal Store - Manages global modal state
 * Useful for coordinating multiple modals across the app
 */
export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  isOpen: false,
  openModal: (type, data = {}) =>
    set({ activeModal: type, modalData: data, isOpen: true }),
  closeModal: () => set({ activeModal: null, modalData: {}, isOpen: false }),
}))
