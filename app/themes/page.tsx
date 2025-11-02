"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Building2,
  Stethoscope,
  ShoppingCart,
  Layers3,
  Star,
  Eye,
  Globe,
  ExternalLink,
  Filter,
  TrendingUp,
  Zap,
  Award,
  Heart,
  Edit3,
  Settings,
  ArrowRight,
} from "lucide-react";

type Demo = { id: string; name: string; image?: string; url?: string };
type Theme = { id: string; name: string; desc: string; demos: Demo[] };

const categories = [
  {
    id: "realestate",
    title: "Bất động sản",
    desc: "Theme cho môi giới, portal, listing bất động sản",
    icon: Building2,
    color: "emerald",
  },
  {
    id: "medicaltourism",
    title: "Du lịch y tế",
    desc: "Theme cho clinic, spa, du lịch y tế",
    icon: Stethoscope,
    color: "pink",
  },
  {
    id: "ecommerce",
    title: "Bán hàng",
    desc: "Theme WooCommerce cho shop online",
    icon: ShoppingCart,
    color: "orange",
  },
  {
    id: "others",
    title: "Ngành nghề khác",
    desc: "Theme đa năng cho mọi ngành nghề",
    icon: Layers3,
    color: "purple",
  },
];

export default function ThemesPage() {
  const [themes, setThemes] = useState<Record<string, Theme[]>>({});
  const [activeCat, setActiveCat] = useState("realestate");
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; theme?: Theme }>({
    open: false,
  });
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("ht_themes");
    if (raw) setThemes(JSON.parse(raw));
    else {
      const init: Record<string, Theme[]> = {};
      categories.forEach((c) => (init[c.id] = []));
      localStorage.setItem("ht_themes", JSON.stringify(init));
      setThemes(init);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(themes).length)
      localStorage.setItem("ht_themes", JSON.stringify(themes));
  }, [themes]);

  const list = themes[activeCat] || [];
  const filtered = useMemo(
    () =>
      list
        .filter(
          (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.desc.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ),
    [list, search, sortAsc]
  );

  // Functions để xử lý modal demo
  const openDemoModal = (theme: Theme) => {
    setSelectedTheme(theme);
    setShowDemoModal(true);
  };

  const closeDemoModal = () => {
    setSelectedTheme(null);
    setShowDemoModal(false);
  };

  // Xử lý đóng modal bằng ESC key và body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDemoModal();
        setModal({ open: false });
      }
    };

    if (showDemoModal || modal.open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showDemoModal, modal.open]);

  // Get active category info
  const activeCategoryInfo = categories.find((c) => c.id === activeCat);
  const totalThemes = Object.values(themes).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <>
      <Head>
        <title>Kho Theme WordPress - H Themes</title>
        <meta
          name="description"
          content={`Quản lý và khám phá ${totalThemes} theme WordPress chuyên nghiệp. Tìm kiếm theo danh mục ${
            activeCategoryInfo?.title || ""
          } với nhiều demo live.`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              {/* Main Title */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg mb-6 animate-bounceOnce">
                <Settings className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Kho Theme
                </span>
              </h1>

              <p
                className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 animate-slideUp"
                style={{ animationDelay: "0.2s" }}
              >
                Quản lý và khám phá theme WordPress chuyên nghiệp
              </p>

              {/* Enhanced Stats */}
              <div
                className="flex items-center justify-center gap-8 mb-8 animate-slideUp"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {totalThemes} theme tổng cộng
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {activeCategoryInfo?.title || "Danh mục hiện tại"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {list.length} theme đang xem
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-12 text-gray-50 dark:text-gray-900"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          {/* Enhanced Category Filter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Filter className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chọn danh mục theme
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                Lọc theme theo ngành nghề để tìm kiếm chính xác hơn
              </p>
            </div>

            {/* Enhanced Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((c) => {
                const isActive = activeCat === c.id;
                const themeCount = themes[c.id]?.length || 0;

                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCat(c.id)}
                    className={`group relative px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-r ${
                            c.color === "emerald"
                              ? "from-emerald-600 to-emerald-700 shadow-emerald-500/25"
                              : c.color === "pink"
                              ? "from-pink-600 to-pink-700 shadow-pink-500/25"
                              : c.color === "orange"
                              ? "from-orange-600 to-orange-700 shadow-orange-500/25"
                              : "from-purple-600 to-purple-700 shadow-purple-500/25"
                          } text-white shadow-lg`
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <c.icon className="w-5 h-5" />
                      <span>{c.title}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {themeCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Enhanced Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Tìm kiếm trong ${list.length} theme ${
                    activeCategoryInfo?.title || ""
                  }...`}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 transition-all duration-200"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="inline-flex items-center gap-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                {sortAsc ? (
                  <SortAsc className="w-5 h-5" />
                ) : (
                  <SortDesc className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Sắp xếp</span>
              </button>

              <button
                onClick={() => setModal({ open: true })}
                className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Thêm theme</span>
              </button>
            </div>

            {/* Search Results Info */}
            {search && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tìm thấy{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      {filtered.length}
                    </strong>{" "}
                    theme cho từ khóa "
                    <strong className="text-gray-900 dark:text-white">
                      {search}
                    </strong>
                    "
                  </p>
                  {filtered.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Kết quả chính xác</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Theme Grid */}
          {filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((t, index) => {
                const IconComponent = activeCategoryInfo?.icon || Layers3;

                return (
                  <div
                    key={t.id}
                    className="group card-hover bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 animate-slideUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Theme Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {/* Highlight search term */}
                              {search ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: t.name.replace(
                                      new RegExp(`(${search})`, "gi"),
                                      '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                                    ),
                                  }}
                                />
                              ) : (
                                t.name
                              )}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                                  activeCategoryInfo?.color === "emerald"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : activeCategoryInfo?.color === "pink"
                                    ? "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
                                    : activeCategoryInfo?.color === "orange"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                }`}
                              >
                                {activeCategoryInfo?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setModal({ open: true, theme: t })}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Theme Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {search ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: t.desc.replace(
                              new RegExp(`(${search})`, "gi"),
                              '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                            ),
                          }}
                        />
                      ) : (
                        t.desc
                      )}
                    </p>

                    {/* Enhanced Theme Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t.demos?.length || 0} demo live
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            4.8
                          </span>
                        </div>
                      </div>

                      {/* Additional Stats */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-green-700 dark:text-green-300 font-medium">
                            SEO Ready
                          </span>
                        </div>
                        <div className="flex items-center gap-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Zap className="w-3 h-3 text-blue-600" />
                          <span className="text-blue-700 dark:text-blue-300 font-medium">
                            Fast
                          </span>
                        </div>
                        <div className="flex items-center gap-1 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <Award className="w-3 h-3 text-purple-600" />
                          <span className="text-purple-700 dark:text-purple-300 font-medium">
                            Premium
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => openDemoModal(t)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-blue-600 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">
                          Xem Demo ({t.demos?.length || 0})
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          if (t.demos?.[0]?.url) {
                            window.open(t.demos[0].url, "_blank");
                          }
                        }}
                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium text-sm"
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-20 px-6">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {search
                    ? "Không tìm thấy theme phù hợp"
                    : `Chưa có theme ${activeCategoryInfo?.title || ""}`}
                </h3>
                <p className="text-gray-500 text-base mb-6 leading-relaxed">
                  {search
                    ? `Không tìm thấy theme nào với từ khóa "${search}" trong danh mục ${activeCategoryInfo?.title}. Thử từ khóa khác hoặc thêm theme mới.`
                    : `Danh mục ${activeCategoryInfo?.title} chưa có theme nào. Hãy thêm theme đầu tiên!`}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="px-6 py-3 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
                    >
                      Xóa tìm kiếm
                    </button>
                  )}
                  <button
                    onClick={() => setModal({ open: true })}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm theme mới
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Enhanced Theme Modal */}
        {modal.open && (
          <ThemeModal
            initial={modal.theme}
            onClose={() => setModal({ open: false })}
            onSave={(p: any) => {
              // save theme (and preserve demos)
              setThemes((prev) => {
                const copy = { ...prev };
                const arr = [...(copy[activeCat] || [])];
                if (p.id) {
                  const idx = arr.findIndex((x) => x.id === p.id);
                  if (idx >= 0) arr[idx] = p;
                  else arr.push(p);
                } else arr.push({ ...p, id: Date.now().toString() });
                copy[activeCat] = arr;
                return copy;
              });
              setModal({ open: false });
            }}
            categories={categories}
            activeCat={activeCat}
          />
        )}

        {/* Enhanced Demo Modal */}
        {showDemoModal && selectedTheme && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeDemoModal}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-3xl z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedTheme.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedTheme.demos?.length || 0} demo live có sẵn
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDemoModal}
                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                {/* Info Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Demo Live Websites
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                        Theme <strong>{selectedTheme.name}</strong> có{" "}
                        <strong className="text-blue-600 dark:text-blue-400">
                          {selectedTheme.demos?.length || 0} mẫu demo LIVE
                        </strong>{" "}
                        chuyên biệt cho ngành{" "}
                        {activeCategoryInfo?.title.toLowerCase()}. Mỗi demo được
                        tối ưu riêng để phù hợp với nhu cầu sử dụng cụ thể. Bấm
                        vào để xem trực tiếp!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Demo Grid */}
                {selectedTheme.demos && selectedTheme.demos.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedTheme.demos.map((demo: any, index: number) => (
                      <div
                        key={demo.id}
                        className="group bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 animate-slideUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Demo Preview Image */}
                        {demo.image && (
                          <div className="mb-4 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-600">
                            <img
                              src={demo.image}
                              alt={demo.name}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                              {demo.name}
                            </h4>
                            {demo.url && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {demo.url}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500 ml-3">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              4.9
                            </span>
                          </div>
                        </div>

                        {/* Demo Stats */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>2.1k views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>Popular</span>
                            </div>
                          </div>
                        </div>

                        {/* Demo Action */}
                        {demo.url && (
                          <button
                            onClick={() => window.open(demo.url, "_blank")}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Xem Demo Live</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty Demos State */
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Chưa có demo nào
                    </h4>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      Theme này chưa có demo để xem. Hãy chỉnh sửa theme để thêm
                      demo!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Enhanced Theme Modal Component
function ThemeModal({ initial, onClose, onSave, categories, activeCat }: any) {
  const [name, setName] = useState(initial?.name || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [demos, setDemos] = useState<any[]>(initial?.demos || []);
  const [cat, setCat] = useState(initial?.category || activeCat);

  useEffect(() => {
    setDemos(initial?.demos || []);
  }, [initial]);

  const addDemo = () => {
    setDemos((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Demo mới", image: "", url: "" },
    ]);
  };

  const updateDemo = (idx: number, key: string, val: any) => {
    setDemos((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [key]: val } : d))
    );
  };

  const removeDemo = (id: string) =>
    setDemos((prev) => prev.filter((d) => d.id !== id));

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                {initial ? (
                  <Edit3 className="w-6 h-6 text-white" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {initial ? "Chỉnh sửa theme" : "Thêm theme mới"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {initial
                    ? "Cập nhật thông tin theme"
                    : "Tạo theme WordPress mới"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>

        {/* Enhanced Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Thông tin cơ bản
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên theme *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Houzez, Flatsome, Divi..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mô tả theme
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Mô tả chi tiết về theme, tính năng nổi bật..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Danh mục *
                  </label>
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 transition-all duration-200"
                  >
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.title} - {c.desc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Demo Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Demo live ({demos.length})
                </h4>
                <button
                  type="button"
                  onClick={addDemo}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Thêm demo
                </button>
              </div>

              <div className="space-y-4">
                {demos.length > 0 ? (
                  demos.map((d, idx) => (
                    <div
                      key={d.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Demo #{idx + 1}
                        </h5>
                        <button
                          type="button"
                          onClick={() => removeDemo(d.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <span className="text-lg">×</span>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Tên demo
                          </label>
                          <input
                            type="text"
                            value={d.name}
                            onChange={(e) =>
                              updateDemo(idx, "name", e.target.value)
                            }
                            placeholder="VD: Default, Main Demo, Agency..."
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            URL demo
                          </label>
                          <input
                            type="url"
                            value={d.url}
                            onChange={(e) =>
                              updateDemo(idx, "url", e.target.value)
                            }
                            placeholder="https://demo.example.com"
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Hình ảnh demo (tùy chọn)
                        </label>
                        <input
                          type="url"
                          value={d.image}
                          onChange={(e) =>
                            updateDemo(idx, "image", e.target.value)
                          }
                          placeholder="https://example.com/screenshot.jpg"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm mb-3">
                      Chưa có demo nào
                    </p>
                    <button
                      type="button"
                      onClick={addDemo}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Thêm demo đầu tiên
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modal Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-3xl">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={() => {
                if (!name.trim()) {
                  alert("Vui lòng nhập tên theme");
                  return;
                }
                onSave({
                  id: initial?.id || "",
                  name: name.trim(),
                  desc: desc.trim(),
                  demos,
                  category: cat,
                });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              {initial ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  Cập nhật theme
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Tạo theme
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
