import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type produitState = {
    produits: string[];
}

const STORAGE_KEY = 'panier';

function chargerDepuisLocalStorage(): string[] {
    if (typeof window === 'undefined') {
        return [];
    }
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function sauvgarderDansLocalStorage(produits:string[]) {
    if (typeof window === 'undefined') {
        console.warn('LocalStorage is not available in this environment.');
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
}

export const PanierStore = signalStore(
    { providedIn: "root"},
    withState<produitState>({
        produits: chargerDepuisLocalStorage(),
    }),
    withMethods((store) => ({
        ajouterProduit(nom: string) {
            patchState(store, (state) => {
                const produits = [...state.produits, nom];
                sauvgarderDansLocalStorage(produits);
                return { produits };
            })
        },
        
        vierPanier() {
            sauvgarderDansLocalStorage([]);
            patchState(store, () => ({ produits: []}));
        },

        getProduits() {
            return store.produits();
        }
    }))
)