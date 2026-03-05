import api from "@/lib/axios";

export const userService = {
    uploadAvatar: async (formData: FormData) => {
        const res = await api.post("/users/uploadAvatar", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.status === 400) {
            throw new Error(res.data.message);
        }

        return res.data;
    },

    updateProfile: async (data: {
        displayName?: string;
        username?: string;
        email?: string;
        phone?: string;
        bio?: string;
    }) => {
        const res = await api.put("/users/profile", data);
        return res.data;
    },

    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }) => {
        const res = await api.put("/users/change-password", data);
        return res.data;
    },
}