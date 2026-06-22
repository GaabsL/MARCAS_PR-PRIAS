export interface SocialPostMetrics {
  alcance: number;
  impressoes: number;
  interacoes: number;
  curtidas: number;
  comentarios: number;
  compartilhamentos: number;
  engajamento: number;
}

export interface SocialPostInfo extends SocialPostMetrics {
  id: string;
  quinzena: string;
  rede: "Facebook" | "Instagram" | string;
  tipo: string;
  categoria: string;
  subGrupo: string;
  data: string; // ISO 8601 string format: YYYY-MM-DDTHH:mm:ss
  link: string;
  criativo: string;
}
