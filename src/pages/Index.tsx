import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SECTIONS = ["главная", "начать играть", "магазин", "форум"];

const SHOP_ITEMS = [
  { name: "VIP Статус", price: "299 ₽", desc: "Привилегии и доступ к эксклюзивным зонам", icon: "Crown", popular: true },
  { name: "Premium Авто", price: "199 ₽", desc: "Уникальные транспортные средства для RP", icon: "Car", popular: false },
  { name: "Скин пакет", price: "149 ₽", desc: "10 эксклюзивных скинов для персонажа", icon: "Shirt", popular: false },
  { name: "Игровая валюта", price: "99 ₽", desc: "500,000 игровых денег на счёт", icon: "Coins", popular: false },
  { name: "Кастомный номер", price: "79 ₽", desc: "Персональный номерной знак авто", icon: "Tag", popular: false },
  { name: "Elite Bundle", price: "599 ₽", desc: "Всё лучшее в одном пакете — VIP + авто + скины", icon: "Package", popular: true },
];

const FORUM_POSTS = [
  { author: "DarkRider_19", avatar: "D", time: "2 мин назад", title: "Новые правила RP в жилых зонах", replies: 34, category: "Новости", hot: true },
  { author: "SilentPhoenix", avatar: "S", time: "15 мин назад", title: "Продаю бизнес в центре — дёшево", replies: 12, category: "Торговля", hot: false },
  { author: "GhostRacer", avatar: "G", time: "1 час назад", title: "Гайд: как быстро заработать на старте", replies: 89, category: "Гайды", hot: true },
  { author: "NightWolff", avatar: "N", time: "3 часа назад", title: "Набор в ОПГ «Стальной кулак»", replies: 56, category: "Организации", hot: false },
];

