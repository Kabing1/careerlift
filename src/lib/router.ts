import { create } from 'zustand';

interface LocationState {
  pathname: string;
  setPathname: (pathname: string) => void;
}

export const useLocation = create<LocationState>((set) => ({
  pathname: window.location.pathname,
  setPathname: (pathname) => set({ pathname }),
}));