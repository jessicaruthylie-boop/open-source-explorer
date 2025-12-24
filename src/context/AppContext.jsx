import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Simpan query dan hasil repo di sini agar tidak hilang saat pindah halaman
  const [savedQuery, setSavedQuery] = useState("");
  const [savedRepos, setSavedRepos] = useState([]);

  return (
    <AppContext.Provider
      value={{ savedQuery, setSavedQuery, savedRepos, setSavedRepos }}
    >
      {children}
    </AppContext.Provider>
  );
};
