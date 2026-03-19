import React, { useState, useEffect } from "react";
import {
  Camera,
  Monitor,
  CheckSquare,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Send,
  Check,
  Play,
  Square,
  Share2,
  Image as ImageIcon,
  Clock,
  Activity,
  AlertCircle,
  Download,
  UploadCloud,
  Layers,
  Zap,
} from "lucide-react";

// --- DADOS MOCKADOS INICIAIS ---
const MOCK_USERS = [
  {
    id: 1,
    name: "Karlos",
    role: "admin",
    status: "captando",
    stats: { captured: 0, received: 0, edited: 0, delivered: 0 },
  },
  {
    id: 2,
    name: "Sandra",
    role: "membro",
    status: "captando",
    stats: { captured: 0, received: 0, edited: 0, delivered: 0 },
  },
  {
    id: 3,
    name: "Tiago",
    role: "membro",
    status: "captando",
    stats: { captured: 0, received: 0, edited: 0, delivered: 0 },
  },
  {
    id: 4,
    name: "Júnior",
    role: "membro",
    status: "captando",
    stats: { captured: 0, received: 0, edited: 0, delivered: 0 },
  },
];

const MOCK_CHECKLIST = [
  {
    id: "c1",
    title: "1. Pré-evento / Check-in",
    items: [
      {
        id: "i1",
        label: "Fachada do evento (Aberto e Detalhe)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i2",
        label: "Fila e chegada do público animado",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i3",
        label: "Detalhe de credenciais / pulseiras",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i4",
        label: "Equipe de voluntários / Recepção",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i5",
        label: "Bastidores (Oração da equipe, Preparação)",
        isDone: false,
        doneBy: null,
      },
    ],
  },
  {
    id: "c2",
    title: "2. Louvor",
    items: [
      {
        id: "i6",
        label: "Banda no palco (Plano geral)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i7",
        label: "Vocalista principal (Expressão/Close)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i8",
        label: "Detalhes de instrumentos",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i9",
        label: "Público adorando (Mãos levantadas)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i10",
        label: "Atmosfera de luzes (Wide shot do fundo)",
        isDone: false,
        doneBy: null,
      },
    ],
  },
  {
    id: "c3",
    title: "3. Preletor / Ministração",
    items: [
      {
        id: "i11",
        label: "Entrada no palco / Recepção",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i12",
        label: "Close facial focado (Expressão)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i13",
        label: "Plano americano (Corpo e gestos)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i14",
        label: "Composição criativa (Silhueta/Contra-luz)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i15",
        label: "Over the shoulder (Preletor + Público)",
        isDone: false,
        doneBy: null,
      },
    ],
  },
  {
    id: "c4",
    title: "4. Público",
    items: [
      {
        id: "i16",
        label: "Casais interagindo / Sorrindo",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i17",
        label: "Pessoas anotando a palavra",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i18",
        label: "Reações de alegria e atenção",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i19",
        label: "Visão geral da plateia cheia",
        isDone: false,
        doneBy: null,
      },
    ],
  },
  {
    id: "c5",
    title: "5. Final / Apelo",
    items: [
      {
        id: "i20",
        label: "Altar cheio / Pessoas à frente",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i21",
        label: "Líderes orando (Imposição de mãos)",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i22",
        label: "Abraços e emoção genuína",
        isDone: false,
        doneBy: null,
      },
      {
        id: "i23",
        label: "Despedida e saída animada",
        isDone: false,
        doneBy: null,
      },
    ],
  },
];

// --- COMPONENTES DE UI REUTILIZÁVEIS ---
const Badge = ({ status }) => {
  const colors = {
    captando: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    editando: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    pausa: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    admin: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };
  const labels = {
    captando: "🔴 Captando",
    editando: "🔵 Editando",
    pausa: "⚪ Pausa",
    admin: "👑 Líder",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${
        colors[status] || colors.pausa
      }`}
    >
      {labels[status] || status}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 ${className}`}
  >
    {children}
  </div>
);

