import React, { useState, useMemo } from 'react';
import {
  Volume2,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Check,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import {
  ELEMENTS_THEORY,
  EXAM_FORMULA,
  PRACTICE_1_QUESTIONS,
  READING_TEXT_1,
  PRACTICE_2_QUESTIONS,
  READING_TEXT_2,
  ALL_QUESTIONS,
  CATEGORY_LABELS
} from './data.ts';
import { QuestionItem } from './types.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'practica1' | 'practica2' | 'simulador'>('teoria');
  const [globalShowArmenian, setGlobalShowArmenian] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [revealedArmenianMap, setRevealedArmenianMap] = useState<Record<string, boolean>>({});
  const [revealedAnswersMap, setRevealedAnswersMap] = useState<Record<string, boolean>>({});
  const [userSelectedOption, setUserSelectedOption] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDiagramNode, setActiveDiagramNode] = useState<string | null>(null);

  // Audio speech synthesis helper
  const speakSpanish = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Toggle armenian translation for specific item
  const toggleArmenian = (key: string) => {
    setRevealedArmenianMap((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isArmenianVisible = (key: string) => {
    if (globalShowArmenian) return true;
    return !!revealedArmenianMap[key];
  };

  // Toggle answer reveal
  const toggleAnswer = (questionId: string) => {
    setRevealedAnswersMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Reveal all answers in current tab
  const revealAllCurrentAnswers = () => {
    const questionsToReveal =
      activeTab === 'practica1'
        ? PRACTICE_1_QUESTIONS
        : activeTab === 'practica2'
        ? PRACTICE_2_QUESTIONS
        : ALL_QUESTIONS;

    const newMap = { ...revealedAnswersMap };
    questionsToReveal.forEach((q) => {
      newMap[q.id] = true;
    });
    setRevealedAnswersMap(newMap);
  };

  // Reset current answers
  const hideAllCurrentAnswers = () => {
    const questionsToHide =
      activeTab === 'practica1'
        ? PRACTICE_1_QUESTIONS
        : activeTab === 'practica2'
        ? PRACTICE_2_QUESTIONS
        : ALL_QUESTIONS;

    const newMap = { ...revealedAnswersMap };
    questionsToHide.forEach((q) => {
      newMap[q.id] = false;
    });
    setRevealedAnswersMap(newMap);
  };

  // Filtered questions based on search & category
  const filterList = (list: QuestionItem[]) => {
    return list.filter((q) => {
      const matchesCategory =
        selectedCategory === 'all' || q.highlightCategory === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const qText = `${q.scenarioEs || ''} ${q.scenarioHy || ''} ${q.questionEs} ${q.questionHy} ${q.officialAnswerEs} ${q.officialAnswerHy || ''}`.toLowerCase();
      return matchesCategory && qText.includes(searchQuery.toLowerCase());
    });
  };

  const filteredP1 = useMemo(() => filterList(PRACTICE_1_QUESTIONS), [searchQuery, selectedCategory]);
  const filteredP2 = useMemo(() => filterList(PRACTICE_2_QUESTIONS), [searchQuery, selectedCategory]);

  // Exam simulator questions (10 questions sample)
  const [simulatorSeed, setSimulatorSeed] = useState(1);
  const simulatorQuestions = useMemo(() => {
    const shuffled = [...ALL_QUESTIONS].sort((a, b) => {
      const hashA = (a.id.charCodeAt(3) || 0) * simulatorSeed;
      const hashB = (b.id.charCodeAt(3) || 0) * simulatorSeed;
      return (hashA % 17) - (hashB % 17);
    });
    return shuffled.slice(0, 10);
  }, [simulatorSeed]);

  const fontSizeClasses = {
    normal: 'text-[15px]',
    large: 'text-[17px]',
    xlarge: 'text-[19px]'
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-amber-900 ${fontSizeClasses[fontSize]}`}>
      {/* 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3.5 transition-shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single Text Element Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('teoria')}
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 block group-hover:text-sky-700 transition-colors">
                Elementos de la Comunicación
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium block">
                Հաղորդակցության տարրերը · 1º ESO (7º grado)
              </span>
            </button>
          </div>

          {/* Zone 2: Clean 4 Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('teoria')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'teoria'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📚 Teoría y Esquema
            </button>
            <button
              onClick={() => setActiveTab('practica1')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'practica1'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📝 Práctica 1 (1–30)
            </button>
            <button
              onClick={() => setActiveTab('practica2')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'practica2'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎯 Práctica 2 (1–37)
            </button>
            <button
              onClick={() => setActiveTab('simulador')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'simulador'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏆 Simulador de Examen
            </button>
          </nav>

          {/* Zone 3: Font Size Control + Armenian Toggle Action */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                  fontSize === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Обычный шрифт / Սովորական տառաչափ"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                  fontSize === 'large' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Крупный шрифт / Խոշոր տառաչափ"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                  fontSize === 'xlarge' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Очень крупный шрифт / Շատ խոշոր տառաչափ"
              >
                A++
              </button>
            </div>

            <button
              onClick={() => setGlobalShowArmenian(!globalShowArmenian)}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                globalShowArmenian
                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
              title="Ցույց տալ բոլոր հայերեն թարգմանությունները / Mostrar u ocultar todas las traducciones al armenio"
            >
              {globalShowArmenian ? (
                <>
                  <EyeOff className="w-4 h-4 text-sky-600" />
                  <span>🇦🇲 Թարգմանությունը միացված է</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>🇦🇲 Բացել բոլոր թարգմանությունները</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center gap-1 pt-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 mt-2">
          <button
            onClick={() => setActiveTab('teoria')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'teoria'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            📚 Teoría
          </button>
          <button
            onClick={() => setActiveTab('practica1')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'practica1'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            📝 Práctica 1 (30)
          </button>
          <button
            onClick={() => setActiveTab('practica2')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'practica2'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            🎯 Práctica 2 (37)
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'simulador'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            🏆 Simulador
          </button>
        </div>
      </header>

      {/* SUB-HEADER TIP BANNER */}
      <div className="bg-sky-50/70 border-b border-sky-100 px-4 py-2 text-center text-xs text-sky-900 font-medium">
        <span className="font-semibold text-sky-800">💡 Ինտերակտիվ հուշում․</span> Սեղմեք ցանկացած իսպաներեն տեքստի վրա (կամ 🇦🇲 նշանի վրա)՝ հայերեն թարգմանությունը բացելու համար։ Ամեն առաջադրանք ունի առանձին «Ver respuesta / Տեսնել պատասխանը» կոճակ։
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* ==================== TAB 1: TEORÍA ==================== */}
        {activeTab === 'teoria' && (
          <div className="space-y-10">
            {/* Header introduction */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                <span>Lengua Castellana y Literatura</span>
                <span aria-hidden="true">·</span>
                <span>1º ESO / 7º grado</span>
                <span aria-hidden="true">·</span>
                <span>Guía completa con traducción al armenio</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Elementos de la comunicación
              </h1>
              <p className="mt-2 text-base text-slate-600 font-normal">
                Para el 7º grado (1º ESO) en España es fundamental dominar y distinguir con precisión los 6 elementos: <strong className="text-slate-900">emisor, receptor, mensaje, canal, código</strong> y <strong className="text-slate-900">contexto o situación</strong>.
              </p>
            </div>

            {/* INTERACTIVE COMMUNICATION SCHEME DIAGRAM */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Esquema interactivo del proceso comunicativo
                  </h2>
                  <p className="text-xs text-slate-500">
                    Հաղորդակցական գործընթացի սխեման · Սեղմեք տարրի վրա՝ մանրամասն տեսնելու համար
                  </p>
                </div>
                <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                  Marco general: <strong>Contexto / Situación</strong> (Համատեքստ)
                </div>
              </div>

              {/* Visual Model Canvas */}
              <div className="p-6 md:p-10 rounded-xl bg-slate-50/70 border border-slate-200/60 relative overflow-hidden">
                <div className="text-center mb-6">
                  <span className="inline-block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Contexto o Situación (հաղորդակցական միջավայր / իրավիճակ)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* EMISOR */}
                  <div
                    onClick={() => setActiveDiagramNode(activeDiagramNode === 'emisor' ? null : 'emisor')}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-center ${
                      activeDiagramNode === 'emisor'
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-semibold text-amber-700 mb-1">PUNTO DE PARTIDA</div>
                    <div className="text-lg font-bold text-slate-900">Emisor</div>
                    <div className="text-xs text-slate-500 mt-1">Հաղորդող (ուղարկող)</div>
                    <div className="text-xs text-slate-600 mt-2 italic">
                      «Quien emite o codifica el mensaje»
                    </div>
                  </div>

                  {/* MENSAJE + CANAL + CÓDIGO */}
                  <div className="space-y-3">
                    {/* Canal */}
                    <div
                      onClick={() => setActiveDiagramNode(activeDiagramNode === 'canal' ? null : 'canal')}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        activeDiagramNode === 'canal'
                          ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs text-blue-700 font-semibold">SOPORTE FÍSICO</div>
                      <div className="text-sm font-bold text-slate-900">Canal (Ալիք / Միջոց)</div>
                      <div className="text-xs text-slate-500">Aire, papel, teléfono, ondas, cartel</div>
                    </div>

                    {/* Mensaje */}
                    <div
                      onClick={() => setActiveDiagramNode(activeDiagramNode === 'mensaje' ? null : 'mensaje')}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer shadow-xs ${
                        activeDiagramNode === 'mensaje'
                          ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                          : 'bg-white border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="text-xs text-emerald-700 font-semibold">CONTENIDO</div>
                      <div className="text-base font-bold text-slate-900">Mensaje (Հաղորդագրություն)</div>
                      <div className="text-xs text-slate-500">La información concreta que se transmite</div>
                    </div>

                    {/* Código */}
                    <div
                      onClick={() => setActiveDiagramNode(activeDiagramNode === 'codigo' ? null : 'codigo')}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        activeDiagramNode === 'codigo'
                          ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs text-purple-700 font-semibold">SISTEMA DE SIGNOS</div>
                      <div className="text-sm font-bold text-slate-900">Código (Կոդ / Լեզու)</div>
                      <div className="text-xs text-slate-500">Español, armenio, señales, gestos</div>
                    </div>
                  </div>

                  {/* RECEPTOR */}
                  <div
                    onClick={() => setActiveDiagramNode(activeDiagramNode === 'receptor' ? null : 'receptor')}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-center ${
                      activeDiagramNode === 'receptor'
                        ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-semibold text-indigo-700 mb-1">DESTINATARIO</div>
                    <div className="text-lg font-bold text-slate-900">Receptor</div>
                    <div className="text-xs text-slate-500 mt-1">Ընդունող (ստացող)</div>
                    <div className="text-xs text-slate-600 mt-2 italic">
                      «Quien recibe y descodifica el mensaje»
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 text-center">
                  <div className="text-xs text-slate-500">
                    🔄 <strong>Retroalimentación (feedback):</strong> Si el receptor responde, los roles se invierten y pasa a ser emisor.
                  </div>
                </div>
              </div>
            </div>

            {/* THE 6 CORE ELEMENTS CARDS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Los 6 Elementos en detalle (6 տարրերը մանրամասն)
                </h2>
                <span className="text-xs text-slate-500">
                  Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանության համար
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ELEMENTS_THEORY.map((item) => {
                  const itemKey = `theory-${item.id}`;
                  const showHy = isArmenianVisible(itemKey);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Title bar */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <span>{item.nameEs}</span>
                            <span className="text-xs font-semibold text-slate-500">/ {item.nameHy}</span>
                          </h3>
                          <button
                            onClick={() => speakSpanish(item.nameEs + '. ' + item.descEs)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
                            title="Լսել իսպաներեն արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Question hint */}
                        <div className="text-xs font-medium text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                          {item.roleHint}
                        </div>

                        {/* Spanish Description - Clickable */}
                        <div
                          onClick={() => toggleArmenian(itemKey)}
                          className="group p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-100 transition-colors cursor-pointer mb-2.5"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <p className="text-base font-medium text-slate-900 leading-snug">
                              {item.descEs}
                            </p>
                            <span className="text-xs text-sky-700 shrink-0 font-medium group-hover:underline pt-0.5">
                              {showHy ? 'Փակել 🇦🇲' : 'Հայերեն 🇦🇲'}
                            </span>
                          </div>
                        </div>

                        {/* Armenian translation */}
                        {showHy && (
                          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-sm md:text-base text-amber-950 font-medium leading-relaxed mb-3 animate-fadeIn">
                            {item.descHy}
                          </div>
                        )}

                        {/* Examples */}
                        <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-700">
                          <span className="font-bold text-slate-900">Ejemplos: </span>
                          <span>{item.exampleEs}</span>
                          {showHy && (
                            <div className="text-slate-600 mt-1.5 font-normal">
                              Օրինակներ՝ {item.exampleHy}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card footer toggle */}
                      <button
                        onClick={() => toggleArmenian(itemKey)}
                        className="mt-4 pt-2.5 border-t border-slate-100 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-between cursor-pointer w-full text-left"
                      >
                        <span>{showHy ? 'Թաքցնել հայերենը' : 'Տեսնել հայերեն բացատրությունը'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showHy ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FÓRMULA DE EXAMEN SECTION */}
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-2xl border border-amber-200/80 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-900 rounded-xl shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {EXAM_FORMULA.titleEs} / {EXAM_FORMULA.titleHy}
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {EXAM_FORMULA.tipEs}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {EXAM_FORMULA.tipHy}
                    </p>
                  </div>

                  {/* Spanish Formula Card */}
                  <div
                    onClick={() => toggleArmenian('formula-exam')}
                    className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs cursor-pointer hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-800">
                        🇪🇸 Modelo de respuesta redactada:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(EXAM_FORMULA.exampleEs);
                          }}
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-sky-700 font-medium">
                          {isArmenianVisible('formula-exam') ? 'Փակել թարգմանությունը 🇦🇲' : 'Սեղմի՛ր թարգմանության համար 🇦🇲'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed">
                      «{EXAM_FORMULA.exampleEs}»
                    </p>
                  </div>

                  {/* Armenian Translation */}
                  {isArmenianVisible('formula-exam') && (
                    <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300/70 text-xs md:text-sm text-amber-950 font-medium leading-relaxed animate-fadeIn">
                      <div className="text-xs font-bold text-amber-900 mb-1">🇦🇲 Օրինակելի պատասխանը հայերենով․</div>
                      «{EXAM_FORMULA.exampleHy}»
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Կարևոր կանոններ․</span>
                    <span>1. Միշտ նշել պատճառը (porque es quien envía/recibe)</span>
                    <span>·</span>
                    <span>2. Չշփոթել Canal-ը և Código-ն</span>
                    <span>·</span>
                    <span>3. Գրել լրիվ նախադասություններով</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Practice 1 */}
            <div className="flex items-center justify-between bg-slate-900 text-white rounded-2xl p-6">
              <div>
                <h3 className="text-lg font-bold">Պատրա՞ստ եք քննական վարժություններին</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Անցեք Պրակտիկա 1-ին (30 հարց) և Պրակտիկա 2-ին (37 հարց)՝ բոլոր պատասխաններով և հայերեն թարգմանություններով։
                </p>
              </div>
              <button
                onClick={() => setActiveTab('practica1')}
                className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Սկսել Պրակտիկա 1 ➡️
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 2 & 3: PRÁCTICA 1 & PRÁCTICA 2 ==================== */}
        {(activeTab === 'practica1' || activeTab === 'practica2') && (
          <div className="space-y-6">
            {/* Practice Header & Controls */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <span>{activeTab === 'practica1' ? 'Bloque 1' : 'Bloque 2'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeTab === 'practica1' ? '30 ejercicios' : '37 ejercicios'}</span>
                    <span aria-hidden="true">·</span>
                    <span>1º ESO / 7º grado</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeTab === 'practica1'
                      ? 'Práctica 1 — Elementos de la comunicación'
                      : 'Práctica 2 — Ejercicios avanzados y examen oral'}
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    {activeTab === 'practica1'
                      ? 'Հաղորդակցության տարրերը — Վարժություն 1 · Բոլոր մասերը (1-ից 8)'
                      : 'Հաղորդակցության տարրերը — Վարժություն 2 · Բոլոր մասերը (1-ից 9)'}
                  </p>
                </div>

                {/* Batch Answer Toggle Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={revealAllCurrentAnswers}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    ✅ Բացել բոլոր պատասխանները
                  </button>
                  <button
                    onClick={hideAllCurrentAnswers}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Փակել պատասխանները
                  </button>
                </div>
              </div>

              {/* Search and Category Filter */}
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative md:col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Որոնել բառով / Buscar por palabra (ej. teléfono, STOP, pizarra, canal, կոդ)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Մաքրել
                    </button>
                  )}
                </div>

                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => (
                      <option key={catKey} value={catKey}>
                        {label.es} ({label.hy})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reading Text Box (if Part 6) */}
            {activeTab === 'practica1' && (
              <ReadingPassageCard
                reading={READING_TEXT_1}
                isArmenianVisible={isArmenianVisible}
                toggleArmenian={toggleArmenian}
                speakSpanish={speakSpanish}
              />
            )}

            {activeTab === 'practica2' && (
              <ReadingPassageCard
                reading={READING_TEXT_2}
                isArmenianVisible={isArmenianVisible}
                toggleArmenian={toggleArmenian}
                speakSpanish={speakSpanish}
              />
            )}

            {/* Question Cards List */}
            <div className="space-y-5">
              {(activeTab === 'practica1' ? filteredP1 : filteredP2).map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  isArmenianVisible={isArmenianVisible}
                  toggleArmenian={toggleArmenian}
                  isAnswerRevealed={!!revealedAnswersMap[q.id]}
                  toggleAnswer={toggleAnswer}
                  selectedOption={userSelectedOption[q.id]}
                  onSelectOption={(key) =>
                    setUserSelectedOption((prev) => ({ ...prev, [q.id]: key }))
                  }
                  speakSpanish={speakSpanish}
                />
              ))}

              {(activeTab === 'practica1' ? filteredP1 : filteredP2).length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                  Որոնմանը համապատասխան հարցեր չգտնվեցին։ Փորձեք փոխել որոնման բառը։
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: SIMULADOR DE EXAMEN ==================== */}
        {activeTab === 'simulador' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-700 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Քննության մոդելավորիչ · 10 պատահական հարցերի փորձություն</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Simulador de examen de Lengua (1º ESO)
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Ստուգեք Ձեր գիտելիքները իրական քննական ռեժիմում։ Ընտրեք տարբերակը և ստուգեք «Ver respuesta / Տեսնել պատասխանը» կոճակով։
                  </p>
                </div>
                <button
                  onClick={() => setSimulatorSeed((prev) => prev + 1)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Նոր 10 հարց (Cambiar preguntas)</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {simulatorQuestions.map((q, idx) => (
                <div key={q.id} className="relative">
                  <div className="absolute -left-2 top-4 -translate-x-full hidden xl:block text-xs font-bold text-slate-400">
                    #{idx + 1}
                  </div>
                  <QuestionCard
                    question={q}
                    isArmenianVisible={isArmenianVisible}
                    toggleArmenian={toggleArmenian}
                    isAnswerRevealed={!!revealedAnswersMap[q.id]}
                    toggleAnswer={toggleAnswer}
                    selectedOption={userSelectedOption[q.id]}
                    onSelectOption={(key) =>
                      setUserSelectedOption((prev) => ({ ...prev, [q.id]: key }))
                    }
                    speakSpanish={speakSpanish}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700">
            Elementos de la comunicación 🇪🇸🇦🇲 · Preparación para 1º ESO (7º grado en España)
          </p>
          <p className="text-slate-400">
            Emisor · Receptor · Mensaje · Canal · Código · Contexto o situación · Հաղորդակցության տարրերը
          </p>
        </div>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// READING PASSAGE CARD COMPONENT
// -------------------------------------------------------------
function ReadingPassageCard({
  reading,
  isArmenianVisible,
  toggleArmenian,
  speakSpanish
}: {
  reading: any;
  isArmenianVisible: (key: string) => boolean;
  toggleArmenian: (key: string) => void;
  speakSpanish: (text: string) => void;
}) {
  const showHy = isArmenianVisible(reading.id);

  return (
    <div className="bg-amber-50/60 rounded-2xl border border-amber-200/90 p-5 md:p-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-800" />
          <h2 className="text-sm md:text-base font-bold text-amber-950">
            {reading.titleEs} / {reading.titleHy}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => speakSpanish(reading.passageEs)}
            className="p-1 text-amber-800 hover:text-amber-950 rounded transition-colors cursor-pointer"
            title="Լսել տեքստը իսպաներեն"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleArmenian(reading.id)}
            className="text-xs font-semibold text-sky-800 hover:text-sky-950 underline cursor-pointer"
          >
            {showHy ? 'Թաքցնել հայերենը 🇦🇲' : 'Տեսնել հայերեն տեքստը 🇦🇲'}
          </button>
        </div>
      </div>

      {/* Spanish text */}
      <div
        onClick={() => toggleArmenian(reading.id)}
        className="p-4 md:p-5 bg-white rounded-xl border border-amber-200/70 text-base md:text-lg text-slate-900 font-medium whitespace-pre-line leading-relaxed cursor-pointer hover:border-amber-300 transition-colors"
      >
        {reading.passageEs}
      </div>

      {/* Armenian translation */}
      {showHy && (
        <div className="mt-3 p-4 md:p-5 bg-amber-100/70 rounded-xl border border-amber-300/60 text-sm md:text-base text-amber-950 font-medium whitespace-pre-line leading-relaxed animate-fadeIn">
          {reading.passageHy}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// QUESTION CARD COMPONENT
// -------------------------------------------------------------
function QuestionCard({
  question,
  isArmenianVisible,
  toggleArmenian,
  isAnswerRevealed,
  toggleAnswer,
  selectedOption,
  onSelectOption,
  speakSpanish
}: {
  question: QuestionItem;
  isArmenianVisible: (key: string) => boolean;
  toggleArmenian: (key: string) => void;
  isAnswerRevealed: boolean;
  toggleAnswer: (id: string) => void;
  selectedOption?: string;
  onSelectOption: (key: string) => void;
  speakSpanish: (text: string) => void;
}) {
  const scenarioKey = `scenario-${question.id}`;
  const questionKey = `qtext-${question.id}`;
  const showScenarioHy = isArmenianVisible(scenarioKey);
  const showQuestionHy = isArmenianVisible(questionKey);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 md:p-6 shadow-xs hover:border-slate-300 transition-all">
      {/* Header kicker */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800">№ {question.number}</span>
          <span aria-hidden="true">·</span>
          <span>{question.partTitleEs}</span>
        </div>
        <button
          onClick={() =>
            speakSpanish(
              (question.scenarioEs ? question.scenarioEs + '. ' : '') + question.questionEs
            )
          }
          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
          title="Լսել հարցը իսպաներեն"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Scenario / Situation text if available */}
      {question.scenarioEs && (
        <div className="mb-3.5">
          <div
            onClick={() => toggleArmenian(scenarioKey)}
            className="group p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-base md:text-lg font-semibold text-slate-900 leading-snug whitespace-pre-line">
                🇪🇸 {question.scenarioEs}
              </div>
              <span className="text-xs text-sky-700 shrink-0 font-medium group-hover:underline pt-0.5">
                {showScenarioHy ? 'Փակել 🇦🇲' : 'Թարգմանել 🇦🇲'}
              </span>
            </div>
          </div>
          {showScenarioHy && (
            <div className="mt-2 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-sm md:text-base text-amber-950 font-medium whitespace-pre-line leading-relaxed animate-fadeIn">
              🇦🇲 {question.scenarioHy}
            </div>
          )}
        </div>
      )}

      {/* Question Prompt */}
      <div className="mb-4">
        <div
          onClick={() => toggleArmenian(questionKey)}
          className="group flex items-start justify-between gap-3 cursor-pointer py-1"
        >
          <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
            {question.questionEs}
          </h3>
          <span className="text-xs text-sky-700 shrink-0 font-medium group-hover:underline pt-1">
            {showQuestionHy ? 'Փակել 🇦🇲' : 'Թարգմանել 🇦🇲'}
          </span>
        </div>
        {showQuestionHy && (
          <div className="mt-2 text-sm md:text-base font-semibold text-amber-950 bg-amber-50/90 p-3 rounded-xl border border-amber-200/70 leading-relaxed animate-fadeIn">
            🇦🇲 {question.questionHy}
          </div>
        )}
      </div>

      {/* MCQ / Options block if present */}
      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrect = isAnswerRevealed && opt.key === question.correctKey;
            const isWrong = isAnswerRevealed && isSelected && opt.key !== question.correctKey;

            return (
              <button
                key={opt.key}
                onClick={() => onSelectOption(opt.key)}
                className={`px-4 py-3 rounded-xl border text-left text-sm md:text-base font-medium transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                    : isWrong
                    ? 'bg-rose-50 border-rose-300 text-rose-950'
                    : isSelected
                    ? 'bg-sky-50 border-sky-400 text-sky-950'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div>
                  <span className="font-bold mr-2">{opt.key})</span>
                  <span>{opt.textEs}</span>
                  {opt.textHy && showQuestionHy && (
                    <span className="text-slate-500 block text-xs md:text-sm mt-0.5">
                      {opt.textHy}
                    </span>
                  )}
                </div>
                {isCorrect && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* SEPARATE "VER RESPUESTA / ՏԵՍՆԵԼ ՊԱՏԱՍԽԱՆԸ" (ОТВЕТ: ДА) BUTTON */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-100">
        <button
          onClick={() => toggleAnswer(question.id)}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            isAnswerRevealed
              ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isAnswerRevealed ? 'Թաքցնել պատասխանը' : 'Տեսնել պատասխանը (Ver respuesta)'}</span>
        </button>

        {question.highlightCategory && (
          <span className="text-xs text-slate-500 font-medium">
            Տարրը՝ <strong className="text-slate-700 capitalize">{question.highlightCategory}</strong>
          </span>
        )}
      </div>

      {/* REVEALED OFFICIAL ANSWER BOX */}
      {isAnswerRevealed && (
        <div className="mt-4 p-4 md:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 animate-fadeIn space-y-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Պաշտոնական պատասխան (Respuesta oficial):</span>
          </div>

          {/* Breakdown items if type is breakdown */}
          {question.breakdown && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
              {question.breakdown.map((b, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-emerald-100">
                  <div className="font-bold text-slate-800">
                    {b.labelEs} <span className="text-slate-500 font-normal">({b.labelHy}):</span>
                  </div>
                  <div className="text-slate-900 font-semibold mt-1">{b.answerEs}</div>
                  {b.answerHy && (
                    <div className="text-slate-600 text-xs md:text-sm mt-0.5">{b.answerHy}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Text of official answer */}
          {!question.breakdown && (
            <div className="space-y-1.5">
              <div className="text-base md:text-lg font-bold text-slate-900">
                🇪🇸 {question.officialAnswerEs}
              </div>
              {question.officialAnswerHy && (
                <div className="text-sm md:text-base font-semibold text-emerald-950">
                  🇦🇲 {question.officialAnswerHy}
                </div>
              )}
            </div>
          )}

          {/* Pedagogical explanation */}
          {(question.explanationEs || question.explanationHy) && (
            <div className="pt-2.5 border-t border-emerald-200 text-sm text-emerald-950 space-y-1.5">
              {question.explanationEs && (
                <div>
                  <span className="font-bold text-emerald-900">Explicación: </span>
                  {question.explanationEs}
                </div>
              )}
              {question.explanationHy && (
                <div className="text-emerald-900">
                  <span className="font-bold">Բացատրություն՝ </span>
                  {question.explanationHy}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
