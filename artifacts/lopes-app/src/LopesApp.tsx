import React, { useState, useEffect, useCallback } from "react";
import { Menu, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const WEBHOOK_URL = "https://seu-webhook.exemplo.com/lopes-pedidos";
const PAYMENT_URL = "https://link-de-pagamento.exemplo.com/lopes";

const BASE = import.meta.env.BASE_URL;
function img(path: string) {
  return BASE.replace(/\/$/, "") + "/images/" + path;
}

type ProductDescription = {
  summary: string;
  composition: string;
  highlights: string[];
  usability: string[];
};

type Product = {
  id: number;
  title: string;
  fabric: string;
  image: string;
  gallery: { src: string; label: string; objectPosition: string }[];
  specs: { key: string; value: string }[];
  price: number;
  description: ProductDescription;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "CAMISA POLO MASCULINA",
    fabric: "Piquet Pima com elastano",
    image: img("polo-1.png"),
    price: 99.90,
    gallery: [
      { src: img("polo-1.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-masculino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-1-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "MASCULINO" },
      { key: "TECIDO", value: "PIQUET PIMA" },
      { key: "COMPOSIÇÃO", value: "95% ALGODÃO PIMA 5% ELASTANO EXTRA" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "Polo premium confeccionada com tecido piquet de algodão Pima peruano e elastano, oferecendo toque extra macio, elasticidade ideal e caimento impecável. Uma peça básica essencial, produzida com a matéria-prima mais nobre do mundo: o algodão de fibra longa, altamente durável e resistente.\n\nSeu visual clean e acabamento refinado fazem da polo a base ideal para qualquer coleção de marca, valorizando o produto final com sofisticação e conforto.",
      composition: "95% algodão Pima, 5% elastano extra",
      highlights: [
        "Tecido piquet com toque macio e textura clássica",
        "Fibra longa que proporciona resistência, durabilidade e brilho natural",
        "Leve elasticidade que garante liberdade de movimento",
        "Modelagem com caimento perfeito que se adapta ao corpo",
        "Estrutura premium ideal para coleções sofisticadas e personalizações de alto padrão"
      ],
      usability: [
        "Ideal para visuais casuais elegantes, ambientes profissionais e eventos informais",
        "Combina com jeans, sarja e alfaiataria",
        "Pode ser utilizada como uniforme premium com identidade de marca"
      ]
    }
  },
  {
    id: 2,
    title: "CAMISA POLO MASCULINA",
    fabric: "Cotton Pima com elastano",
    image: img("polo-2.png"),
    price: 99.90,
    gallery: [
      { src: img("polo-2.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-masculino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-2-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "MASCULINO" },
      { key: "TECIDO", value: "COTTON PIMA" },
      { key: "COMPOSIÇÃO", value: "92,5% ALGODÃO PIMA 7,5% ELASTANO" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "A Polo Cotton Pima com Elastano Lisa combina o toque nobre do algodão Pima com a flexibilidade do elastano, resultando em uma peça premium que une conforto absoluto, caimento perfeito e durabilidade superior.\n\nSeu design minimalista e acabamento refinado tornam esta polo indispensável para quem valoriza sofisticação em cada detalhe.",
      composition: "92,5% algodão Pima, 7,5% elastano",
      highlights: [
        "Tecido nobre de algodão Pima com extrema suavidade e resistência",
        "Elastano para maior conforto e liberdade de movimento",
        "Gola estruturada com fechamento clássico em botões",
        "Modelagem slim fit",
        "Toque macio, respirável e altamente durável"
      ],
      usability: [
        "Ideal para ambientes casuais elegantes, trabalho, jantares e viagens",
        "Combina com chino, jeans escuro e bermuda de sarja",
        "Pode ser usada sozinha ou com blazer leve",
        "Visual sofisticado, moderno e versátil"
      ]
    }
  },
  {
    id: 3,
    title: "CAMISA POLO MASCULINA",
    fabric: "Piquet Egípcio premium",
    image: img("polo-3.png"),
    price: 89.90,
    gallery: [
      { src: img("polo-3.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-masculino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-3-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "MASCULINO" },
      { key: "TECIDO", value: "PIQUET EGÍPCIO" },
      { key: "COMPOSIÇÃO", value: "100% ALGODÃO EGÍPCIO" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "A Polo Piquet Egípcio Premium é uma peça essencial para marcas que buscam elevar o padrão da coleção com qualidade real e acabamento refinado.\n\nConfeccionada em 100% algodão egípcio, oferece toque macio, respirabilidade natural e durabilidade superior. O piquet premium garante estrutura, conforto térmico e uma estética clássica que nunca sai de moda.",
      composition: "100% algodão egípcio",
      highlights: [
        "Malha piquet premium em algodão egípcio",
        "Fibras longas com toque macio e maior resistência",
        "Excelente respirabilidade",
        "Estrutura encorpada com caimento equilibrado",
        "Conforto térmico para diferentes climas",
        "Acabamento refinado e alta durabilidade",
        "Baixo índice de deformação"
      ],
      usability: [
        "Ideal para uso casual elegante, trabalho, eventos e uniformização premium",
        "Combina com jeans, chino, sarja e alfaiataria leve",
        "Excelente para ambientes corporativos modernos e públicos exigentes"
      ]
    }
  },
  {
    id: 4,
    title: "CAMISA POLO FEMININA",
    fabric: "Piquet Pima com elastano",
    image: img("polo-4.png"),
    price: 99.90,
    gallery: [
      { src: img("polo-4.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-feminino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-4-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "FEMININO" },
      { key: "TECIDO", value: "PIQUET PIMA" },
      { key: "COMPOSIÇÃO", value: "95% ALGODÃO PIMA 5% ELASTANO EXTRA" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "Polo premium confeccionada com tecido piquet de algodão Pima peruano e elastano, oferecendo toque extra macio, elasticidade ideal e caimento impecável. Uma peça básica essencial, produzida com a matéria-prima mais nobre do mundo: o algodão de fibra longa, altamente durável e resistente.\n\nSeu visual clean e acabamento refinado fazem da polo a base ideal para qualquer coleção de marca, valorizando o produto final com sofisticação e conforto.",
      composition: "95% algodão Pima, 5% elastano extra",
      highlights: [
        "Tecido piquet com toque macio e textura clássica",
        "Fibra longa que proporciona resistência, durabilidade e brilho natural",
        "Leve elasticidade que garante liberdade de movimento",
        "Modelagem com caimento perfeito que se adapta ao corpo",
        "Estrutura premium ideal para coleções sofisticadas e personalizações de alto padrão"
      ],
      usability: [
        "Ideal para visuais casuais elegantes, ambientes profissionais e eventos informais",
        "Combina com jeans, sarja e alfaiataria",
        "Pode ser utilizada como uniforme premium com identidade de marca"
      ]
    }
  },
  {
    id: 5,
    title: "CAMISA POLO FEMININA",
    fabric: "Cotton Pima com elastano",
    image: img("polo-5.png"),
    price: 99.90,
    gallery: [
      { src: img("polo-5.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-feminino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-5-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "FEMININO" },
      { key: "TECIDO", value: "COTTON PIMA" },
      { key: "COMPOSIÇÃO", value: "92,5% ALGODÃO PIMA 7,5% ELASTANO" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "A Polo Cotton Pima com Elastano Lisa combina o toque nobre do algodão Pima com a flexibilidade do elastano, resultando em uma peça premium que une conforto absoluto, caimento perfeito e durabilidade superior.\n\nSeu design minimalista e acabamento refinado tornam esta polo indispensável para quem valoriza sofisticação em cada detalhe.",
      composition: "92,5% algodão Pima, 7,5% elastano",
      highlights: [
        "Tecido nobre de algodão Pima com extrema suavidade e resistência",
        "Elastano para maior conforto e liberdade de movimento",
        "Gola estruturada com fechamento clássico em botões",
        "Modelagem slim fit",
        "Toque macio, respirável and altamente durável"
      ],
      usability: [
        "Ideal para ambientes casuais elegantes, trabalho, jantares e viagens",
        "Combina com chino, jeans escuro e bermuda de sarja",
        "Pode ser usada sozinha ou com blazer leve",
        "Visual sofisticado, moderno e versátil"
      ]
    }
  },
  {
    id: 6,
    title: "CAMISA POLO FEMININA",
    fabric: "Piquet Egípcio premium",
    image: img("polo-6.png"),
    price: 89.90,
    gallery: [
      { src: img("polo-6.png"), label: "VISÃO GERAL", objectPosition: "center center" },
      { src: img("costas-feminino.png"), label: "COSTAS / DETALHES", objectPosition: "center center" },
      { src: img("bordado-closeup.png"), label: "BORDADO", objectPosition: "center center" },
      { src: img("polo-6-detail.png"), label: "TECIDO", objectPosition: "center center" },
    ],
    specs: [
      { key: "GÊNERO", value: "FEMININO" },
      { key: "TECIDO", value: "PIQUET EGÍPCIO" },
      { key: "COMPOSIÇÃO", value: "100% ALGODÃO EGÍPCIO" },
      { key: "COR", value: "PRETA" },
      { key: "BORDADO", value: "3.5CM" }
    ],
    description: {
      summary: "A Polo Piquet Egípcio Premium é uma peça essencial para marcas que buscam elevar o padrão da coleção com qualidade real e acabamento refinado.\n\nConfeccionada em 100% algodão egípcio, oferece toque macio, respirabilidade natural e durabilidade superior. O piquet premium garante estrutura, conforto térmico e uma estética clássica que nunca sai de moda.",
      composition: "100% algodão egípcio",
      highlights: [
        "Malha piquet premium em algodão egípcio",
        "Fibras longas com toque macio e maior resistência",
        "Excelente respirabilidade",
        "Estrutura encorpada com caimento equilibrado",
        "Conforto térmico para diferentes climas",
        "Acabamento refinado e alta durabilidade",
        "Baixo índice de deformação"
      ],
      usability: [
        "Ideal para uso casual elegante, trabalho, eventos e uniformização premium",
        "Combina com jeans, chino, sarja e alfaiataria leve",
        "Excelente para ambientes corporativos modernos e públicos exigentes"
      ]
    }
  },
];

const UNIDADES = ["BUENO", "MARISTA", "JARDIM GOIÁS", "OESTE", "GESTÃO PATRIMONIAL"];
const SIZES = ["P", "M", "G", "GG", "GGG"];

const CSS = `
  :root { --black:#0A0A0A; --white:#FFFFFF; --gl:#F0EFED; --gm:#C8C5BE; --gd:#5A5A5A; }
  * { box-sizing:border-box; border-radius:0 !important; }
  .font-anton { font-family:'Anton',sans-serif; text-transform:uppercase; letter-spacing:-0.02em; }
  .font-barlow { font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; }
  .filter-gs { filter:grayscale(100%) contrast(108%) brightness(95%); transition:filter 0.4s ease; }
  .filter-gs:hover, .card-wrap:hover .filter-gs, .group:hover .filter-gs { filter:grayscale(0%) contrast(100%) brightness(100%); }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker { animation:marquee 20s linear infinite; will-change:transform; }
  .ticker-slow { animation:marquee 28s linear infinite; will-change:transform; }
  .card-wrap:hover .card-img { transform:scale(1.02); }
  .card-img { transition:transform 0.3s ease; }
  .custom-scroll::-webkit-scrollbar { width:4px; }
  .custom-scroll::-webkit-scrollbar-track { background:#F0EFED; }
  .custom-scroll::-webkit-scrollbar-thumb { background:#0A0A0A; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeSlideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
  .anim-in { animation:fadeSlideIn 0.4s ease forwards; }
  .page-in { animation:fadeUp 0.35s ease forwards; }
  .thumb-active { outline:2px solid #0A0A0A; outline-offset:2px; }
`;

/* ─── Product Page ──────────────────────────────────────────── */
function ProductPage({
  product,
  onClose,
  onOrder,
}: {
  product: Product;
  onClose: () => void;
  onOrder: (p: Product) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = useCallback(() => setActiveIdx(i => (i - 1 + product.gallery.length) % product.gallery.length), [product]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % product.gallery.length), [product]);

  useEffect(() => {
    setActiveIdx(0);
  }, [product.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  const active = product.gallery[activeIdx];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto page-in" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 h-12 bg-white border-b-2 border-[#0A0A0A] flex items-center justify-between px-4 md:px-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-barlow font-bold text-[12px] tracking-[0.12em] hover:opacity-50 transition-opacity"
        >
          <ArrowLeft size={14} />
          VOLTAR À COLEÇÃO
        </button>
        <div className="font-anton text-lg leading-none">LOPES IMOBILIÁRIA</div>
        <div className="font-barlow text-[11px] tracking-[0.1em] text-[#C8C5BE]">INTERNO</div>
      </div>

      <div className="max-w-[1280px] mx-auto border-x-2 border-[#0A0A0A]">
        {/* Breadcrumb */}
        <div className="border-b border-[#D0CFC9] px-6 md:px-10 py-3 flex items-center gap-2 font-barlow text-[11px] tracking-[0.1em] text-[#5A5A5A]">
          <button onClick={onClose} className="hover:text-[#0A0A0A] transition-colors">COLEÇÃO</button>
          <span>›</span>
          <span className="text-[#0A0A0A] font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-[#0A0A0A]">
          {/* Gallery panel */}
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[#0A0A0A] flex flex-col bg-[#F0EFED]">
            {/* Main image */}
            <div className="relative overflow-hidden bg-[#F0EFED]" style={{ aspectRatio: "3/4" }}>
              <img
                key={activeIdx}
                src={active.src}
                alt={product.title}
                className="w-full h-full object-cover filter-gs page-in"
                style={{ objectPosition: active.objectPosition }}
              />

              {/* View label badge */}
              <div className="absolute top-4 left-4 bg-white border-2 border-[#0A0A0A] px-3 py-1">
                <span className="font-barlow font-bold text-[10px] tracking-[0.15em]">{active.label}</span>
              </div>

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-white border-2 border-[#0A0A0A] px-3 py-1">
                <span className="font-barlow font-bold text-[10px] tracking-[0.1em]">{activeIdx + 1}/{product.gallery.length}</span>
              </div>

              {/* Arrow buttons */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-2 border-[#0A0A0A] flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-2 border-[#0A0A0A] flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 p-4 border-t-2 border-[#0A0A0A] bg-white">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`flex-1 overflow-hidden border-2 border-[#0A0A0A] bg-[#F0EFED] ${i === activeIdx ? "thumb-active" : "opacity-50 hover:opacity-80 transition-opacity"}`}
                  style={{ aspectRatio: "2/3" }}
                  aria-label={g.label}
                >
                  <img
                    src={g.src}
                    alt={g.label}
                    className="w-full h-full object-cover filter-gs"
                    style={{ objectPosition: g.objectPosition }}
                  />
                </button>
              ))}
            </div>

            {/* Thumb labels */}
            <div className="flex gap-2 px-4 pb-4 bg-white">
              {product.gallery.map((g, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className={`font-barlow text-[9px] tracking-[0.08em] ${i === activeIdx ? "text-[#0A0A0A] font-bold" : "text-[#C8C5BE]"}`}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col custom-scroll overflow-y-auto">
            {/* Product header */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-10">
              <p className="font-barlow font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] mb-2">
                LOPES IMOBILIÁRIA — COLEÇÃO CORPORATIVA
              </p>
              <h1 className="font-anton text-[clamp(32px,4vw,56px)] leading-[0.9] mb-3">{product.title}</h1>
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-barlow font-medium text-[14px] tracking-[0.08em] text-[#5A5A5A]">{product.fabric}</p>
                <p className="font-anton text-2xl text-[#0A0A0A]">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            {/* Description Block */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-10 font-barlow">
              <p className="font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] mb-4">SOBRE O PRODUTO</p>
              <p className="text-[14px] leading-relaxed text-[#0A0A0A] mb-5 tracking-[0.02em] normal-case font-medium whitespace-pre-line">
                {product.description.summary}
              </p>

              <div className="mb-5">
                <span className="font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] block mb-1">COMPOSIÇÃO</span>
                <span className="text-[14px] font-bold text-[#0A0A0A] tracking-wide">{product.description.composition}</span>
              </div>

              <div className="mb-5">
                <span className="font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] block mb-2">DIFERENCIAIS TÉCNICOS</span>
                <ul className="list-disc list-inside text-[13px] text-[#0A0A0A] space-y-1 normal-case leading-relaxed font-medium">
                  {product.description.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] block mb-2">USABILIDADE E COMBINAÇÕES</span>
                <ul className="list-disc list-inside text-[13px] text-[#0A0A0A] space-y-1 normal-case leading-relaxed font-medium">
                  {product.description.usability.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specs table */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-10">
              <p className="font-barlow font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] mb-4">ESPECIFICAÇÕES</p>
              <div className="divide-y divide-[#E5E5E5]">
                {product.specs.map((s) => (
                  <div key={s.key} className="flex justify-between py-3 font-barlow text-[13px] tracking-wide">
                    <span className="text-[#5A5A5A]">{s.key}</span>
                    <span className="font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed note */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-10 bg-[#F0EFED]">
              <div className="flex items-start gap-4">
                <span className="text-red-600 text-2xl font-bold mt-0.5">✳</span>
                <div className="font-barlow text-[12px] leading-relaxed tracking-[0.06em] text-[#5A5A5A]">
                  <p className="font-bold text-[#0A0A0A] mb-1">PADRÃO LOPES — DETALHES FIXOS</p>
                  <p>Todas as peças são fornecidas exclusivamente na <strong className="text-[#0A0A0A]">COR PRETA</strong> com <strong className="text-[#0A0A0A]">BORDADO DE 3.5CM</strong> posicionado conforme padrão corporativo.</p>
                </div>
              </div>
            </div>

            {/* Size guide */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-10">
              <p className="font-barlow font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] mb-4">TAMANHOS DISPONÍVEIS</p>
              <div className="flex gap-2">
                {SIZES.map(s => (
                  <div key={s} className="flex-1 border-2 border-[#D0CFC9] py-2 text-center font-barlow font-bold text-[13px] text-[#5A5A5A]">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 md:p-10 mt-auto">
              <button
                onClick={() => onOrder(product)}
                className="w-full bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] py-5 font-anton text-2xl tracking-wide hover:bg-white hover:text-[#0A0A0A] transition-colors duration-150 flex items-center justify-between px-6"
              >
                <span>FAZER PEDIDO</span>
                <span>▶</span>
              </button>
              <p className="font-barlow text-[10px] tracking-[0.1em] text-[#C8C5BE] text-center mt-3">USO INTERNO — PORTAL DE UNIFORMES LOPES</p>
            </div>
          </div>
        </div>

        {/* Other products strip */}
        <div className="bg-white p-6 md:p-10">
          <p className="font-barlow font-bold text-[11px] tracking-[0.15em] text-[#5A5A5A] mb-4">OUTROS MODELOS</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PRODUCTS.filter(p => p.id !== product.id).map(p => (
              <button
                key={p.id}
                onClick={() => { window.scrollTo(0, 0); }}
                className="flex-shrink-0 w-28 text-left group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  className="w-full aspect-[2/3] overflow-hidden border-2 border-[#D0CFC9] mb-2 bg-[#F0EFED] group-hover:border-[#0A0A0A] transition-colors"
                  onClick={() => { setActiveIdx(0); onClose(); setTimeout(() => { }, 0); }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover filter-gs"
                    onClick={(e) => { e.stopPropagation(); }}
                  />
                </div>
                <p className="font-barlow font-bold text-[10px] tracking-[0.06em] leading-tight text-[#0A0A0A] group-hover:opacity-60 transition-opacity">{p.title}</p>
                <p className="font-barlow text-[9px] tracking-[0.05em] text-[#5A5A5A]">{p.fabric}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────────── */
export function LopesApp() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [productPage, setProductPage] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [corretorName, setCorretorName] = useState("");
  const [unidade, setUnidade] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formError, setFormError] = useState("");

  const openPage = (product: Product) => {
    setProductPage(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePage = () => setProductPage(null);

  const openDrawer = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
    setIsSuccess(false);
    setQuantity(1);
    setCorretorName("");
    setUnidade("");
    setSelectedSize("");
    setFormError("");
  };

  const handleCheckout = async () => {
    if (!corretorName.trim()) { setFormError("Preencha o nome do corretor."); return; }
    if (!unidade) { setFormError("Selecione a unidade."); return; }
    if (!selectedSize) { setFormError("Selecione o tamanho."); return; }
    setFormError("");
    setIsLoading(true);

    const id = "#LOPES-" + Math.floor(1000 + Math.random() * 9000);
    const payload = {
      corretor_nome: corretorName,
      unidade,
      pedido_id: id,
      produtos: [{
        modelo: selectedProduct!.title,
        tecido: selectedProduct!.fabric,
        tamanho: selectedSize,
        quantidade: quantity,
        cor: "Preta",
        detalhe: "Bordado 3.5cm",
        preco_unitario: selectedProduct!.price,
        valor_total: selectedProduct!.price * quantity
      }],
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch { /* fire-and-forget */ }

    setOrderId(id);
    setIsLoading(false);
    setIsSuccess(true);
  };

  const resetOrder = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setIsLoading(false);
      setSelectedProduct(null);
      setSelectedSize("");
      setFormError("");
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = (isDrawerOpen || productPage !== null) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen, productPage]);

  return (
    <div
      className="min-h-screen bg-white text-[#0A0A0A] overflow-x-hidden selection:bg-[#0A0A0A] selection:text-white"
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* PRODUCT PAGE OVERLAY */}
      {productPage && (
        <ProductPage
          product={productPage}
          onClose={closePage}
          onOrder={(p) => { closePage(); openDrawer(p); }}
        />
      )}

      {/* NAV */}
      <nav className="h-12 w-full bg-white border-b-2 border-[#0A0A0A] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <div className="flex-1 hidden md:flex items-center space-x-6 font-barlow text-[11px] font-bold tracking-[0.12em]">
          <a href="#colecao" className="hover:text-[#5A5A5A] transition-colors">COLEÇÃO</a>
          <a href="#colecao" className="hover:text-[#5A5A5A] transition-colors">TECIDOS</a>
        </div>
        <div className="font-anton text-xl leading-none flex-1 text-center">LOPES IMOBILIÁRIA</div>
        <div className="flex-1 hidden md:flex justify-end items-center space-x-6 font-barlow text-[11px] font-bold tracking-[0.12em]">
          <a href="#colecao" className="hover:text-[#5A5A5A] transition-colors">PEDIDO</a>
          <span className="text-[#C8C5BE]">INTERNO</span>
        </div>
        <div className="flex-1 flex justify-end md:hidden">
          <Menu size={20} color="#0A0A0A" />
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto border-x-2 border-[#0A0A0A] w-full bg-white">

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-[#0A0A0A]">
          <div className="col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-[#0A0A0A] flex flex-col min-h-[60vh] md:min-h-[80vh]">
            <div className="flex-1 flex items-center justify-center border-b-2 border-[#0A0A0A] p-8 bg-red-600">
              <span className="text-[80px] font-bold leading-none text-white">✳</span>
            </div>
            <div className="flex-1 flex flex-col justify-end p-6 md:p-10 bg-[#141414]">
              <p className="font-barlow text-[12px] md:text-[14px] leading-tight font-medium tracking-[0.08em] text-white mb-8 max-w-[280px]">
                Vista o padrão Lopes. Escolha suas peças e eleve o seu visual!
              </p>
              <a
                href="#colecao"
                className="bg-white text-[#0A0A0A] border-2 border-white py-3 px-6 font-barlow font-bold text-[14px] tracking-[0.12em] flex items-center justify-between w-full hover:bg-transparent hover:text-white transition-colors duration-150"
              >
                <span>VER COLEÇÃO</span>
                <span>▶</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col bg-white">
            <div className="px-4 py-2 md:px-8 md:py-4 border-b-2 border-[#0A0A0A] overflow-hidden whitespace-nowrap">
              <h1 className="font-anton text-[clamp(80px,12vw,160px)] leading-[0.88] text-[#0A0A0A] m-0 p-0 translate-y-2">
                SEMPRE LOPES
              </h1>
            </div>
            <div className="flex-1 bg-[#F0EFED] w-full relative min-h-[40vh] md:min-h-0 overflow-hidden">
              <img
                src={img("polo-1.png")}
                alt="Camisa Polo Lopes"
                className="w-full h-full object-cover filter-gs absolute inset-0 object-center"
              />
            </div>
          </div>
        </section>

        {/* TICKER 1 */}
        <section className="w-full bg-[#0A0A0A] text-white overflow-hidden flex items-center py-3 border-b-2 border-[#0A0A0A]">
          <div className="flex whitespace-nowrap ticker font-barlow text-[16px] font-bold tracking-[0.1em]">
            {[0, 1, 2, 3].map(i => (
              <span key={i} className="mx-4">QUALIDADE PARA QUEM MERERECE ✳ LOPES UNIFORMES ✳ ALTO PADRÃO ✳ A MAIOR DA AMÉRICA LATINA ✳</span>
            ))}
          </div>
        </section>

        {/* SLANTED TICKER */}
        <div className="relative w-full h-0 z-10 pointer-events-none">
          <div className="absolute top-[-30px] left-[-5%] w-[110%] bg-[#0A0A0A] text-white overflow-hidden flex items-center py-2 shadow-2xl pointer-events-auto" style={{ transform: "rotate(-3deg)" }}>
            <div className="flex whitespace-nowrap ticker-slow font-barlow text-[14px] font-bold tracking-[0.1em] opacity-90">
              {[0, 1, 2, 3].map(i => (
                <span key={i} className="mx-4" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>
                  ESPECIALMENTE PARA VOCÊ ✳ VISTA O SUCESSO ✳ LOPES IMOBILIÁRIA ✳
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CATALOG */}
        <section id="colecao" className="bg-white pt-16 md:pt-24 pb-20">
          <div className="border-t-2 border-[#0A0A0A] flex justify-between items-center py-4 px-6 md:px-10">
            <h2 className="font-anton text-4xl md:text-5xl">COLEÇÃO CORPORATIVA</h2>
            <span className="font-barlow font-bold text-[12px] tracking-[0.1em] text-[#C8C5BE]">6 MODELOS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 px-6 md:px-10 mt-6 border-t border-[#D0CFC9]">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="card-wrap flex flex-col border-b border-r border-l border-[#D0CFC9] p-4 bg-white hover:bg-[#F0EFED] transition-colors duration-300">
                {/* Clickable image → product page */}
                <button
                  onClick={() => openPage(product)}
                  className="aspect-[2/3] w-full overflow-hidden bg-[#F0EFED] border border-[#D0CFC9] mb-4 cursor-pointer relative group"
                  aria-label={`Ver galeria de ${product.title}`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover filter-gs card-img"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <span className="bg-white border-2 border-[#0A0A0A] px-4 py-2 font-barlow font-bold text-[11px] tracking-[0.1em]">VER GALERIA ✳</span>
                  </div>
                </button>

                <div className="flex flex-col flex-1 font-barlow text-[#0A0A0A]">
                  <h3 className="font-bold text-[16px] tracking-[0.06em] leading-tight mb-1">{product.title}</h3>
                  <div className="flex justify-between items-baseline mb-6">
                    <p className="font-medium text-[11px] tracking-[0.10em] text-[#5A5A5A]">{product.fabric}</p>
                    <p className="font-anton text-[16px] text-[#0A0A0A]">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <button
                      onClick={() => openDrawer(product)}
                      className="text-[12px] font-bold tracking-[0.12em] flex items-center hover:opacity-60 transition-opacity"
                    >
                      FAZER PEDIDO <span className="ml-2 text-[10px]">▶</span>
                    </button>
                    <button
                      onClick={() => openPage(product)}
                      className="text-[11px] font-medium tracking-[0.08em] text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors underline underline-offset-2"
                    >
                      VER FOTOS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDITORIAL BREAK */}
        <section className="relative w-full aspect-square md:aspect-[16/9] bg-[#0A0A0A] border-y-2 border-[#0A0A0A] overflow-hidden">
          <img
            src={img("editorial-hero.png")}
            alt="Editorial"
            className="w-full h-full object-cover filter-gs opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <h2 className="font-anton text-[clamp(40px,6vw,80px)] leading-[1.05] text-white max-w-[800px] mb-4 drop-shadow-lg">
              Vista a camisa de quem lidera o mercado
            </h2>
            <p className="font-barlow font-medium text-[12px] tracking-[0.15em] text-[#C8C5BE]">
              BORDADO 3.5CM — COR PRETA — EXCLUSIVO LOPES
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0A0A0A] text-white pt-20 pb-8 px-4 md:px-8">
          <div className="w-full flex justify-center mb-16 overflow-hidden">
            <h2 className="font-anton text-[clamp(48px,8vw,100px)] leading-none text-center w-full">
              OFICINA LOPES
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#333333] pt-6 font-barlow text-[10px] tracking-[0.1em]">
            <div className="flex space-x-6 mb-4 md:mb-0 text-[#888888]">
              <span className="hover:text-white transition-colors cursor-default">POLÍTICA DE PRIVACIDADE</span>
              <span className="hover:text-white transition-colors cursor-default">TERMOS</span>
              <span className="hover:text-white transition-colors cursor-default">CONTATO INTERNO</span>
            </div>
            <div className="text-[#666666]">DESENVOLVIDO POR LUIZ VILARINHO</div>
            <div className="text-[#666666]">© 2026 LOPES IMOBILIÁRIA. TODOS OS DIREITOS RESERVADOS.</div>
          </div>
        </footer>
      </main>

      {/* ORDER DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

          <div className="relative w-full max-w-[480px] bg-[#F0EFED] border-l-2 border-[#0A0A0A] h-full shadow-2xl flex flex-col custom-scroll overflow-y-auto">
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-8 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-anton text-4xl">{isSuccess ? "PEDIDO CONFIRMADO" : "SEU PEDIDO"}</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="font-barlow font-bold text-[14px] hover:opacity-50 transition-opacity flex items-center justify-center border-2 border-[#0A0A0A] w-8 h-8 bg-white"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
              {isSuccess ? (
                <div className="flex flex-col h-full anim-in">
                  <div className="bg-white border-2 border-[#0A0A0A] p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0A0A0A] text-white flex items-center justify-center" style={{ transform: "rotate(12deg) translate(1rem,-1rem)" }}>
                      <span className="font-anton text-2xl" style={{ transform: "rotate(-12deg)" }}>✓</span>
                    </div>
                    <p className="font-barlow font-bold text-[#5A5A5A] text-[12px] tracking-[0.1em] mb-1">CÓDIGO DO PEDIDO</p>
                    <p className="font-anton text-3xl mb-6">{orderId}</p>
                    <div className="border-t-2 border-dotted border-[#C8C5BE] pt-6 space-y-4 font-barlow text-[14px] tracking-wide">
                      <div className="flex justify-between">
                        <span className="text-[#5A5A5A]">CORRETOR</span>
                        <span className="font-bold">{corretorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A5A5A]">UNIDADE</span>
                        <span className="font-bold">{unidade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A5A5A]">TAMANHO</span>
                        <span className="font-bold">{selectedSize}</span>
                      </div>
                      <div className="flex justify-between mt-4 pt-4 border-t border-[#E5E5E5]">
                        <span className="text-[#5A5A5A] max-w-[120px]">
                          {selectedProduct?.title}<br />
                          <span className="text-[10px]">{selectedProduct?.fabric}</span>
                        </span>
                        <span className="font-bold">{quantity}x</span>
                      </div>
                      <div className="flex justify-between mt-2 font-barlow text-[13px] tracking-wide">
                        <span className="text-[#5A5A5A]">PREÇO UNITÁRIO</span>
                        <span className="font-bold">R$ {selectedProduct?.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between mt-2 pt-2 border-t border-dashed border-[#C8C5BE] font-anton text-[16px] text-[#0A0A0A]">
                        <span>VALOR TOTAL</span>
                        <span>R$ {(selectedProduct ? selectedProduct.price * quantity : 0).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <a
                      href={PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] py-4 font-anton text-xl tracking-wide hover:bg-white hover:text-[#0A0A0A] transition-colors duration-150 flex items-center justify-between px-6"
                    >
                      <span>IR PARA PAGAMENTO</span>
                      <span>▶</span>
                    </a>
                    <button
                      onClick={resetOrder}
                      className="w-full bg-transparent text-[#0A0A0A] border-2 border-[#0A0A0A] py-3 font-barlow font-bold text-[12px] tracking-[0.12em] hover:bg-[#F0EFED] transition-colors duration-150"
                    >
                      NOVO PEDIDO
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex gap-4 mb-8 bg-white border-2 border-[#0A0A0A] p-2">
                    <div className="w-20 aspect-[2/3] bg-gray-100 border border-[#D0CFC9] overflow-hidden flex-shrink-0">
                      <img src={selectedProduct?.image} alt="Produto" className="w-full h-full object-cover filter-gs" />
                    </div>
                    <div className="flex flex-col justify-center font-barlow pt-2">
                      <p className="font-bold text-[16px] leading-none mb-1">{selectedProduct?.title}</p>
                      <p className="font-medium text-[12px] text-[#5A5A5A] tracking-[0.05em]">{selectedProduct?.fabric}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-2">QUANTIDADE</label>
                    <div className="flex border-2 border-[#0A0A0A] w-32 bg-white">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold border-r-2 border-[#0A0A0A] hover:bg-[#F0EFED]">−</button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 w-full text-center font-barlow font-bold text-[16px] outline-none appearance-none bg-white"
                      />
                      <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold border-l-2 border-[#0A0A0A] hover:bg-[#F0EFED]">+</button>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-3">TAMANHO</label>
                    <div className="flex gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => { setSelectedSize(size); setFormError(""); }}
                          className={`flex-1 border-2 border-[#0A0A0A] py-3 font-barlow font-bold text-[13px] tracking-[0.06em] transition-colors duration-150 ${selectedSize === size ? "bg-[#0A0A0A] text-white" : "bg-white text-[#0A0A0A] hover:bg-[#F0EFED]"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-2">NOME DO CORRETOR</label>
                    <input
                      type="text"
                      value={corretorName}
                      onChange={(e) => { setCorretorName(e.target.value); setFormError(""); }}
                      placeholder="NOME COMPLETO"
                      className="w-full bg-transparent border-b-2 border-[#0A0A0A] py-3 font-barlow font-medium text-[16px] tracking-[0.06em] placeholder:text-[#C8C5BE] focus:outline-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-3">UNIDADE</label>
                    <div className="grid grid-cols-2 gap-2">
                      {UNIDADES.map((u) => (
                        <button
                          key={u}
                          onClick={() => { setUnidade(u); setFormError(""); }}
                          className={`border-2 border-[#0A0A0A] py-3 px-2 font-barlow font-bold text-[11px] tracking-[0.06em] leading-tight transition-colors duration-150 ${unidade === u ? "bg-[#0A0A0A] text-white" : "bg-white text-[#0A0A0A] hover:bg-[#F0EFED]"
                            } ${u === "GESTÃO PATRIMONIAL" ? "col-span-2" : ""}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 border-2 border-[#D0CFC9] p-4 bg-white">
                    <p className="font-barlow font-bold text-[11px] tracking-[0.1em] text-[#5A5A5A] mb-3">DETALHES FIXOS</p>
                    <div className="space-y-2 font-barlow text-[13px] tracking-wide">
                      <div className="flex justify-between">
                        <span className="text-[#5A5A5A]">COR</span>
                        <span className="font-bold">PRETA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A5A5A]">BORDADO</span>
                        <span className="font-bold">3.5CM</span>
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <div className="mb-4 border-2 border-red-600 bg-red-50 p-3 font-barlow font-bold text-[12px] tracking-[0.06em] text-red-600">
                      {formError}
                    </div>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] py-4 font-anton text-xl tracking-wide hover:bg-white hover:text-[#0A0A0A] transition-colors duration-150 flex items-center justify-between px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span>PROCESSANDO</span>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>CONFIRMAR PEDIDO</span>
                          <span>▶</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
