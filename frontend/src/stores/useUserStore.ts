import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";

export const useUserStore = create<UserState>((set, get) => ({
    updateAvatarUrl: async (formData) => {
        try {
            const { user, setUser } = useAuthStore.getState();
            const data = await userService.uploadAvatar(formData);

            if (user) {
                setUser({
                    ...user,
                    avatarUrl: data.avatarUrl
                });

                useChatStore.getState().fetchConversations();
            }
        } catch (error) {
            console.error("Lỗi khi updateAvatarUrl", error);
            toast.error(useLanguageStore.getState().t.toast.uploadAvatarError);
        }
    },

    updateProfile: async (data) => {
        try {
            const { setUser } = useAuthStore.getState();
            const result = await userService.updateProfile(data);

            if (result.user) {
                setUser(result.user);
                useChatStore.getState().fetchConversations();
            }

            toast.success(useLanguageStore.getState().t.toast.updateProfileSuccess);
        } catch (error: any) {
            console.error("Lỗi khi updateProfile", error);
            const message = error?.response?.data?.message || useLanguageStore.getState().t.toast.updateProfileError;
            toast.error(message);
        }
    },

    changePassword: async (currentPassword, newPassword) => {
        try {
            await userService.changePassword({ currentPassword, newPassword });
            toast.success(useLanguageStore.getState().t.toast.changePasswordSuccess);
        } catch (error: any) {
            console.error("Lỗi khi changePassword", error);
            const message = error?.response?.data?.message || useLanguageStore.getState().t.toast.changePasswordError;
            toast.error(message);
            throw error;
        }
    },
}));