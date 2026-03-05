import { create } from "zustand";
import { persist } from "zustand/middleware";
import vi from "./vi";
import en from "./en";
import type { Translations } from "./vi";

type Language = "vi" | "en";

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const translations: Record<Language, Translations> = { vi, en };

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: "vi",
            t: vi,
            setLanguage: (lang: Language) => {
                set({ language: lang, t: translations[lang] });
            },
        }),
        {
            name: "language-storage",
            partialize: (state) => ({ language: state.language }),
            onRehydrateStorage: () => {
                return (state) => {
                    if (state) {
                        state.t = translations[state.language];
                    }
                };
            },
        }
    )
);
