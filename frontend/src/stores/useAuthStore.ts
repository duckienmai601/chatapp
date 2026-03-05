import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";

export const useAuthStore = create<AuthState>()(
  persist((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    setAccessToken: (accessToken) => {
      set({ accessToken });
    },
    setUser: (user) => {
      set({ user });
    },

    clearState: () => {
      set({ accessToken: null, user: null, loading: false });
      useChatStore.getState().reset();
      localStorage.clear();
      sessionStorage.clear();
    },

    signUp: async (username, password, email, firstName, lastName) => {
      try {
        set({ loading: true });

        //  gọi api
        await authService.signUp(username, password, email, firstName, lastName);

        toast.success(useLanguageStore.getState().t.toast.signUpSuccess);
      } catch (error) {
        console.error(error);
        toast.error(useLanguageStore.getState().t.toast.signUpError);
      } finally {
        set({ loading: false });
      }
    },

    signIn: async (username, password) => {
      try {
        get().clearState();
        set({ loading: true });


        const { accessToken } = await authService.signIn(username, password);
        get().setAccessToken(accessToken);

        await get().fetchMe();
        useChatStore.getState().fetchConversations();

        toast.success(useLanguageStore.getState().t.toast.signInWelcome);
      } catch (error) {
        console.error(error);
        toast.error(useLanguageStore.getState().t.toast.signInError);
      } finally {
        set({ loading: false });
      }
    },

    signOut: async () => {
      try {
        get().clearState();
        await authService.signOut();
        toast.success(useLanguageStore.getState().t.toast.logoutSuccess);
      } catch (error) {
        console.error(error);
        toast.error(useLanguageStore.getState().t.toast.logoutError);
      }
    },

    fetchMe: async () => {
      try {
        set({ loading: true });
        const user = await authService.fetchMe();

        set({ user });
      } catch (error) {
        console.error(error);
        set({ user: null, accessToken: null });
        toast.error(useLanguageStore.getState().t.toast.fetchUserError);
      } finally {
        set({ loading: false });
      }
    },

    refresh: async () => {
      try {
        set({ loading: true });
        const { user, fetchMe, setAccessToken } = get();
        const accessToken = await authService.refresh();

        setAccessToken(accessToken);

        if (!user) {
          await fetchMe();
        }
      } catch (error) {
        console.error(error);
        toast.error(useLanguageStore.getState().t.toast.sessionExpired);
        get().clearState();
      } finally {
        set({ loading: false });
      }
    },
  }), {
    name: "auth-storage",
    partialize: (state) => ({ user: state.user }),
  })
);