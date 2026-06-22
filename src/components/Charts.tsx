import { useMemo } from "react";
import type { SocialPostInfo } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "../lib/utils";

interface ChartsProps {
  data: SocialPostInfo[];
}

const COLORS = ["#4f46e5", "#38bdf8", "#f43f5e", "#fbbf24", "#34d399"];

export function AreaEvolutionChart({ data }: ChartsProps) {
  const chartData = useMemo(() => {
    // Group by day
    const aggregated = data.reduce((acc, curr) => {
      const dateRaw = new Date(curr.data);
      const day = format(dateRaw, "dd/MMM", { locale: ptBR });
      if (!acc[day]) acc[day] = { name: day, alcance: 0, impressoes: 0, timestamp: dateRaw.getTime() };
      acc[day].alcance += curr.alcance;
      acc[day].impressoes += curr.impressoes;
      return acc;
    }, {} as Record<string, { name: string; alcance: number; impressoes: number; timestamp: number }>);
    
    // Sort by chronological date
    return Object.values(aggregated).sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  return (
    <div className="md:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-700">
          Evolução Diária: Alcance vs. Impressões
        </h3>
        <div className="flex gap-4 text-[10px] font-bold uppercase hidden sm:flex">
          <span className="flex items-center gap-1 text-indigo-500">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Alcance
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <div className="w-2 h-2 rounded-full bg-sky-400"></div> Impressões
          </span>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorImpressoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAlcance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => formatNumber(val)} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
               labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
            <Area type="monotone" dataKey="impressoes" name="Impressões" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorImpressoes)" />
            <Area type="monotone" dataKey="alcance" name="Alcance" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorAlcance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FormatBarChart({ data }: ChartsProps) {
  const chartData = useMemo(() => {
    const aggregated = data.reduce((acc, curr) => {
      if (!acc[curr.tipo]) acc[curr.tipo] = { tipo: curr.tipo, engajamentoSum: 0, count: 0 };
      acc[curr.tipo].engajamentoSum += curr.engajamento;
      acc[curr.tipo].count += 1;
      return acc;
    }, {} as Record<string, { tipo: string; engajamentoSum: number; count: number }>);
    return Object.values(aggregated).map(d => ({
      name: d.tipo,
      Engajamento: Number((d.engajamentoSum / d.count).toFixed(2))
    }));
  }, [data]);

  return (
    <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-700">
          Engajamento por Formato (%)
        </h3>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="Engajamento" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function InteractionsDonutChart({ data }: ChartsProps) {
  const chartData = useMemo(() => {
    let curtidas = 0;
    let comentarios = 0;
    let compartilhamentos = 0;
    data.forEach(d => {
      curtidas += d.curtidas;
      comentarios += d.comentarios;
      compartilhamentos += d.compartilhamentos;
    });

    return [
      { name: "Curtidas", value: curtidas },
      { name: "Comentários", value: comentarios },
      { name: "Compartilhamentos", value: compartilhamentos }
    ].filter(i => i.value > 0);
  }, [data]);

  return (
    <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center h-[350px]">
      <h3 className="text-sm font-bold text-slate-700 w-full mb-2">
        Mix de Interações
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
