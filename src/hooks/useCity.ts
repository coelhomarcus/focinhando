import { useState, useEffect } from "react";
import estadosData from "@/assets/map/estados.json";

interface Cidade {
  id: string;
  cidade: string;
}

export const useCity = (selectedState: string) => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    const loadCidades = async () => {
      if (selectedState) {
        setLoadingCidades(true);
        try {
          const cidadesModule = await import(
            `@/assets/map/cidades/${selectedState}.json`
          );
          setCidades(cidadesModule.default.cidades || cidadesModule.cidades);
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
          setCidades([]);
        } finally {
          setLoadingCidades(false);
        }
      } else {
        setCidades([]);
      }
    };
    loadCidades();
  }, [selectedState]);

  return {
    estados: estadosData.estados,
    cidades,
    loadingCidades,
  };
};
