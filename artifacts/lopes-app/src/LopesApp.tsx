import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const WEBHOOK_URL = "https://seu-webhook.exemplo.com/lopes-pedidos";
const PAYMENT_URL = "https://link-de-pagamento.exemplo.com/lopes";

const BASE = import.meta.env.BASE_URL;

function img(path: string) {
  return BASE.replace(/\/$/, "") + "/images/" + path;
}

export function LopesApp() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    title: string;
    fabric: string;
    image: string;
  } | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [corretorName, setCorretorName] = useState("");
  const [unidade, setUnidade] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formError, setFormError] = useState("");

  const products = [
    { id: 1, title: "CAMISA POLO MASCULINA", fabric: "Piquet Pima com elastano", image: img("polo-1.png") },
    { id: 2, title: "CAMISA POLO MASCULINA", fabric: "Cotton Pima com elastano", image: img("polo-2.png") },
    { id: 3, title: "CAMISA POLO MASCULINA", fabric: "Piquet Egípcio premium", image: img("polo-3.png") },
    { id: 4, title: "CAMISA POLO FEMININA", fabric: "Piquet Pima com elastano", image: img("polo-4.png") },
    { id: 5, title: "CAMISA POLO FEMININA", fabric: "Cotton Pima com elastano", image: img("polo-5.png") },
    { id: 6, title: "CAMISA POLO FEMININA", fabric: "Piquet Egípcio premium", image: img("polo-6.png") },
  ];

  const unidades = ["BUENO", "MARISTA", "JARDIM GOIÁS", "OESTE", "GESTÃO PATRIMONIAL"];
  const sizes = ["P", "M", "G", "GG", "GGG"];

  const openDrawer = (product: typeof products[0]) => {
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
      }],
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // fire-and-forget
    }

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
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const css = `
    :root {
      --black: #0A0A0A;
      --white: #FFFFFF;
      --gray-light: #F0EFED;
      --gray-mid: #C8C5BE;
      --gray-dark: #5A5A5A;
    }
    * { box-sizing: border-box; border-radius: 0 !important; }
    .font-anton { font-family: 'Anton', sans-serif; text-transform: uppercase; letter-spacing: -0.02em; }
    .font-barlow { font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; }
    .filter-gs { filter: grayscale(100%) contrast(108%) brightness(95%); }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ticker { animation: marquee 20s linear infinite; will-change: transform; }
    .ticker-slow { animation: marquee 28s linear infinite; will-change: transform; }
    .card-wrap:hover .card-img { transform: scale(1.02); }
    .card-img { transition: transform 0.3s ease; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-track { background: #F0EFED; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #0A0A0A; }
    .noise::before {
      content: ""; position: absolute; inset: 0; opacity: 0.35; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
    .anim-in { animation: fadeSlideIn 0.4s ease forwards; }
  `;

  return (
    <div
      className="min-h-screen bg-white text-[#0A0A0A] overflow-x-hidden selection:bg-[#0A0A0A] selection:text-white"
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

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
            <div className="flex-1 flex flex-col justify-end p-6 md:p-10 bg-[#C8C5BE]">
              <p className="font-barlow text-[12px] md:text-[14px] leading-tight font-medium tracking-[0.08em] text-[#0A0A0A] mb-8 max-w-[280px]">
                LOPES PROPOSES HIGH-PERFORMANCE PIECES DEVELOPED WITH PREMIUM MATERIALS FOR OUR CORPORATE ELITE.
              </p>
              <a
                href="#colecao"
                className="bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] py-3 px-6 font-barlow font-bold text-[14px] tracking-[0.12em] flex items-center justify-between w-full hover:bg-white hover:text-[#0A0A0A] transition-colors duration-150"
              >
                <span>VER COLEÇÃO</span>
                <span>▶</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col bg-white">
            <div className="px-4 py-2 md:px-8 md:py-4 border-b-2 border-[#0A0A0A] overflow-hidden whitespace-nowrap">
              <h1 className="font-anton text-[clamp(80px,12vw,160px)] leading-[0.88] text-[#0A0A0A] m-0 p-0 translate-y-2">
                ALWAYS LOPES
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
            {[0,1,2,3].map(i => (
              <span key={i} className="mx-4">IN ORDER TO KEEP THE BRAND STANDARD ✳ LOPES UNIFORMES ✳ PERFORMANCE PREMIUM ✳ CORPORATE ELITE ✳</span>
            ))}
          </div>
        </section>

        {/* SLANTED TICKER */}
        <div className="relative w-full h-0 z-10 pointer-events-none">
          <div className="absolute top-[-30px] left-[-5%] w-[110%] bg-[#0A0A0A] text-white overflow-hidden flex items-center py-2 shadow-2xl pointer-events-auto" style={{ transform: "rotate(-3deg)" }}>
            <div className="flex whitespace-nowrap ticker-slow font-barlow text-[14px] font-bold tracking-[0.1em] opacity-90">
              {[0,1,2,3].map(i => (
                <span key={i} className="mx-4" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>
                  SPECIAL ARCHIVE ARCHITECTS ✳ DESIGNED FOR SUCCESS ✳ LOPES IMOBILIÁRIA ✳
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
            {products.map((product) => (
              <div key={product.id} className="card-wrap flex flex-col border-b border-r border-l border-[#D0CFC9] p-4 bg-white hover:bg-[#F0EFED] transition-colors duration-300">
                <div className="aspect-[2/3] w-full overflow-hidden bg-[#F0EFED] border border-[#D0CFC9] mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover filter-gs card-img"
                  />
                </div>
                <div className="flex flex-col flex-1 font-barlow text-[#0A0A0A]">
                  <h3 className="font-bold text-[16px] tracking-[0.06em] leading-tight mb-1">{product.title}</h3>
                  <p className="font-medium text-[11px] tracking-[0.10em] text-[#5A5A5A] mb-6">{product.fabric}</p>
                  <div className="mt-auto">
                    <button
                      onClick={() => openDrawer(product)}
                      className="text-[12px] font-bold tracking-[0.12em] flex items-center hover:opacity-60 transition-opacity"
                    >
                      SELECIONAR MODELO <span className="ml-2 text-[10px]">▶</span>
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
            <h2 className="font-anton text-[clamp(40px,6vw,80px)] leading-[0.85] text-white max-w-[800px] mb-4 drop-shadow-lg">
              REAL PERFORMANCE FOR A CORPORATE MASTERPIECE
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
              OFFICINE LOPES
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#333333] pt-6 font-barlow text-[10px] tracking-[0.1em]">
            <div className="flex space-x-6 mb-4 md:mb-0 text-[#888888]">
              <span className="hover:text-white transition-colors cursor-default">POLÍTICA DE PRIVACIDADE</span>
              <span className="hover:text-white transition-colors cursor-default">TERMOS</span>
              <span className="hover:text-white transition-colors cursor-default">CONTATO INTERNO</span>
            </div>
            <div className="text-[#666666]">© 2026 LOPES IMOBILIÁRIA. TODOS OS DIREITOS RESERVADOS.</div>
          </div>
        </footer>
      </main>

      {/* ORDER DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

          <div className="relative w-full max-w-[480px] bg-[#F0EFED] border-l-2 border-[#0A0A0A] h-full shadow-2xl flex flex-col custom-scroll overflow-y-auto">
            {/* Drawer Header */}
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
                          {selectedProduct?.title}<br/>
                          <span className="text-[10px]">{selectedProduct?.fabric}</span>
                        </span>
                        <span className="font-bold">{quantity}x</span>
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
                  {/* Product preview */}
                  <div className="flex gap-4 mb-8 bg-white border-2 border-[#0A0A0A] p-2">
                    <div className="w-20 aspect-[2/3] bg-gray-100 border border-[#D0CFC9] overflow-hidden flex-shrink-0">
                      <img src={selectedProduct?.image} alt="Produto" className="w-full h-full object-cover filter-gs" />
                    </div>
                    <div className="flex flex-col justify-center font-barlow pt-2">
                      <p className="font-bold text-[16px] leading-none mb-1">{selectedProduct?.title}</p>
                      <p className="font-medium text-[12px] text-[#5A5A5A] tracking-[0.05em]">{selectedProduct?.fabric}</p>
                    </div>
                  </div>

                  {/* Quantity */}
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

                  {/* Size */}
                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-3">TAMANHO</label>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => { setSelectedSize(size); setFormError(""); }}
                          className={`flex-1 border-2 border-[#0A0A0A] py-3 font-barlow font-bold text-[13px] tracking-[0.06em] transition-colors duration-150 ${
                            selectedSize === size
                              ? "bg-[#0A0A0A] text-white"
                              : "bg-white text-[#0A0A0A] hover:bg-[#F0EFED]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Corretor */}
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

                  {/* Unidade */}
                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-3">UNIDADE</label>
                    <div className="grid grid-cols-2 gap-2">
                      {unidades.map((u) => (
                        <button
                          key={u}
                          onClick={() => { setUnidade(u); setFormError(""); }}
                          className={`border-2 border-[#0A0A0A] py-3 px-2 font-barlow font-bold text-[11px] tracking-[0.06em] leading-tight transition-colors duration-150 ${
                            unidade === u
                              ? "bg-[#0A0A0A] text-white"
                              : "bg-white text-[#0A0A0A] hover:bg-[#F0EFED]"
                          } ${u === "GESTÃO PATRIMONIAL" ? "col-span-2" : ""}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fixed details */}
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

                  {/* Error */}
                  {formError && (
                    <div className="mb-4 border-2 border-red-600 bg-red-50 p-3 font-barlow font-bold text-[12px] tracking-[0.06em] text-red-600">
                      {formError}
                    </div>
                  )}

                  {/* Submit */}
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
