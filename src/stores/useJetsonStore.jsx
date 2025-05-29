import { create } from 'zustand';

export const useJetsonStore = create((set) => ({
    product: 'j4012s',
    jetpack: '36.4.3',
    setProduct: (product) => set({ product, jetpack: null }),
    setJetPack: (jetpack) => set({ jetpack }),
}));

export const useThemeStore = create((set) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
}));