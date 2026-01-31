import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token:null,
    userData: null,
    loader: false,

    fetchUserData: async()=>{
        set({loader: true});

        const res= await fetch()
    }
}))

/*
export const useCategoryStore = create((set) => ({
    categories: [],
    subcategories: [],
    loading: false,

    fetchCategories: async () => {
        set({ loading: true })

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`,
            { credentials: 'include' }
        )
        const data = await res.json()

        set({
            categories: data.categories,
            subcategories: data.subcategories,
            loading: false
        })
    },

    addCategory: (category) =>
        set((state) => ({
            categories: [...state.categories, category]
        })),

    clearCategories: () =>
        set({ categories: [], subcategories: [] })
}))
*/
