import type { SocialPostInfo } from "../types";
import { formatNumber, formatPercent } from "../lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DataTableProps {
  data: SocialPostInfo[];
}

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) return null;

  const getBadgeStyles = (rede: string) => {
    const r = rede.toLowerCase();
    if (r.includes("facebook")) return "bg-blue-100 text-blue-700";
    if (r.includes("instagram feed") || r === "instagram") return "bg-pink-100 text-pink-700";
    if (r.includes("stories")) return "bg-amber-100 text-amber-700";
    if (r.includes("tiktok")) return "bg-slate-800 text-white";
    return "bg-indigo-100 text-indigo-700";
  };

  const getFormatColor = (tipo: string) => {
    const t = tipo.toLowerCase();
    if (t.includes("carrossel")) return "bg-indigo-500";
    if (t.includes("reels")) return "bg-fuchsia-500";
    if (t.includes("stories")) return "bg-amber-500";
    if (t.includes("vídeo") || t.includes("video")) return "bg-emerald-500";
    if (t.includes("estático") || t.includes("estatico") || t.includes("imagem")) return "bg-sky-500";
    return "bg-slate-400";
  };

  return (
    <div className="md:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[350px]">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-xs font-bold text-slate-600 uppercase">Posts em Destaque (Filtros)</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9]">
              <th className="px-5 py-3">Data/Hora</th>
              <th className="px-5 py-3">Plataforma</th>
              <th className="px-5 py-3">Detalhes</th>
              <th className="px-5 py-3">Formato</th>
              <th className="px-5 py-3 text-right">Alcance</th>
              <th className="px-5 py-3 text-right">Engaj.</th>
            </tr>
          </thead>
          <tbody className="text-[11px] font-medium text-slate-700">
            {data.map((post) => (
              <tr
                key={post.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-5 py-2.5 whitespace-nowrap">
                  {format(new Date(post.data), "dd/MM - HH:mm", {
                    locale: ptBR,
                  })}
                </td>
                <td className="px-5 py-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${getBadgeStyles(
                      post.rede
                    )}`}
                  >
                    {post.rede}
                  </span>
                </td>
                <td className="px-5 py-2.5 max-w-[200px]">
                  {post.link ? (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col hover:opacity-80 transition-opacity group"
                    >
                      <span className="font-bold text-slate-800 truncate group-hover:text-indigo-600">
                        {post.criativo}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate uppercase mt-0.5">
                        {post.categoria} • {post.subGrupo}
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 truncate">
                        {post.criativo}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate uppercase mt-0.5">
                        {post.categoria} • {post.subGrupo}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-5 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-sm ${getFormatColor(post.tipo)}`}></div>
                    <span>{post.tipo}</span>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-right font-bold text-slate-800">
                  {formatNumber(post.alcance)}
                </td>
                <td className="px-5 py-2.5 text-right font-bold text-emerald-600">
                  {formatPercent(post.engajamento)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
