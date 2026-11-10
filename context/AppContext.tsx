import { createContext, useContext, useState, ReactNode } from 'react';

export type PokemonResumo = {
  id: number;
  nome: string;
  imagem: string;
};

type AppContextType = {
  temaEscuro: boolean;
  alternarTema: () => void;
  favoritos: PokemonResumo[];
  ehFavorito: (id: number) => boolean;
  alternarFavorito: (pokemon: PokemonResumo) => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [favoritos, setFavoritos] = useState<PokemonResumo[]>([]);

  function alternarTema() {
    setTemaEscuro(!temaEscuro);
  }

  function ehFavorito(id: number) {
    return favoritos.some((p) => p.id === id);
  }

  function alternarFavorito(pokemon: PokemonResumo) {
    if (ehFavorito(pokemon.id)) {
      setFavoritos(favoritos.filter((p) => p.id !== pokemon.id));
    } else {
      setFavoritos([...favoritos, pokemon]);
    }
  }

  return (
    <AppContext.Provider
      value={{ temaEscuro, alternarTema, favoritos, ehFavorito, alternarFavorito }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
