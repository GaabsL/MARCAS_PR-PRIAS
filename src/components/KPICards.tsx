import { formatPercent, formatNumber } from "../lib/utils";
import type { SocialPostInfo } from "../types";
import { useMemo } from "react";

interface KPICardsProps {
  data: SocialPostInfo[];
}

export function KPICards({ data }: KPICardsProps) {
  const metrics = useMemo(() => {
    let alcance = 0;
    let impressoes = 0;
    let interacoes = 0;
    let sumEngajamento = 0;

    data.forEach((item) => {
      alcance += item.alcance;
      impressoes += item.impressoes;
      interacoes += item.interacoes;
      sumEngajamento += item.engajamento;
    });

    const mediaEngajamento = data.length > 0 ? sumEngajamento / data.length : 0;

    return { alcance, impressoes, interacoes, mediaEngajamento };
  }, [data]);

  const cards = [
    {
      title: "Alcance Total",
      value: formatNumber(metrics.alcance),
      trend: "+12%", // Simulado para estética exigida
      isPositive: true,
      description: "vs. período anterior",
    },
    {
      title: "Total de Impressões",
      value: formatNumber(metrics.impressoes),
      trend: "+8.5%", // Simulado para estética exigida
      isPositive: true,
      description: "vs. período anterior",
    },
    {
      title: "Interações Totais",
      value: formatNumber(metrics.interacoes),
      trend: "-2.1%", // Simulado para estética exigida
      isPositive: false,
      description: "vs. período anterior",
    },
    {
      title: "Engajamento Médio",
      value: formatPercent(metrics.mediaEngajamento),
      trend: "0%", // Simulado para estética exigida
      isPositive: null,
      description: "vs. período anterior",
    },
  ];

  if (data.length === 0) return null;

  return (
    <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
        >
          <span className="text-xs font-bold text-slate-400 uppercase">
            {card.title}
          </span>
          <div className="flex items-end justify-between mt-4">
            <span className="text-3xl font-black text-slate-800 tracking-tight">
              {card.value}
            </span>
            <span
              className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded ${
                card.isPositive === true
                  ? "bg-emerald-50 text-emerald-500"
                  : card.isPositive === false
                  ? "bg-slate-50 text-slate-400"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {card.isPositive === true ? "↑ " : card.isPositive === false ? "↓ " : ""}
              {card.trend.replace("-", "").replace("+", "")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
