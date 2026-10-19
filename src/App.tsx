import { useMemo, useState } from "react";
import { reportData } from "./reportData";
import { KPICards } from "./components/KPICards";
import {
  AreaEvolutionChart,
  FormatBarChart,
  InteractionsDonutChart,
} from "./components/Charts";
import { DataTable } from "./components/DataTable";
import { DownloadCloud } from "lucide-react";

export default function App() {
  const [selectedQuinzena, setSelectedQuinzena] = useState<string>("all");
  const [selectedRede, setSelectedRede] = useState<string>("all");

  // Dinamicamente extrair as opções únicas de filtro baseadas nos dados em ordem cronológica decrescente
  const quinzenasOptions = useMemo(() => {
    const mapQuinzenaToDate = new Map<string, number>();
    reportData.forEach((d) => {
      const time = new Date(d.data).getTime();
      if (!mapQuinzenaToDate.has(d.quinzena) || time > mapQuinzenaToDate.get(d.quinzena)!) {
        mapQuinzenaToDate.set(d.quinzena, time);
      }
    });
    return Array.from(mapQuinzenaToDate.keys()).sort(
      (a, b) => mapQuinzenaToDate.get(b)! - mapQuinzenaToDate.get(a)!
    );
  }, []);

  const redesOptions = useMemo(() => {
    const unique = Array.from(new Set(reportData.map((d) => d.rede)));
    return unique.sort();
  }, []);

  // Set default selection se houver dados
  useMemo(() => {
    if (selectedQuinzena === "all" && quinzenasOptions.length > 0 && reportData.length > 0) {
       // Opcional: auto-select the latest if desired. Letting users see 'all' by default is also fine.
    }
  }, [quinzenasOptions, selectedQuinzena]);

  // Aplicar os filtros
  const filteredData = useMemo(() => {
    return reportData.filter((post) => {
      const matchQuinzena =
        selectedQuinzena === "all" || post.quinzena === selectedQuinzena;
      const matchRede = selectedRede === "all" || post.rede === selectedRede;
      return matchQuinzena && matchRede;
    });
  }, [selectedQuinzena, selectedRede]);

  // Obter dados da quinzena anterior para cálculo real de tendência nos KPIs
  const previousQuinzenaData = useMemo(() => {
    if (selectedQuinzena === "all") return undefined;
    const currentIndex = quinzenasOptions.indexOf(selectedQuinzena);
    if (currentIndex === -1 || currentIndex >= quinzenasOptions.length - 1) return undefined;
    const prevQuinzena = quinzenasOptions[currentIndex + 1];
    return reportData.filter((post) => {
      const matchQuinzena = post.quinzena === prevQuinzena;
      const matchRede = selectedRede === "all" || post.rede === selectedRede;
      return matchQuinzena && matchRede;
    });
  }, [selectedQuinzena, selectedRede, quinzenasOptions]);

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "Quinzena",
      "Rede",
      "Data e Hora",
      "Categoria",
      "Sub Grupo",
      "Formato",
      "Criativo",
      "Alcance",
      "Impressões",
      "Interações",
      "Curtidas",
      "Comentários",
      "Compartilhamentos",
      "Engajamento (%)",
      "Link"
    ];

    const escapeCSV = (str: string | number) => {
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = filteredData.map(post => [
      escapeCSV(post.quinzena),
      escapeCSV(post.rede),
      escapeCSV(post.data),
      escapeCSV(post.categoria),
      escapeCSV(post.subGrupo),
      escapeCSV(post.tipo),
      escapeCSV(post.criativo),
      post.alcance,
      post.impressoes,
      post.interacoes,
      post.curtidas,
      post.comentarios,
      post.compartilhamentos,
      post.engajamento,
      escapeCSV(post.link)
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    // UTF-8 BOM helps Excel open it properly
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" }); 
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio_redes_sociais.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between px-6 md:px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-center gap-4 pr-4 md:border-r md:border-slate-200">
            <img src="https://i.imgur.com/ihchsJt.png" alt="Logo Empresa" className="h-8 sm:h-10 w-auto object-contain" referrerPolicy="no-referrer" />
            <img src="https://i.imgur.com/lAyMWKF.png" alt="Logo Agência" className="h-5 sm:h-6 w-auto object-contain opacity-90" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
              Performance Marcas Próprias
            </h1>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              Dashboard de Marketing BI
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
            <span className="text-xs font-medium text-slate-500">Quinzena:</span>
            <select
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
              value={selectedQuinzena}
              onChange={(e) => setSelectedQuinzena(e.target.value)}
            >
              <option value="all">Todas as Quinzenas</option>
              {quinzenasOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
            <span className="text-xs font-medium text-slate-500">Rede:</span>
            <select
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
              value={selectedRede}
              onChange={(e) => setSelectedRede(e.target.value)}
            >
              <option value="all">Todas as Redes</option>
              {redesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleExportCSV}
            disabled={filteredData.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent rounded-lg transition-colors ml-auto md:ml-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DownloadCloud className="w-4 h-4" />
            <span className="text-xs font-bold">Exportar CSV</span>
          </button>
        </div>
      </header>

      {/* Main Content (Bento Grid) */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">
              Nenhum dado encontrado para os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <KPICards
              data={filteredData}
              previousData={previousQuinzenaData}
              isAllPeriod={selectedQuinzena === "all"}
            />
            <AreaEvolutionChart data={filteredData} />
            <InteractionsDonutChart data={filteredData} />
            <FormatBarChart data={filteredData} />
            <DataTable data={filteredData} />
          </div>
        )}
      </main>
    </div>
  );
}
