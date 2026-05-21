import React, { useState, useEffect } from "react";
import { X, ChevronRight, Menu } from "lucide-react";

const WEBHOOK_URL = "https://seu-webhook.exemplo.com/lopes-pedidos";
const PAYMENT_URL = "https://link-de-pagamento.exemplo.com/lopes";

export function LopesApp() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [corretorName, setCorretorName] = useState("");
  const [unidade, setUnidade] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formError, setFormError] = useState("");

  const products = [
    {
      id: 1,
      title: "CAMISA POLO MASCULINA",
      fabric: "Piquet Pima com elastano",
      image: "/__mockup/images/polo-1.png",
      price: 99.90,
    },
    {
      id: 2,
      title: "CAMISA POLO MASCULINA",
      fabric: "Cotton Pima com elastano",
      image: "/__mockup/images/polo-2.png",
      price: 99.90,
    },
    {
      id: 3,
      title: "CAMISA POLO MASCULINA",
      fabric: "Piquet Egípcio premium",
      image: "/__mockup/images/polo-3.png",
      price: 89.90,
    },
    {
      id: 4,
      title: "CAMISA POLO FEMININA",
      fabric: "Piquet Pima com elastano",
      image: "/__mockup/images/polo-4.png",
      price: 99.90,
    },
    {
      id: 5,
      title: "CAMISA POLO FEMININA",
      fabric: "Cotton Pima com elastano",
      image: "/__mockup/images/polo-5.png",
      price: 99.90,
    },
    {
      id: 6,
      title: "CAMISA POLO FEMININA",
      fabric: "Piquet Egípcio premium",
      image: "/__mockup/images/polo-6.png",
      price: 89.90,
    },
  ];

  const unidades = ["BUENO", "MARISTA", "JARDIM GOIÁS", "OESTE", "GESTÃO PATRIMONIAL"];

  const sizes = ["P", "M", "G", "GG", "GGG"];

  const openDrawer = (product: any) => {
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
    if (!corretorName.trim()) {
      setFormError("Preencha o nome do corretor.");
      return;
    }
    if (!unidade) {
      setFormError("Selecione a unidade.");
      return;
    }
    if (!selectedSize) {
      setFormError("Selecione o tamanho.");
      return;
    }
    setFormError("");
    setIsLoading(true);

    const id = "#LOPES-" + Math.floor(1000 + Math.random() * 9000);
    const payload = {
      corretor_nome: corretorName,
      unidade,
      pedido_id: id,
      produtos: [
        {
          modelo: selectedProduct.title,
          tecido: selectedProduct.fabric,
          tamanho: selectedSize,
          quantidade: quantity,
          cor: "Preta",
          detalhe: "Bordado 3.5cm",
          preco_unitario: selectedProduct.price,
          valor_total: selectedProduct.price * quantity
        }
      ]
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Webhook failed — continue to success anyway (fire-and-forget)
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
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const cssString = `
    @font-face {
      font-family: 'Anton';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm3Kz-C8.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Barlow Condensed';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B43FT.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Barlow Condensed';
      font-style: normal;
      font-weight: 500;
      src: url(https://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B6xTru18.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Barlow Condensed';
      font-style: normal;
      font-weight: 700;
      src: url(https://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4xjru18.woff2) format('woff2');
    }

    :root {
      --color-black: #0A0A0A;
      --color-white: #FFFFFF;
      --color-gray-light: #F0EFED;
      --color-gray-mid: #C8C5BE;
      --color-gray-dark: #5A5A5A;
      --border-thick: 2px solid #0A0A0A;
      --border-light: 1px solid #D0CFC9;
    }

    * {
      box-sizing: border-box;
      border-radius: 0 !important;
    }

    .font-anton {
      font-family: 'Anton', sans-serif;
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }

    .font-barlow {
      font-family: 'Barlow Condensed', sans-serif;
      text-transform: uppercase;
    }

    .tracking-ui {
      letter-spacing: 0.12em;
    }

    .filter-grayscale {
      filter: grayscale(100%) contrast(108%) brightness(95%);
      transition: filter 0.4s ease;
    }
    .filter-grayscale:hover,
    .card-container:hover .filter-grayscale {
      filter: grayscale(0%) contrast(100%) brightness(100%);
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .animate-marquee {
      animation: marquee 20s linear infinite;
      will-change: transform;
    }

    .noise-bg {
      position: relative;
    }
    .noise-bg::before {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0.4;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .btn-invert {
      transition: background-color 0.15s, color 0.15s;
    }
    .btn-invert:hover {
      background-color: var(--color-white);
      color: var(--color-black);
    }
      
    .img-hover {
      transition: transform 0.3s ease;
    }
    .card-container:hover .img-hover {
      transform: scale(1.02);
    }
      
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #F0EFED;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #0A0A0A;
    }
  `;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] overflow-x-hidden selection:bg-[#0A0A0A] selection:text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />

      {/* 1. Navigation Bar */}
      <nav className="h-12 w-full bg-white border-b-2 border-[#0A0A0A] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <div className="flex-1 flex justify-start items-center space-x-6 hidden md:flex font-barlow text-[11px] font-bold tracking-[0.12em]">
          <a href="#" className="hover:text-[#5A5A5A] transition-colors">COLEÇÃO</a>
          <a href="#" className="hover:text-[#5A5A5A] transition-colors">TECIDOS</a>
        </div>
        
        <div className="font-anton text-xl leading-none flex-1 text-center">
          LOPES IMOBILIÁRIA
        </div>
        
        <div className="flex-1 flex justify-end items-center space-x-6 hidden md:flex font-barlow text-[11px] font-bold tracking-[0.12em]">
          <a href="#" className="hover:text-[#5A5A5A] transition-colors">PEDIDO</a>
          <a href="#" className="hover:text-[#5A5A5A] transition-colors">CONTATO</a>
        </div>
        
        <div className="flex-1 flex justify-end md:hidden">
          <Menu size={20} color="#0A0A0A" />
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto border-x-2 border-[#0A0A0A] w-full bg-white">
        
        {/* 2. Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-[#0A0A0A]">
          {/* Left Panel */}
          <div className="col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-[#0A0A0A] bg-[#C8C5BE] noise-bg flex flex-col min-h-[60vh] md:min-h-[80vh]">
            <div className="flex-1 flex items-center justify-center border-b-2 border-[#0A0A0A] p-8 bg-red-600">
              <span className="text-[80px] font-bold leading-none text-white">✳</span>
            </div>
            <div className="flex-1 flex flex-col justify-end p-6 md:p-10 bg-[#222222]">
              <p className="font-barlow text-[12px] md:text-[14px] leading-tight font-medium tracking-[0.08em] text-white mb-8 max-w-[280px]">
                LOPES PROPOSES HIGH-PERFORMANCE PIECES DEVELOPED WITH PREMIUM MATERIALS FOR OUR CORPORATE ELITE.
              </p>
              <button className="bg-white text-[#0A0A0A] border-2 border-white py-3 px-6 font-barlow font-bold text-[14px] tracking-[0.12em] flex items-center justify-between w-full group hover:bg-transparent hover:text-white transition-colors duration-150">
                <span>VER COLEÇÃO</span>
                <span>▶</span>
              </button>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="col-span-1 md:col-span-2 flex flex-col bg-white">
            <div className="px-4 py-2 md:px-8 md:py-4 border-b-2 border-[#0A0A0A] overflow-hidden whitespace-nowrap">
              <h1 className="font-anton text-[clamp(80px,12vw,160px)] leading-[0.88] tracking-[-0.02em] text-[#0A0A0A] m-0 p-0 transform translate-y-2">
                ALWAYS LOPES
              </h1>
            </div>
            <div className="flex-1 bg-[#F0EFED] w-full relative min-h-[40vh] md:min-h-0 overflow-hidden">
              <img 
                src="/__mockup/images/polo-1.png" 
                alt="Editorial Hero" 
                className="w-full h-full object-cover filter-grayscale absolute inset-0 object-center"
              />
            </div>
          </div>
        </section>

        {/* 3. Ticker Tape #1 */}
        <section className="w-full bg-[#0A0A0A] text-white overflow-hidden flex items-center py-3 border-b-2 border-[#0A0A0A]">
          <div className="flex whitespace-nowrap animate-marquee font-barlow text-[16px] font-bold tracking-[0.1em]">
            <span className="mx-4">IN ORDER TO KEEP THE BRAND STANDARD ✳ LOPES UNIFORMES ✳ PERFORMANCE PREMIUM ✳ CORPORATE ELITE ✳</span>
            <span className="mx-4">IN ORDER TO KEEP THE BRAND STANDARD ✳ LOPES UNIFORMES ✳ PERFORMANCE PREMIUM ✳ CORPORATE ELITE ✳</span>
            <span className="mx-4">IN ORDER TO KEEP THE BRAND STANDARD ✳ LOPES UNIFORMES ✳ PERFORMANCE PREMIUM ✳ CORPORATE ELITE ✳</span>
            <span className="mx-4">IN ORDER TO KEEP THE BRAND STANDARD ✳ LOPES UNIFORMES ✳ PERFORMANCE PREMIUM ✳ CORPORATE ELITE ✳</span>
          </div>
        </section>

        {/* 4. Slanted Ticker Tape */}
        <div className="relative w-full h-0 z-10 pointer-events-none">
          <div className="absolute top-[-30px] left-[-5%] w-[110%] bg-[#0A0A0A] text-white overflow-hidden flex items-center py-2 transform rotate-[-3deg] border-y-2 border-white shadow-2xl pointer-events-auto">
            <div className="flex whitespace-nowrap animate-marquee font-barlow text-[14px] font-bold tracking-[0.1em] opacity-90">
              <span className="mx-4 text-black text-stroke-white" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>SPECIAL ARCHIVE ARCHITECTS ✳ DESIGNED FOR SUCCESS ✳ LOPES IMOBILIÁRIA ✳</span>
              <span className="mx-4 text-black text-stroke-white" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>SPECIAL ARCHIVE ARCHITECTS ✳ DESIGNED FOR SUCCESS ✳ LOPES IMOBILIÁRIA ✳</span>
              <span className="mx-4 text-black text-stroke-white" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>SPECIAL ARCHIVE ARCHITECTS ✳ DESIGNED FOR SUCCESS ✳ LOPES IMOBILIÁRIA ✳</span>
              <span className="mx-4 text-black text-stroke-white" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>SPECIAL ARCHIVE ARCHITECTS ✳ DESIGNED FOR SUCCESS ✳ LOPES IMOBILIÁRIA ✳</span>
            </div>
          </div>
        </div>

        {/* 5. Product Catalog */}
        <section className="bg-white pt-16 md:pt-24 pb-20">
          <div className="border-t-2 border-[#0A0A0A] flex justify-between items-center py-4 px-6 md:px-10">
            <h2 className="font-anton text-4xl md:text-5xl tracking-[-0.02em]">COLEÇÃO CORPORATIVA</h2>
            <a href="#" className="font-barlow font-bold text-[12px] tracking-[0.1em] hover:opacity-50 transition-opacity">VER TODOS ▶</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 px-6 md:px-10 mt-6 border-t border-[#D0CFC9]">
            {products.map((product, index) => (
              <div key={product.id} className="card-container flex flex-col border-b border-r border-l border-[#D0CFC9] p-4 bg-white hover:bg-[#F0EFED] transition-colors duration-300">
                <div className="aspect-[2/3] w-full overflow-hidden bg-[#F0EFED] border border-[#D0CFC9] mb-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover filter-grayscale img-hover"
                  />
                </div>
                <div className="flex flex-col flex-1 font-barlow text-[#0A0A0A]">
                  <h3 className="font-bold text-[16px] tracking-[0.06em] leading-tight mb-1">{product.title}</h3>
                  <div className="flex justify-between items-baseline mb-6">
                    <p className="font-medium text-[11px] tracking-[0.10em] text-[#5A5A5A]">{product.fabric}</p>
                    <p className="font-anton text-[16px] text-[#0A0A0A]">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  
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

        {/* 6. Editorial Break Section */}
        <section className="relative w-full aspect-square md:aspect-[16/9] bg-[#0A0A0A] border-y-2 border-[#0A0A0A] overflow-hidden">
          <img 
            src="/__mockup/images/editorial-hero.png" 
            alt="Editorial Break" 
            className="w-full h-full object-cover filter-grayscale opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <h2 className="font-anton text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.02em] text-white max-w-[800px] mb-4 drop-shadow-lg">
              REAL PERFORMANCE FOR A CORPORATE MASTERPIECE
            </h2>
            <p className="font-barlow font-medium text-[12px] tracking-[0.15em] text-[#C8C5BE]">
              BORDADO 3.5CM — COR PRETA — EXCLUSIVO LOPES
            </p>
          </div>
        </section>

        {/* 9. Footer */}
        <footer className="bg-[#0A0A0A] text-white pt-20 pb-8 px-4 md:px-8">
          <div className="w-full flex justify-center mb-16 overflow-hidden">
            <h2 className="font-anton text-[clamp(48px,8vw,100px)] leading-none tracking-[-0.02em] text-center w-full">
              OFFICINE LOPES
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#333333] pt-6 font-barlow text-[10px] tracking-[0.1em]">
            <div className="flex space-x-6 mb-4 md:mb-0 text-[#888888]">
              <a href="#" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</a>
              <a href="#" className="hover:text-white transition-colors">TERMOS</a>
              <a href="#" className="hover:text-white transition-colors">CONTATO</a>
            </div>
            
            <div className="text-[#666666]">
              © 2026 LOPES IMOBILIÁRIA. TODOS OS DIREITOS RESERVADOS.
            </div>
          </div>
        </footer>
      </main>

      {/* 7 & 8. Order Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)}></div>
          
          <div className="relative w-full max-w-[480px] bg-[#F0EFED] border-l-2 border-[#0A0A0A] h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 custom-scrollbar overflow-y-auto">
            
            {/* Header */}
            <div className="border-b-2 border-[#0A0A0A] p-6 md:p-8 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-anton text-4xl">{isSuccess ? "PEDIDO CONFIRMADO" : "SEU PEDIDO"}</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="font-barlow font-bold text-[14px] hover:opacity-50 transition-opacity flex items-center justify-center border-2 border-[#0A0A0A] w-8 h-8"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
              {isSuccess ? (
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-white border-2 border-[#0A0A0A] p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0A0A0A] text-white flex items-center justify-center transform rotate-12 translate-x-4 -translate-y-4">
                      <span className="font-anton text-2xl transform -rotate-12">✓</span>
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
                        <span className="text-[#5A5A5A] max-w-[120px]">{selectedProduct?.title}<br/><span className="text-[10px]">{selectedProduct?.fabric}</span></span>
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
                  {/* Selected Product */}
                  <div className="flex gap-4 mb-8 bg-white border-2 border-[#0A0A0A] p-2">
                    <div className="w-20 aspect-[2/3] bg-gray-100 border border-[#D0CFC9] overflow-hidden flex-shrink-0">
                      <img src={selectedProduct?.image} alt="Produto" className="w-full h-full object-cover filter-grayscale" />
                    </div>
                    <div className="flex flex-col justify-center font-barlow pt-2 flex-1">
                      <p className="font-bold text-[16px] leading-none mb-1">{selectedProduct?.title}</p>
                      <div className="flex justify-between items-baseline mt-1">
                        <p className="font-medium text-[12px] text-[#5A5A5A] tracking-[0.05em]">{selectedProduct?.fabric}</p>
                        <p className="font-anton text-[15px] text-[#0A0A0A]">R$ {selectedProduct?.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-2">QUANTIDADE</label>
                    <div className="flex border-2 border-[#0A0A0A] w-32 bg-white">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold border-r-2 border-[#0A0A0A] hover:bg-[#F0EFED]">-</button>
                      <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 w-full text-center font-barlow font-bold text-[16px] outline-none appearance-none"
                      />
                      <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold border-l-2 border-[#0A0A0A] hover:bg-[#F0EFED]">+</button>
                    </div>
                  </div>

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

                  <div className="w-full h-0 border-b-2 border-[#0A0A0A] mb-8"></div>

                  <h3 className="font-anton text-2xl mb-6">DADOS DO CORRETOR</h3>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-4">NOME DO CORRETOR</label>
                    <input 
                      type="text" 
                      placeholder="SEU NOME COMPLETO" 
                      value={corretorName}
                      onChange={(e) => setCorretorName(e.target.value)}
                      className="w-full bg-transparent border-0 border-b-2 border-[#0A0A0A] px-0 py-2 font-barlow text-[16px] font-bold tracking-wide outline-none placeholder:text-[#A0A0A0] placeholder:font-medium"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="font-barlow font-bold text-[12px] tracking-[0.1em] block mb-3">UNIDADE</label>
                    <div className="grid grid-cols-2 gap-2">
                      {unidades.map((uni) => (
                        <button
                          key={uni}
                          onClick={() => setUnidade(uni)}
                          className={`border-2 border-[#0A0A0A] py-2 px-2 font-barlow font-bold text-[11px] tracking-[0.05em] transition-colors ${
                            unidade === uni ? "bg-[#0A0A0A] text-white" : "bg-white text-[#0A0A0A] hover:bg-[#E5E5E5]"
                          }`}
                        >
                          {uni}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 bg-[#E5E5E5] p-4 border border-[#C8C5BE]">
                    <label className="font-barlow font-bold text-[10px] tracking-[0.1em] text-[#5A5A5A] block mb-2">DETALHES FIXOS</label>
                    <div className="flex space-x-4 font-barlow font-bold text-[12px] tracking-wide">
                      <span>COR: PRETA</span>
                      <span className="text-[#A0A0A0]">|</span>
                      <span>BORDADO: 3.5CM</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    {formError && (
                      <p className="font-barlow font-bold text-[11px] tracking-[0.08em] text-red-600 mb-3 border-l-2 border-red-600 pl-3">
                        {formError.toUpperCase()}
                      </p>
                    )}
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] py-4 font-anton text-xl tracking-wide hover:bg-white hover:text-[#0A0A0A] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <span
                            style={{
                              display: "inline-block",
                              width: 18,
                              height: 18,
                              border: "2px solid #ffffff40",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                            }}
                          />
                          ENVIANDO...
                        </>
                      ) : (
                        "FINALIZAR PEDIDO"
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
