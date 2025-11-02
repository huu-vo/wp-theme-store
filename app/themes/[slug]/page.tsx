"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import {
  ExternalLink,
  ArrowLeft,
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
  Download,
  Heart,
  Filter,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [selectedCategory, setSelectedCategory] = useState<string>(slug);

  useEffect(() => {
    setSelectedCategory(slug);
  }, [slug]);

  const info: any = {
    realestate: {
      title: "Bất động sản",
      desc: "Theme cho môi giới, portal, listing bất động sản",
      icon: Building2,
      color: "emerald",
    },
    medicaltourism: {
      title: "Du lịch y tế",
      desc: "Theme cho clinic, spa, du lịch y tế",
      icon: Stethoscope,
      color: "pink",
    },
    ecommerce: {
      title: "Bán hàng",
      desc: "Theme WooCommerce cho shop online",
      icon: ShoppingCart,
      color: "orange",
    },
    others: {
      title: "Ngành nghề khác",
      desc: "Theme đa năng cho mọi ngành nghề",
      icon: Layers3,
      color: "purple",
    },
  }[selectedCategory];

  const [themes, setThemes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("ht_themes");
    if (raw) {
      const parsed = JSON.parse(raw);
      setThemes(parsed[selectedCategory] || []);
    }
  }, [selectedCategory]);

  const filtered = useMemo(
    () =>
      themes
        .filter(
          (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.desc.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ),
    [themes, search, sortAsc]
  );

  // Functions để xử lý modal demo
  const openDemoModal = (theme: any) => {
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
        setPreviewImg(null);
      }
    };

    if (showDemoModal || previewImg) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showDemoModal, previewImg]);

  if (!info)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Danh mục không tồn tại
          </h1>
          <p className="text-gray-500 mb-6">
            Danh mục "{slug}" không được tìm thấy. Hãy thử tìm kiếm danh mục
            khác.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>{info?.title} - Themes WordPress | H Themes</title>
        <meta
          name="description"
          content={`Khám phá ${
            themes.length
          } theme WordPress chuyên nghiệp cho ${info?.title.toLowerCase()}. ${
            info?.desc
          } với nhiều demo live.`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Hero Section với Breadcrumb */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            {/* Breadcrumb */}
            <nav className="mb-8 animate-slideIn">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <button
                    onClick={() => router.push("/")}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    Trang chủ
                  </button>
                </li>
                <li className="text-gray-400">
                  <span>/</span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-300">
                    Danh mục
                  </span>
                </li>
                <li className="text-gray-400">
                  <span>/</span>
                </li>
                <li>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {info?.title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="text-center">
              {/* Category Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg mb-6 animate-bounceOnce">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${
                    info?.color === "emerald"
                      ? "from-emerald-500 to-emerald-600"
                      : info?.color === "pink"
                      ? "from-pink-500 to-pink-600"
                      : info?.color === "orange"
                      ? "from-orange-500 to-orange-600"
                      : "from-purple-500 to-purple-600"
                  } rounded-2xl flex items-center justify-center`}
                >
                  {info?.icon && <info.icon className="w-6 h-6 text-white" />}
                </div>
              </div>

              {/* Category Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {info?.title}
                </span>
              </h1>

              {/* Category Description */}
              <p
                className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 animate-slideUp"
                style={{ animationDelay: "0.2s" }}
              >
                {info?.desc}
              </p>

              {/* Enhanced Stats */}
              <div
                className="flex items-center justify-center gap-8 mb-8 animate-slideUp"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {themes.length} theme chất lượng cao
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {themes.reduce((acc, t) => acc + (t.demos?.length || 0), 0)}{" "}
                    demo live
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    100% responsive
                  </span>
                </div>
              </div>

              {/* Quick Action */}
              <div
                className="animate-slideUp"
                style={{ animationDelay: "0.6s" }}
              >
                {filtered.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Hiện đang hiển thị{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      {filtered.length}
                    </strong>{" "}
                    theme
                    {search && ` phù hợp với "${search}"`}
                  </p>
                )}
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

        {/* Enhanced Search and Filter Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            {/* Search Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tìm kiếm trong {info?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                Tìm theme WordPress phù hợp nhất cho dự án{" "}
                {info?.title.toLowerCase()} của bạn
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Enhanced Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Tìm kiếm trong ${
                    themes.length
                  } theme ${info?.title.toLowerCase()}...`}
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

              {/* Sort Button */}
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
        </section>

        {/* Enhanced Theme Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          {filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((t, index) => {
                const IconComponent = info?.icon || Layers3;

                return (
                  <div
                    key={t.id}
                    className="group card-hover bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 animate-slideUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Theme Header với enhanced info */}
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
                                  info?.color === "emerald"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : info?.color === "pink"
                                    ? "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
                                    : info?.color === "orange"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                }`}
                              >
                                {info?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">Xem Demos</span>
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
                    : `Chưa có theme ${info?.title}`}
                </h3>
                <p className="text-gray-500 text-base mb-6 leading-relaxed">
                  {search
                    ? `Không tìm thấy theme nào với từ khóa "${search}" trong danh mục ${info?.title}. Thử từ khóa khác hoặc xem tất cả theme.`
                    : `Danh mục ${info?.title} chưa có theme nào. Hãy quay lại trang chủ để xem các danh mục khác!`}
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
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Về trang chủ
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

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
                        chuyên biệt cho ngành {info?.title.toLowerCase()}. Mỗi
                        demo được tối ưu riêng để phù hợp với nhu cầu sử dụng cụ
                        thể. Bấm vào để xem trực tiếp!
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
                        className="group relative bg-white dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 dark:hover:from-gray-800 dark:hover:to-blue-900/20 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200/50 dark:hover:border-blue-700/50 transition-all duration-500 animate-slideUp transform hover:-translate-y-1 hover:scale-[1.02] backdrop-blur-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Demo Preview Image */}
                        {demo.image && (
                          <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            <img
                              src={demo.image}
                              alt={demo.name}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <div className="absolute inset-0 ring-1 ring-gray-300/50 dark:ring-gray-600/50 rounded-xl"></div>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors text-lg leading-tight">
                              {demo.name}
                            </h4>
                            {demo.url && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg inline-block break-all">
                                {demo.url}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500 ml-3 group-hover:scale-110 transition-transform duration-300 ">
                            <Star className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform duration-300" />
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
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
                            className="group/btn relative w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 font-medium overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span className="relative z-10">Xem Demo Live</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
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
                      Theme này chưa có demo để xem. Hãy liên hệ để được hỗ trợ
                      thêm thông tin!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {previewImg && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewImg(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] animate-slideUp">
              <img
                src={previewImg}
                alt="Preview"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setPreviewImg(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