const STATS = [
  { value: "2,847", label: "Онлайн сейчас" },
  { value: "48K+", label: "Игроков" },
  { value: "5", label: "Лет на рынке" },
  { value: "99.9%", label: "Аптайм" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("главная");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText("play.greentech-rp.ru");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark-bg)" }}>
      {/* NAVBAR */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,8,8,0.95)" : "rgba(8,8,8,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--dark-border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,255,65,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("главная")}>
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center animate-neon-pulse"
              style={{ background: "rgba(0,255,65,0.1)", border: "2px solid var(--neon)", boxShadow: "0 0 12px var(--neon-glow)" }}
            >
              <span style={{ color: "var(--neon)", fontFamily: "Rajdhani", fontWeight: 700, fontSize: "14px" }}>GT</span>
            </div>
            <div>
              <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "20px", color: "var(--neon)", textShadow: "0 0 10px var(--neon)" }}>
                GREEN
              </span>
              <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "20px", color: "#e0ffe0" }}>
                TECH
              </span>
              <span className="ml-2 neon-badge" style={{ verticalAlign: "middle" }}>CRMP</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className={`nav-link ${activeSection === s ? "active" : ""}`}>
                {s}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{ background: "rgba(0,255,65,0.05)", border: "1px solid rgba(0,255,65,0.2)", borderRadius: "4px" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon)", boxShadow: "0 0 6px var(--neon)" }} />
              <span style={{ fontFamily: "Rajdhani", fontWeight: 600, color: "var(--neon)", fontSize: "14px" }}>2,847 онлайн</span>
            </div>
            <button className="neon-solid-btn px-5 py-2 text-sm rounded-sm" onClick={() => scrollTo("начать играть")}>
              Играть
            </button>
          </div>

          <button className="md:hidden" style={{ color: "var(--neon)" }} onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-4"
            style={{ background: "rgba(8,8,8,0.98)", borderBottom: "1px solid var(--dark-border)" }}>
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className={`nav-link text-left text-base ${activeSection === s ? "active" : ""}`}>
                {s}
              </button>
            ))}
            <button className="neon-solid-btn py-2 rounded-sm" onClick={() => scrollTo("начать играть")}>
              Начать играть
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="главная" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)" }} />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,200,50,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="absolute top-24 left-8 w-20 h-20 opacity-30"
          style={{ borderTop: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)" }} />
        <div className="absolute top-24 right-8 w-20 h-20 opacity-30"
          style={{ borderTop: "2px solid var(--neon)", borderRight: "2px solid var(--neon)" }} />
        <div className="absolute bottom-16 left-8 w-20 h-20 opacity-30"
          style={{ borderBottom: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)" }} />
        <div className="absolute bottom-16 right-8 w-20 h-20 opacity-30"
          style={{ borderBottom: "2px solid var(--neon)", borderRight: "2px solid var(--neon)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <span className="neon-badge">CRMP · GTA San Andreas · Roleplay</span>
          </div>

          <h1 className="animate-fade-in-up delay-100 mb-4"
            style={{
              fontFamily: "Rajdhani", fontWeight: 700,
              fontSize: "clamp(56px, 10vw, 110px)", lineHeight: 0.9,
              opacity: 0, animationFillMode: "forwards",
            }}>
            <span style={{ color: "var(--neon)", textShadow: "0 0 30px var(--neon), 0 0 60px rgba(0,255,65,0.3)" }}>GREEN</span>
            <br />
            <span style={{ color: "#e0ffe0", letterSpacing: "-2px" }}>TECH</span>
          </h1>

          <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto mb-8 text-lg"
            style={{ color: "#7ab87a", opacity: 0, animationFillMode: "forwards", fontWeight: 300, lineHeight: 1.7 }}>
            Погрузись в мир реалистичного ролевого отыгрыша. Строй карьеру, создавай бизнес,
            участвуй в криминальных разборках или служи закону. Твой выбор — твоя история.
          </p>

          <div className="animate-fade-in-up delay-300 inline-flex items-center gap-3 mb-2 cursor-pointer"
            style={{ opacity: 0, animationFillMode: "forwards" }} onClick={copyIp}>
            <div className="flex items-center gap-3 px-5 py-3 rounded-sm"
              style={{ background: "rgba(0,255,65,0.05)", border: "1px solid rgba(0,255,65,0.3)" }}>
              <Icon name="Server" size={16} style={{ color: "var(--neon)" }} />
              <span style={{ fontFamily: "Rajdhani", fontWeight: 600, color: "var(--neon)", letterSpacing: "2px", fontSize: "16px" }}>
                play.greentech-rp.ru
              </span>
              <Icon name={copied ? "Check" : "Copy"} size={14} style={{ color: copied ? "var(--neon)" : "#4a7a4a" }} />
            </div>
          </div>
          {copied && <div className="text-xs mb-4" style={{ color: "var(--neon)" }}>Скопировано!</div>}
          {!copied && <div className="mb-6" />}

          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center"
            style={{ opacity: 0, animationFillMode: "forwards" }}>
            <button className="neon-solid-btn px-10 py-4 text-base rounded-sm" onClick={() => scrollTo("начать играть")}>
              <span className="flex items-center gap-2 justify-center">
                <Icon name="Play" size={18} />
                Начать играть
              </span>
            </button>
            <button className="neon-glow-btn px-10 py-4 text-base rounded-sm" onClick={() => scrollTo("магазин")}>
              <span className="flex items-center gap-2 justify-center">
                <Icon name="ShoppingBag" size={18} />
                Магазин
              </span>
            </button>
          </div>

          <div className="animate-fade-in-up delay-500 grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12"
            style={{ opacity: 0, animationFillMode: "forwards", borderTop: "1px solid rgba(0,255,65,0.1)" }}>
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="stat-number mb-1">{s.value}</div>
                <div style={{ color: "#4a7a4a", fontSize: "12px", fontFamily: "Rajdhani", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <Icon name="ChevronDown" size={24} style={{ color: "rgba(0,255,65,0.4)" }} />
        </div>
      </section>

      <div className="neon-divider" />

      {/* НАЧАТЬ ИГРАТЬ */}
      <section id="начать играть" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="neon-badge inline-block mb-4">Быстрый старт</div>
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "clamp(36px,6vw,64px)", color: "#e0ffe0" }}>
              НАЧАТЬ <span style={{ color: "var(--neon)", textShadow: "0 0 20px var(--neon)" }}>ИГРАТЬ</span>
            </h2>
            <p style={{ color: "#5a8a5a", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0", lineHeight: 1.7 }}>
              Подключись за 3 простых шага и уже сегодня окунись в мир GreenTech RP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { step: "01", icon: "Download", title: "Установи CRMP", desc: "Скачай клиент CRMP 0.3.7 с официального сайта и установи на свой компьютер. Займёт не более 5 минут.", action: "Скачать клиент" },
              { step: "02", icon: "UserPlus", title: "Зарегистрируйся", desc: "Создай аккаунт на нашем сайте. Придумай ник для персонажа и задай пароль. Всё просто и бесплатно.", action: "Регистрация" },
              { step: "03", icon: "Wifi", title: "Подключись к серверу", desc: "Введи IP сервера play.greentech-rp.ru в браузере CRMP и нажми «Подключиться». Добро пожаловать!", action: "Скопировать IP" },
            ].map((item, i) => (
              <div key={i} className="game-card rounded-sm p-8 relative group cursor-pointer">
                <div className="absolute top-4 right-4 text-6xl font-bold select-none"
                  style={{ fontFamily: "Rajdhani", color: "rgba(0,255,65,0.04)", lineHeight: 1 }}>
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-5"
                  style={{ background: "rgba(0,255,65,0.08)", border: "1px solid rgba(0,255,65,0.2)" }}>
                  <Icon name={item.icon} size={22} style={{ color: "var(--neon)" }} />
                </div>
                <div className="neon-badge mb-3">Шаг {item.step}</div>
                <h3 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "22px", color: "#e0ffe0", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#5a8a5a", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{item.desc}</p>
                <button className="neon-glow-btn px-5 py-2 text-sm rounded-sm">{item.action}</button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ borderTop: "1px solid rgba(0,255,65,0.1)", paddingTop: "40px" }}>
            {[
              { icon: "Shield", label: "Анти-чит защита" },
              { icon: "Users", label: "3000+ игроков" },
              { icon: "Zap", label: "Низкий пинг" },
              { icon: "Clock", label: "Поддержка 24/7" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 px-4 py-3 rounded-sm"
                style={{ background: "rgba(0,255,65,0.03)", border: "1px solid rgba(0,255,65,0.08)" }}>
                <Icon name={f.icon} size={18} style={{ color: "var(--neon)" }} />
                <span style={{ fontFamily: "Rajdhani", fontWeight: 600, color: "#a0c0a0", fontSize: "14px", letterSpacing: "0.5px" }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider" />

      {/* МАГАЗИН */}
      <section id="магазин" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="neon-badge inline-block mb-4">Привилегии</div>
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "clamp(36px,6vw,64px)", color: "#e0ffe0" }}>
              <span style={{ color: "var(--neon)", textShadow: "0 0 20px var(--neon)" }}>МАГАЗИН</span>
            </h2>
            <p style={{ color: "#5a8a5a", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0", lineHeight: 1.7 }}>
              Расширь возможности своего персонажа с эксклюзивными привилегиями
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHOP_ITEMS.map((item, i) => (
              <div key={i} className="game-card rounded-sm p-6 relative"
                style={item.popular ? { borderColor: "var(--neon)", boxShadow: "0 0 20px rgba(0,255,65,0.15)" } : {}}>
                {item.popular && (
                  <div className="absolute -top-3 right-4 neon-badge text-xs"
                    style={{ background: "var(--neon)", color: "#000", border: "none" }}>
                    ХИТ
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{
                      background: item.popular ? "rgba(0,255,65,0.15)" : "rgba(0,255,65,0.05)",
                      border: item.popular ? "1px solid rgba(0,255,65,0.4)" : "1px solid rgba(0,255,65,0.1)",
                    }}>
                    <Icon name={item.icon} size={20} style={{ color: "var(--neon)" }} />
                  </div>
                  <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "22px", color: "var(--neon)", textShadow: "0 0 10px rgba(0,255,65,0.5)" }}>
                    {item.price}
                  </span>
                </div>
                <h3 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "20px", color: "#e0ffe0", marginBottom: "8px" }}>
                  {item.name}
                </h3>
                <p style={{ color: "#5a8a5a", fontSize: "13px", lineHeight: 1.6, marginBottom: "20px" }}>{item.desc}</p>
                <button className={`${item.popular ? "neon-solid-btn" : "neon-glow-btn"} w-full py-2.5 text-sm rounded-sm`}>
                  Купить
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, rgba(0,255,65,0.05) 0%, rgba(0,100,30,0.08) 100%)", border: "1px solid rgba(0,255,65,0.2)" }}>
            <div>
              <div className="neon-badge mb-2">Акция</div>
              <h3 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "24px", color: "#e0ffe0" }}>
                Первая покупка со скидкой <span style={{ color: "var(--neon)" }}>-20%</span>
              </h3>
              <p style={{ color: "#5a8a5a", fontSize: "14px", marginTop: "6px" }}>
                Используй промокод <span style={{ color: "var(--neon)", fontFamily: "Rajdhani", fontWeight: 700 }}>GREENSTART</span> при первой оплате
              </p>
            </div>
            <button className="neon-solid-btn px-8 py-3 text-sm rounded-sm whitespace-nowrap">
              Применить промокод
            </button>
          </div>
        </div>
      </section>

      <div className="neon-divider" />

      {/* ФОРУМ */}
      <section id="форум" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <div>
              <div className="neon-badge inline-block mb-4">Сообщество</div>
              <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "clamp(36px,6vw,64px)", color: "#e0ffe0" }}>
                <span style={{ color: "var(--neon)", textShadow: "0 0 20px var(--neon)" }}>ФОРУМ</span>
              </h2>
            </div>
            <button className="neon-glow-btn px-6 py-3 text-sm rounded-sm">
              <span className="flex items-center gap-2">
                <Icon name="Plus" size={16} />
                Создать тему
              </span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Все темы", "Новости", "Гайды", "Торговля", "Организации", "Жалобы"].map((cat, i) => (
              <button key={cat}
                style={
                  i === 0
                    ? { fontFamily: "Rajdhani", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--neon)", background: "rgba(0,255,65,0.15)", border: "1px solid rgba(0,255,65,0.4)", padding: "4px 14px", borderRadius: "2px" }
                    : { fontFamily: "Rajdhani", fontWeight: 600, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "#4a7a4a", background: "rgba(0,255,65,0.03)", border: "1px solid rgba(0,255,65,0.1)", padding: "4px 14px", borderRadius: "2px" }
                }>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 mb-10">
            {FORUM_POSTS.map((post, i) => (
              <div key={i} className="game-card rounded-sm p-5 cursor-pointer flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm flex-shrink-0 flex items-center justify-center font-bold text-sm"
                  style={{ background: "rgba(0,255,65,0.1)", border: "1px solid rgba(0,255,65,0.3)", color: "var(--neon)", fontFamily: "Rajdhani" }}>
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="neon-badge text-xs" style={{ background: "rgba(0,255,65,0.08)" }}>{post.category}</span>
                    {post.hot && (
                      <span className="neon-badge text-xs"
                        style={{ background: "rgba(255,80,0,0.1)", borderColor: "rgba(255,80,0,0.4)", color: "#ff8040" }}>
                        🔥 Горячее
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "16px", color: "#e0ffe0" }}>{post.title}</div>
                  <div style={{ color: "#3a6a3a", fontSize: "12px", marginTop: "2px" }}>{post.author} · {post.time}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "20px", color: "var(--neon)" }}>{post.replies}</div>
                  <div style={{ color: "#3a6a3a", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>ответов</div>
                </div>
                <Icon name="ChevronRight" size={16} style={{ color: "#2a5a2a", flexShrink: 0 }} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "MessageSquare", value: "12,483", label: "Тем создано" },
              { icon: "MessageCircle", value: "89,210", label: "Сообщений" },
              { icon: "Users", value: "48,392", label: "Участников" },
              { icon: "TrendingUp", value: "340", label: "Онлайн сейчас" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-sm p-4 text-center"
                style={{ background: "rgba(0,255,65,0.03)", border: "1px solid rgba(0,255,65,0.08)" }}>
                <Icon name={stat.icon} size={20} style={{ color: "var(--neon)", margin: "0 auto 8px" }} />
                <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "24px", color: "var(--neon)" }}>{stat.value}</div>
                <div style={{ color: "#3a6a3a", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,255,65,0.1)", padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(0,255,65,0.1)", border: "1px solid rgba(0,255,65,0.3)" }}>
              <span style={{ color: "var(--neon)", fontFamily: "Rajdhani", fontWeight: 700, fontSize: "13px" }}>GT</span>
            </div>
            <span style={{ fontFamily: "Rajdhani", fontWeight: 600, color: "#3a6a3a", fontSize: "14px" }}>
              © 2024 GreenTech CRMP. Все права защищены.
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["ВКонтакте", "Discord", "Telegram"].map((s) => (
              <a key={s} href="#"
                style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px", color: "#3a6a3a", textTransform: "uppercase", letterSpacing: "1px", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3a6a3a")}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}