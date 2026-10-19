import { formatPercent, formatNumber } from "../lib/utils";
import type { SocialPostInfo } from "../types";
import { useMemo } from "react";

interface KPICardsProps {
  data: SocialPostInfo[];
  previousData?: SocialPostInfo[];
  isAllPeriod?: boolean;
}

export function KPICards({ data, previousData, isAllPeriod = false }: KPICardsProps) {
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

  const prevMetrics = useMemo(() => {
    if (!previousData || previousData.length === 0) return null;
    let alcance = 0;
    let impressoes = 0;
    let interacoes = 0;
    let sumEngajamento = 0;

    previousData.forEach((item) => {
      alcance += item.alcance;
      impressoes += item.impressoes;
      interacoes += item.interacoes;
      sumEngajamento += item.engajamento;
    });

    const mediaEngajamento = previousData.length > 0 ? sumEngajamento / previousData.length : 0;

    return { alcance, impressoes, interacoes, mediaEngajamento };
  }, [previousData]);

  const calcDiff = (curr: number, prev: number | undefined) => {
    if (prev === undefined || prev === 0) return null;
    const diff = ((curr - prev) / prev) * 100;
    return {
      trend: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`,
      isPositive: diff >= 0,
    };
  };

  const alcanceDiff = prevMetrics ? calcDiff(metrics.alcance, prevMetrics.alcance) : null;
  const impressoesDiff = prevMetrics ? calcDiff(metrics.impressoes, prevMetrics.impressoes) : null;
  const interacoesDiff = prevMetrics ? calcDiff(metrics.interacoes, prevMetrics.interacoes) : null;
  const engajamentoDiff = prevMetrics
    ? (() => {
        const diff = metrics.mediaEngajamento - prevMetrics.mediaEngajamento;
        return {
          trend: `${diff >= 0 ? "+" : ""}${diff.toFixed(2)} p.p.`,
          isPositive: diff > 0 ? true : diff < 0 ? false : null,
        };
      })()
    : null;

  const cards = [
    {
      title: "Alcance Total",
      value: formatNumber(metrics.alcance),
      trend: alcanceDiff ? alcanceDiff.trend : isAllPeriod ? `${data.length} posts` : "Período base",
      isPositive: alcanceDiff ? alcanceDiff.isPositive : null,
      description: alcanceDiff ? "vs. quinzena anterior" : isAllPeriod ? "total acumulado" : "quinzena inicial",
    },
    {
      title: "Total de Impressões",
      value: formatNumber(metrics.impressoes),
      trend: impressoesDiff ? impressoesDiff.trend : isAllPeriod ? `${data.length} posts` : "Período base",
      isPositive: impressoesDiff ? impressoesDiff.isPositive : null,
      description: impressoesDiff ? "vs. quinzena anterior" : isAllPeriod ? "total acumulado" : "quinzena inicial",
    },
    {
      title: "Interações Totais",
      value: formatNumber(metrics.interacoes),
      trend: interacoesDiff ? interacoesDiff.trend : isAllPeriod ? `${data.length} posts` : "Período base",
      isPositive: interacoesDiff ? interacoesDiff.isPositive : null,
      description: interacoesDiff ? "vs. quinzena anterior" : isAllPeriod ? "total acumulado" : "quinzena inicial",
    },
    {
      title: "Engajamento Médio",
      value: formatPercent(metrics.mediaEngajamento),
      trend: engajamentoDiff ? engajamentoDiff.trend : isAllPeriod ? "Média geral" : "Período base",
      isPositive: engajamentoDiff ? engajamentoDiff.isPositive : null,
      description: engajamentoDiff ? "vs. quinzena anterior" : isAllPeriod ? "todas as quinzenas" : "quinzena inicial",
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
