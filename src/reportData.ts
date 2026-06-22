import { SocialPostInfo } from "./types";

/**
 * ============================================================================
 * 📊 DADOS DO DASHBOARD DE REDES SOCIAIS (INSTRUÇÕES DE ATUALIZAÇÃO)
 * ============================================================================
 * 
 * Prezado(a) Analista/Gestor,
 * 
 * Este é o ARQUIVO CENTRAL de dados que alimenta o Dashboard. 
 * Para incluir novas quinzenas ou novas postagens, basta adicionar um novo objeto
 * (bloco de código entre chaves `{...}`) dentro do array `reportData` abaixo,
 * seguindo a MESMA estrutura lógica.
 * 
 * 💡 Como o painel é dinâmico, ao adicionar uma nova "quinzena" (ex: "2026 - Julho (1ª Quinzena)"),
 * o filtro superior do site já reconhecerá automaticamente este novo período e ajustará 
 * todos os gráficos, cards e tabelas correspondentes!
 * 
 * ============================================================================
 */

export const reportData: SocialPostInfo[] = [
  {
    id: "post-1",
    quinzena: "2026 - Junho (1ª Quinzena)",
    rede: "Facebook",
    tipo: "Carrossel",
    categoria: "INSTITUCIONAL",
    subGrupo: "Marcas Proprias",
    data: "2026-06-08T14:00:00",
    alcance: 7686,
    impressoes: 11759,
    interacoes: 81,
    curtidas: 79,
    comentarios: 2,
    compartilhamentos: 0,
    engajamento: 1.05,
    link: "https://www.facebook.com/photo?fbid=1341102488150661&set=pcb.1341102641483979",
    criativo: "Publicação Institucional - 08/06"
  },
  {
    id: "post-2",
    quinzena: "2026 - Junho (1ª Quinzena)",
    rede: "Instagram Feed",
    tipo: "Reels",
    categoria: "INSTITUCIONAL",
    subGrupo: "Marcas Proprias",
    data: "2026-06-08T14:00:00",
    alcance: 80238,
    impressoes: 101640,
    interacoes: 1352,
    curtidas: 1112,
    comentarios: 68,
    compartilhamentos: 119,
    engajamento: 1.68,
    link: "https://www.instagram.com/p/DZVNJCYDLPM/",
    criativo: "Publicação Institucional - 08/06"
  },
  {
    id: "post-3",
    quinzena: "2026 - Junho (1ª Quinzena)",
    rede: "Instagram Stories",
    tipo: "Stories",
    categoria: "INSTITUCIONAL",
    subGrupo: "Marcas Proprias",
    data: "2026-06-08T14:00:00",
    alcance: 79286,
    impressoes: 95452,
    interacoes: 4025,
    curtidas: 197,
    comentarios: 17,
    compartilhamentos: 3,
    engajamento: 5.08,
    link: "",
    criativo: "Publicação Institucional - 08/06"
  },
    {
    id: "post-4",
    quinzena: "2026 - Junho (1ª Quinzena)",
    rede: "Instagram Stories",
    tipo: "Stories",
    categoria: "INSTITUCIONAL",
    subGrupo: "Marcas Proprias | Blog",
    data: "2026-06-11T14:00:00",
    alcance: 53145,
    impressoes: 60509,
    interacoes: 883,
    curtidas: 179,
    comentarios: 15,
    compartilhamentos: 7,
    engajamento: 1.66,
    link: "",
    criativo: "Publicação Institucional Blog - 08/06"
  },
  {
    id: "post-5",
    quinzena: "2026 - Junho (1ª Quinzena)",
    rede: "TikTok",
    tipo: "Vídeo",
    categoria: "INSTITUCIONAL",
    subGrupo: "Marcas Proprias",
    data: "2026-06-08T14:00:00",
    alcance: 1777,
    impressoes: 0,
    interacoes: 65,
    curtidas: 64,
    comentarios: 1,
    compartilhamentos: 0,
    engajamento: 3.66,
    link: "https://www.tiktok.com/@assaiatacadistaoficial/video/7649070683145669906",
    criativo: "Publicação Institucional - 08/06"
  }
];