const ProgressBar = ({ progress, color = "bg-indigo-500" }) => (
  <div className="w-full bg-slate-800 rounded-full h-2.5 mt-2">
    <div
      className={`${color} h-2.5 rounded-full transition-all duration-500`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const LiveTimer = ({ startTime, active }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active || !startTime) return;
    const update = () =>
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    update(); // Chamada inicial imediata
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime, active]);

  const h = Math.floor(elapsed / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((elapsed % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5 bg-rose-500/10 text-rose-500 px-2 py-1 rounded-md border border-rose-500/20 font-mono text-xs font-bold whitespace-nowrap">
      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
      {h}:{m}:{s}
    </div>
  );
};

// --- TELAS DO SISTEMA ---

const LoginScreen = ({ onLogin, users }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (user) => {
    setSelectedId(user.id);

    // Haptic feedback simulado (vibração no celular real)
    if (navigator.vibrate) navigator.vibrate(50);

    // Pequeno delay para a animação do clique acontecer antes de sumir a tela
    setTimeout(() => {
      onLogin(user);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200">
      <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
            <Zap size={32} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Photos Elo
          </h1>
          <p className="text-slate-400">Quem é você na equipe hoje?</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => {
            const isSelected = selectedId === user.id;
            const firstName = user.name.split(" ")[0];

            return (
              <button
                key={user.id}
                onClick={() => handleSelect(user)}
                disabled={selectedId !== null}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
                  ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-500 scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                      : "bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80"
                  }
                `}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-3 transition-colors duration-300
                  ${
                    isSelected
                      ? "bg-white text-indigo-600"
                      : "bg-slate-800 text-slate-300"
                  }
                `}
                >
                  {firstName.charAt(0)}
                </div>
                <span
                  className={`font-medium tracking-wide ${
                    isSelected ? "text-white" : "text-slate-200"
                  }`}
                >
                  {firstName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DashboardScreen = ({
  currentUser,
  session,
  updateStatus,
  checklistProgress,
  checklist,
  toggleChecklist,
  onNavigate,
  globalStats,
}) => {
  // Pega os próximos 3 itens pendentes globais para foco rápido
  const pendingItems = checklist
    .flatMap((cat) =>
      cat.items
        .filter((i) => !i.isDone)
        .map((i) => ({ ...i, categoryId: cat.id, categoryTitle: cat.title }))
    )
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-slate-400 text-sm">Sessão Atual</h2>
          <h1 className="text-2xl font-bold text-white">{session.name}</h1>
        </div>
        {/* Visual Highlight do Evento Ativo */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
            session.active
              ? "bg-rose-500/10 text-rose-500 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              session.active ? "bg-rose-500 animate-pulse" : "bg-slate-500"
            }`}
          />
          {session.active ? "AO VIVO" : "PAUSADA"}
        </div>
      </header>

      {/* Visão da Esteira de Produção */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center flex flex-col items-center justify-center">
          <Camera size={16} className="text-rose-500 mb-1" />
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Captado
          </p>
          <p className="text-xl font-bold text-white">{globalStats.captured}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center flex flex-col items-center justify-center relative">
          <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-slate-800"></div>
          <Layers size={16} className="text-blue-500 mb-1" />
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Editado
          </p>
          <p className="text-xl font-bold text-white">{globalStats.edited}</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-3 text-center flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(79,70,229,0.1)]">
          <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-slate-800"></div>
          <UploadCloud size={16} className="text-indigo-400 mb-1" />
          <p className="text-[10px] text-indigo-400/70 uppercase font-bold tracking-wider">
            Entregue
          </p>
          <p className="text-xl font-bold text-indigo-400">
            {globalStats.delivered}
          </p>
        </div>
      </div>

      {/* Controle de Status Pessoal em Destaque */}
      <Card className="flex flex-col items-center text-center space-y-4 py-6 relative overflow-hidden border-indigo-500/20">
        <div
          className={`absolute top-0 left-0 w-full h-1 ${
            session.active
              ? "bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500 bg-[length:200%_auto] animate-pulse"
              : "bg-slate-800"
          }`}
        />
        <h3 className="text-slate-400 font-medium">Seu status na operação</h3>
        <div className="flex gap-3 justify-center w-full">
          <button
            onClick={() => updateStatus("captando")}
            className={`flex-1 py-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              currentUser.status === "captando"
                ? "bg-rose-500/20 border-rose-500/50 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            <Camera size={28} />{" "}
            <span className="text-sm font-bold">Captando</span>
          </button>
          <button
            onClick={() => updateStatus("editando")}
            className={`flex-1 py-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              currentUser.status === "editando"
                ? "bg-blue-500/20 border-blue-500/50 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            <Monitor size={28} />{" "}
            <span className="text-sm font-bold">Editando</span>
          </button>
        </div>
      </Card>

      {/* Prioridade: Checklist Rápido e Entregas (Só aparece se ativo) */}
      {session.active && (
        <div className="grid gap-4">
          <Card className="border-amber-500/20 bg-amber-500/5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-amber-500 flex items-center gap-2">
                <AlertCircle size={16} /> Foco Imediato
              </h3>
              <span className="text-xs font-bold text-indigo-400">
                {checklistProgress}% concluído
              </span>
            </div>

            {pendingItems.length > 0 ? (
              <div className="space-y-2">
                {pendingItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.categoryId, item.id)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-amber-500/20 hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="w-5 h-5 mt-0.5 rounded border border-amber-500/50 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-200 leading-tight mb-1">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-amber-500/70 uppercase tracking-wider">
                        {item.categoryTitle.replace(/^[0-9]+\.\s/, "")}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => onNavigate("checklist")}
                  className="w-full pt-2 text-xs text-center text-slate-400 hover:text-white transition-colors block"
                >
                  Ver checklist completo &rarr;
                </button>
              </div>
            ) : (
              <div className="text-center py-4 text-emerald-500">
                <Check size={24} className="mx-auto mb-2" />
                <p className="font-bold">Cobertura 100% Finalizada!</p>
              </div>
            )}
          </Card>

          <button
            onClick={() => onNavigate("production")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold flex items-center justify-between transition-colors shadow-lg shadow-indigo-500/20"
          >
            <div className="flex items-center gap-3">
              <Send size={20} />
              <span>Registrar Produção</span>
            </div>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Se pausado, mostra progresso normal simplificado */}
      {!session.active && (
        <Card>
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-semibold text-white">Progresso da Cobertura</h3>
            <span className="text-indigo-400 font-bold">
              {checklistProgress}%
            </span>
          </div>
          <ProgressBar progress={checklistProgress} />
        </Card>
      )}
    </div>
  );
};

const ChecklistScreen = ({ checklist, toggleChecklist, getAvatar }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <h2 className="text-xl font-bold text-white mb-6">
      Checklist de Cobertura
    </h2>

    {checklist.map((category) => {
      const isComplete = category.items.every((i) => i.isDone);
      return (
        <Card
          key={category.id}
          className={`transition-colors ${
            isComplete ? "border-emerald-500/30 bg-emerald-500/5" : ""
          }`}
        >
          <h3
            className={`font-semibold mb-4 flex items-center justify-between ${
              isComplete ? "text-emerald-400" : "text-slate-200"
            }`}
          >
            {category.title}
            {isComplete && <Check size={18} />}
          </h3>
          <div className="space-y-3">
            {category.items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklist(category.id, item.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                      item.isDone
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-600 group-hover:border-indigo-500"
                    }`}
                  >
                    {item.isDone && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span
                    className={
                      item.isDone
                        ? "text-slate-500 line-through"
                        : "text-slate-300"
                    }
                  >
                    {item.label}
                  </span>
                </div>
                {item.isDone && item.doneBy && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
                      Feito por {getAvatar(item.doneBy)}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      );
    })}
  </div>
);

const TeamScreen = ({ team }) => {
  const captando = team.filter((u) => u.status === "captando").length;
  const editando = team.filter((u) => u.status === "editando").length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h2 className="text-xl font-bold text-white">Rodízio da Equipe</h2>

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center py-4 bg-rose-500/10 border-rose-500/20">
          <Camera className="mx-auto text-rose-500 mb-2" size={20} />
          <p className="text-2xl font-bold text-rose-500">{captando}</p>
          <p className="text-xs text-rose-500/70 uppercase tracking-wider mt-1">
            Captando
          </p>
        </Card>
        <Card className="text-center py-4 bg-blue-500/10 border-blue-500/20">
          <Monitor className="mx-auto text-blue-500 mb-2" size={20} />
          <p className="text-2xl font-bold text-blue-500">{editando}</p>
          <p className="text-xs text-blue-500/70 uppercase tracking-wider mt-1">
            Editando
          </p>
        </Card>
      </div>

      <div className="space-y-3 mt-6">
        {team.map((user) => (
          <Card key={user.id} className="py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-200">{user.name}</p>
                  <div className="flex gap-2 mt-1">
                    {user.role === "admin" && <Badge status="admin" />}
                    <Badge status={user.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo individual da esteira */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-2 rounded-lg border border-slate-800/50">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase">Captou</p>
                <p className="text-sm font-bold text-rose-400">
                  {user.stats.captured}
                </p>
              </div>
              <div className="text-center border-l border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase">Editou</p>
                <p className="text-sm font-bold text-blue-400">
                  {user.stats.edited}
                </p>
              </div>
              <div className="text-center border-l border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase">Entregou</p>
                <p className="text-sm font-bold text-indigo-400">
                  {user.stats.delivered}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductionScreen = ({ currentUser, onLogProduction, logs }) => {
  const [count, setCount] = useState("");
  // Se está captando, só pode registrar "captured". Se editando, pode escolher.
  const [logType, setLogType] = useState(
    currentUser.status === "captando" ? "captured" : "delivered"
  );

  useEffect(() => {
    if (currentUser.status === "captando") setLogType("captured");
    else if (currentUser.status === "editando" && logType === "captured")
      setLogType("delivered");
  }, [currentUser.status]);

  const handleRegister = () => {
    if (!count || isNaN(count) || count <= 0) return;
    onLogProduction(logType, parseInt(count));
    setCount("");
  };

  const typeConfig = {
    captured: {
      label: "Captadas",
      icon: Camera,
      color: "text-rose-500",
      bg: "bg-rose-500",
    },
    received: {
      label: "Recebidas",
      icon: Download,
      color: "text-amber-500",
      bg: "bg-amber-500",
    },
    edited: {
      label: "Editadas",
      icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-500",
    },
    delivered: {
      label: "Entregues",
      icon: UploadCloud,
      color: "text-indigo-500",
      bg: "bg-indigo-500",
    },
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h2 className="text-xl font-bold text-white">Registro de Produção</h2>

      <Card
        className={`space-y-4 relative overflow-hidden transition-colors border ${typeConfig[
          logType
        ].color.replace("text", "border")}/30`}
      >
        <div
          className={`absolute top-0 right-0 p-12 ${typeConfig[logType].bg}/10 blur-3xl rounded-full transition-colors`}
        ></div>

        <div className="relative">
          {currentUser.status === "captando" ? (
            <div className="mb-4 bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
              <Camera className="text-rose-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-slate-400 leading-tight">
                Você está em campo. Registre apenas a quantidade de cliques que
                você fez/descarregou.
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">
                O que você está registrando da edição?
              </p>
              <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setLogType("received")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    logType === "received"
                      ? "bg-amber-500/20 text-amber-500"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Recebidas
                </button>
                <button
                  onClick={() => setLogType("edited")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    logType === "edited"
                      ? "bg-blue-500/20 text-blue-500"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Editadas
                </button>
                <button
                  onClick={() => setLogType("delivered")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    logType === "delivered"
                      ? "bg-indigo-500/20 text-indigo-500"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Entregues
                </button>
              </div>
            </div>
          )}

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Quantidade de fotos{" "}
            <span className={`font-bold ${typeConfig[logType].color}`}>
              {typeConfig[logType].label.toLowerCase()}
            </span>
            :
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Ex: 45"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 text-2xl font-bold text-white focus:outline-none focus:border-slate-500 transition-all"
            />
            <button
              onClick={handleRegister}
              disabled={!count}
              className={`${typeConfig[logType].bg} disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 rounded-xl font-bold transition-all flex items-center gap-2`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3 ml-1">
          Últimos registros da equipe
        </h3>
        <div className="space-y-3">
          {logs.map((log, i) => {
            const Config = typeConfig[log.type];
            const Icon = Config.icon;
            return (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${Config.color.replace(
                      "text",
                      "bg"
                    )}/10 ${Config.color.replace("text", "border")}/30`}
                  >
                    <Icon size={14} className={Config.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      {log.userName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {log.time} • Registrou {Config.label}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-bold px-3 py-1 rounded-full text-sm ${Config.color.replace(
                    "text",
                    "bg"
                  )}/10 ${Config.color}`}
                >
                  +{log.count}
                </div>
              </div>
            );
          })}
          {logs.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">
              Nenhum registro efetuado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminScreen = ({
  session,
  toggleSessionStatus,
  finishSession,
  globalStats,
  checklistProgress,
  checklist,
}) => {
  const categoryStats = checklist.map((cat) => {
    const total = cat.items.length;
    const done = cat.items.filter((i) => i.isDone).length;
    return {
      id: cat.id,
      title: cat.title.replace(/^[0-9]+\.\s/, ""),
      progress: Math.round((done / total) * 100) || 0,
      done,
      total,
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h2 className="text-xl font-bold text-white">Controle da Sessão</h2>

      <Card className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-slate-400 text-sm">Status Atual</h3>
            <p className="text-xl font-bold text-white mt-1">{session.name}</p>
          </div>
          <div className="text-right">
            <h3 className="text-slate-400 text-sm">Tempo de Evento</h3>
            <div className="mt-1">
              <LiveTimer
                startTime={session.startTime}
                active={session.active}
              />
            </div>
          </div>
        </div>

        {/* Painel Centralizado de Dados da Esteira */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-medium text-slate-400">
            Esteira de Produção
          </h3>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                Total Captado
              </p>
              <p className="text-2xl font-bold text-rose-500">
                {globalStats.captured}
              </p>
            </div>
            <div className="h-px w-8 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                Total Editado
              </p>
              <p className="text-2xl font-bold text-blue-500">
                {globalStats.edited}
              </p>
            </div>
            <div className="h-px w-8 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1 font-bold">
                Entrega Final
              </p>
              <p className="text-3xl font-bold text-indigo-400">
                {globalStats.delivered}
              </p>
            </div>
          </div>
        </div>

        {/* Cobertura por Categoria */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-slate-400">
              Cobertura do Checklist
            </h3>
            <span className="text-sm font-bold text-indigo-400">
              {checklistProgress}%
            </span>
          </div>
          <div className="space-y-3">
            {categoryStats.map((cat) => (
              <div key={cat.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{cat.title}</span>
                  <span
                    className={
                      cat.progress === 100
                        ? "text-emerald-400 font-bold"
                        : "text-slate-500"
                    }
                  >
                    {cat.done}/{cat.total}
                  </span>
                </div>
                <ProgressBar
                  progress={cat.progress}
                  color={
                    cat.progress === 100 ? "bg-emerald-500" : "bg-slate-600"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <button
            onClick={toggleSessionStatus}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
              session.active
                ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
            }`}
          >
            {session.active ? (
              <>
                <Square size={18} /> Pausar Captação
              </>
            ) : (
              <>
                <Play size={18} /> Retomar Captação
              </>
            )}
          </button>

          <button
            onClick={finishSession}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <CheckSquare size={18} /> Encerrar Sessão e Gerar Relatório
          </button>
        </div>
      </Card>
    </div>
  );
};

const ReportModal = ({
  session,
  team,
  checklistProgress,
  checklist,
  globalStats,
  onClose,
}) => {
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const categoryStats = checklist.map((cat) => {
    const total = cat.items.length;
    const done = cat.items.filter((i) => i.isDone).length;
    return {
      title: cat.title.replace(/^[0-9]+\.\s/, ""),
      progress: Math.round((done / total) * 100) || 0,
    };
  });

  const generateReportText = () => {
    const pendingItems = checklist
      .flatMap((cat) => cat.items)
      .filter((i) => !i.isDone)
      .map((i) => `  - ${i.label.split(" (")[0]}`);

    const pendingText =
      pendingItems.length > 0
        ? `\n*Pontos de atenção (Faltou captar):*\n${pendingItems.join("\n")}\n`
        : "";

    const teamText = team
      .filter((u) => u.stats.captured > 0 || u.stats.delivered > 0)
      .sort((a, b) => b.stats.delivered - a.stats.delivered)
      .map(
        (u) =>
          `  - ${u.name}: ${u.stats.captured} captadas | ${u.stats.delivered} entregues`
      )
      .join("\n");

    const notesText = notes.trim() ? `\n*Observação:*\n${notes}` : "";

    return `📸 *Relatório de Fotografia – ${session.name}*

*Resumo da Operação*
• Fotos captadas: ${globalStats.captured}
• Fotos editadas: ${globalStats.edited}
• Fotos entregues: ${globalStats.delivered}
• Checklist: ${checklistProgress}% concluído

*Status:* ${
      checklistProgress === 100
        ? "✅ Cobertura completa"
        : "⚠️ Cobertura parcial"
    }
${pendingText}
*Produção da equipe:*
${teamText || "  Nenhuma foto registrada na sessão."}
${notesText}`.trim();
  };

  const handleCopy = () => {
    const text = generateReportText();
    // Utilizar abordagem compatível para garantir a cópia em qualquer ambiente
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
    document.body.removeChild(textArea);
  };

  const handleWhatsApp = () => {
    const text = generateReportText();
    handleCopy(); // Copia por precaução
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md space-y-6 shadow-2xl border-indigo-500/50 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="text-emerald-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Relatório Oficial</h2>
          <p className="text-slate-400">{session.name}</p>
        </div>

        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-4">
          <div className="text-center pb-4 border-b border-slate-800">
            <p className="text-xs text-indigo-400 uppercase tracking-wider font-bold mb-1">
              Entrega Final Validada
            </p>
            <p className="text-4xl font-bold text-white">
              {globalStats.delivered}{" "}
              <span className="text-lg text-slate-500 font-normal">fotos</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-2">
              *Número vindo exclusivamente da etapa de edição.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800 text-center">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Volume Captado
              </p>
              <p className="text-lg font-bold text-rose-400">
                {globalStats.captured}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Checklist Realizado
              </p>
              <p className="text-lg font-bold text-emerald-400">
                {checklistProgress}%
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-3">
              Resumo da Equipe (Entregas Finais)
            </span>
            <div className="space-y-2">
              {team
                .filter((u) => u.stats.delivered > 0)
                .sort((a, b) => b.stats.delivered - a.stats.delivered)
                .map((user, i) => (
                  <div
                    key={user.id}
                    className="flex justify-between text-sm bg-slate-900 px-3 py-2 rounded-lg"
                  >
                    <span className="text-slate-300">{user.name}</span>
                    <span className="font-bold text-indigo-400">
                      {user.stats.delivered}
                    </span>
                  </div>
                ))}
              {team.filter((u) => u.stats.delivered > 0).length === 0 && (
                <p className="text-xs text-slate-600 text-center italic">
                  Nenhuma foto foi entregue pela edição nesta sessão.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Adicione uma observação ao relatório (opcional)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none h-20"
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-slate-300 font-medium hover:bg-slate-800 rounded-xl transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={handleCopy}
                className={`flex-[2] py-3 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  copied
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                {copied ? "Relatório Copiado!" : "Copiar Relatório"}
              </button>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-[#25D366]/20"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Copiar e abrir WhatsApp
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- APP PRINCIPAL (ESTADO E NAVEGAÇÃO) ---

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [team, setTeam] = useState(MOCK_USERS);
  const [checklist, setChecklist] = useState(MOCK_CHECKLIST);
  const [productionLogs, setProductionLogs] = useState([]);
  const [session, setSession] = useState({
    name: "Sessão Principal",
    active: true,
    startTime: Date.now(),
  });
  const [showReport, setShowReport] = useState(false);

  // Cálculos Derivados Globais
  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const doneItems = checklist.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.isDone).length,
    0
  );
  const checklistProgress = Math.round((doneItems / totalItems) * 100) || 0;

  const globalStats = {
    captured: team.reduce((acc, u) => acc + u.stats.captured, 0),
    received: team.reduce((acc, u) => acc + u.stats.received, 0),
    edited: team.reduce((acc, u) => acc + u.stats.edited, 0),
    delivered: team.reduce((acc, u) => acc + u.stats.delivered, 0),
  };

  // Ações
  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab("home");
  };

  const updateMyStatus = (newStatus) => {
    setCurrentUser({ ...currentUser, status: newStatus });
    setTeam(
      team.map((u) =>
        u.id === currentUser.id ? { ...u, status: newStatus } : u
      )
    );
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const toggleChecklistItem = (categoryId, itemId) => {
    setChecklist((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map((item) => {
            if (item.id !== itemId) return item;
            const isMarkingDone = !item.isDone;
            return {
              ...item,
              isDone: isMarkingDone,
              doneBy: isMarkingDone ? currentUser.id : null,
            };
          }),
        };
      })
    );
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleProductionLog = (type, count) => {
    const newLog = {
      userName: currentUser.name,
      type: type, // 'captured', 'received', 'edited', 'delivered'
      count: count,
      time: "Agora",
    };

    setProductionLogs([newLog, ...productionLogs]);

    // Atualiza os stats exatos do usuário e garante atualização no currentUser também
    const updatedStats = {
      ...currentUser.stats,
      [type]: currentUser.stats[type] + count,
    };
    setCurrentUser({ ...currentUser, stats: updatedStats });
    setTeam(
      team.map((u) =>
        u.id === currentUser.id ? { ...u, stats: updatedStats } : u
      )
    );
  };

  const getAvatarName = (userId) => {
    const user = team.find((u) => u.id === userId);
    return user ? user.name.split(" ")[0] : "Alguém";
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} users={MOCK_USERS} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Top Header / App Bar */}
      <div
        className={`sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b p-4 flex justify-between items-center transition-colors ${
          session.active
            ? "border-rose-500/30 shadow-[0_4px_30px_rgba(244,63,94,0.1)]"
            : "border-slate-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <Zap className="text-indigo-500" size={24} fill="currentColor" />
          <span className="font-bold text-white tracking-tight hidden sm:inline">
            Photos Elo
          </span>
        </div>
        <div className="flex items-center gap-3">
          {session.active && (
            <LiveTimer startTime={session.startTime} active={session.active} />
          )}
          <Badge status={currentUser.status} />
          <button
            onClick={() => setCurrentUser(null)}
            className="text-slate-500 hover:text-rose-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-4 max-w-lg mx-auto pb-24">
        {activeTab === "home" && (
          <DashboardScreen
            currentUser={currentUser}
            session={session}
            updateStatus={updateMyStatus}
            checklistProgress={checklistProgress}
            checklist={checklist}
            toggleChecklist={toggleChecklistItem}
            onNavigate={setActiveTab}
            globalStats={globalStats}
          />
        )}
        {activeTab === "checklist" && (
          <ChecklistScreen
            checklist={checklist}
            toggleChecklist={toggleChecklistItem}
            getAvatar={getAvatarName}
          />
        )}
        {activeTab === "team" && <TeamScreen team={team} />}
        {activeTab === "production" && (
          <ProductionScreen
            currentUser={currentUser}
            onLogProduction={handleProductionLog}
            logs={productionLogs}
          />
        )}
        {activeTab === "admin" && currentUser.role === "admin" && (
          <AdminScreen
            session={session}
            globalStats={globalStats}
            checklistProgress={checklistProgress}
            checklist={checklist}
            toggleSessionStatus={() =>
              setSession({ ...session, active: !session.active })
            }
            finishSession={() => setShowReport(true)}
          />
        )}
      </main>

      {/* Modals */}
      {showReport && (
        <ReportModal
          session={session}
          team={team}
          checklistProgress={checklistProgress}
          checklist={checklist}
          globalStats={globalStats}
          onClose={() => {
            setShowReport(false);
            setSession({ name: "Nenhuma sessão ativa", active: false });
          }}
        />
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full max-w-lg left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 px-6 py-3 flex justify-between items-center z-40 safe-area-pb">
        <NavItem
          icon={Activity}
          label="Home"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <NavItem
          icon={CheckSquare}
          label="Checklist"
          active={activeTab === "checklist"}
          onClick={() => setActiveTab("checklist")}
        />
        <NavItem
          icon={Send}
          label="Produção"
          active={activeTab === "production"}
          onClick={() => setActiveTab("production")}
        />
        <NavItem
          icon={Users}
          label="Equipe"
          active={activeTab === "team"}
          onClick={() => setActiveTab("team")}
        />

        {currentUser.role === "admin" && (
          <NavItem
            icon={Settings}
            label="Admin"
            active={activeTab === "admin"}
            onClick={() => setActiveTab("admin")}
          />
        )}
      </nav>
    </div>
  );
}

// Subcomponente de navegação
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${
      active
        ? "text-indigo-400 scale-110"
        : "text-slate-500 hover:text-slate-300"
    }`}
  >
    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
