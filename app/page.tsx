"use client";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  Building2,
  Stethoscope,
  ShoppingCart,
  Layers3,
  Star,
  Eye,
  ExternalLink,
  Filter,
} from "lucide-react";

type Demo = { id: string; name: string; image?: string; url?: string };
type Theme = { id: string; name: string; desc: string; demos: Demo[] };

const categories = [
  {
    id: "realestate",
    title: "Bất động sản",
    desc: "Theme cho môi giới, portal, listing.",
  },
  {
    id: "medicaltourism",
    title: "Du lịch y tế",
    desc: "Theme cho clinic, spa, du lịch y tế.",
  },
  { id: "ecommerce", title: "Bán hàng", desc: "Theme WooCommerce cho shop." },
  {
    id: "others",
    title: "Ngành nghề khác",
    desc: "Theme cho giáo dục, portfolio, agency...",
  },
];

export default function HomePage() {
  const [themesByCat, setThemesByCat] = useState<Record<string, Theme[]>>({});
  const [allFlat, setAllFlat] = useState<(Theme & { category: string })[]>([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTheme, setNewTheme] = useState({
    name: "",
    desc: "",
    category: "",
    demoName: "",
    demoUrl: "",
    demoImage: "",
  });

  useEffect(() => {
    // Xóa localStorage cũ nếu có
    if (localStorage.getItem("themes")) {
      localStorage.removeItem("themes");
    }

    const stored = localStorage.getItem("ht_themes");
    console.log(
      "🔍 Checking localStorage ht_themes:",
      stored ? "Found" : "Not found"
    );

    if (!stored) {
      console.log("📝 Creating seed data...");
      const seedData = {
        realestate: [
          {
            id: "t1",
            name: "Houzez",
            desc: "Theme bất động sản cao cấp, hỗ trợ bản đồ và tìm kiếm nâng cao.",
            demos: [
              {
                id: "d1",
                name: "Cổng Thông Tin BDS (DEFAULT)",
                image:
                  "https://demo1.houzez.co/wp-content/uploads/2022/02/houzez-demo.jpg",
                url: "https://demo01.houzez.co/",
              },
              {
                id: "d2",
                name: "Đại Lý BDS Cá Nhân (DEMO 01)",
                image:
                  "https://demo6.houzez.co/wp-content/uploads/2022/02/houzez-luxury.jpg",
                url: "https://demo01.houzez.co/",
              },
              {
                id: "d3",
                name: "BDS Cho Thuê (Rental - DEMO...)",
                image:
                  "https://demo10.houzez.co/wp-content/uploads/2022/02/houzez-office.jpg",
                url: "https://demo02.houzez.co/",
              },
              {
                id: "d4",
                name: "Trang Đích (Landing Page - ...)",
                url: "https://demo04.houzez.co/",
              },
              {
                id: "d5",
                name: "Agency 05 (DEMO 05)",
                url: "https://demo11.houzez.co/",
              },
            ],
          },
          {
            id: "t2",
            name: "RealHomes",
            desc: "Theme bất động sản bán chạy nhất trên ThemeForest, dễ dùng và mạnh mẽ.",
            demos: [
              {
                id: "d4",
                name: "Modern",
                image:
                  "https://demo.realhomes.io/modern/wp-content/uploads/2023/01/realhomes-modern.jpg",
                url: "https://preview.themeforest.net/item/real-homes-wordpress-real-estate-theme/full_screen_preview/5373914",
              },
              {
                id: "d5",
                name: "Classic",
                image:
                  "https://demo.realhomes.io/classic/wp-content/uploads/2023/01/realhomes-classic.jpg",
                url: "https://demo.realhomes.io/classic/",
              },
            ],
          },
        ],
        medicaltourism: [
          {
            id: "t3",
            name: "Medizco",
            desc: "Theme chuyên nghiệp cho bệnh viện, du lịch y tế, và phòng khám quốc tế.",
            demos: [
              {
                id: "d6",
                name: "Default Clinic",
                image:
                  "https://themeforest.img.customer.envatousercontent.com/files/301107221/medizco.jpg",
                url: "https://medizco.themexriver.com/",
              },
              {
                id: "d7",
                name: "Health Tourism",
                image:
                  "https://medizco.themexriver.com/medical-tourism/wp-content/uploads/2020/03/medizco-health-tourism.jpg",
                url: "https://medizco.themexriver.com/medical-tourism/",
              },
              {
                id: "d8",
                name: "Hospital & Medical Center",
                url: "https://medizco.themexriver.com/hospital/",
              },
              {
                id: "d9",
                name: "Dental Clinic",
                url: "https://medizco.themexriver.com/dental/",
              },
            ],
          },
          {
            id: "t4",
            name: "Clinika",
            desc: "Theme tối ưu cho phòng khám, du lịch chữa bệnh, telemedicine.",
            demos: [
              {
                id: "d8",
                name: "Medical Center",
                image:
                  "https://themeforest.img.customer.envatousercontent.com/files/384615289/clinika.jpg",
                url: "https://themeforest.net/item/clinika-medical-clinic-healthcare-wordpress-theme/32854307",
              },
              {
                id: "d9",
                name: "Wellness",
                image:
                  "https://clinika.axiomthemes.com/wp-content/uploads/2021/09/clinika-wellness.jpg",
                url: "https://clinika.axiomthemes.com/",
              },
            ],
          },
        ],
        ecommerce: [
          {
            id: "t5",
            name: "Flatsome",
            desc: "Theme bán hàng số 1 cho WooCommerce, tốc độ cao, tối ưu UX.",
            demos: [
              {
                id: "d10",
                name: "Main Demo",
                image:
                  "https://flatsome3.uxthemes.com/wp-content/uploads/2023/04/flatsome-main-demo.jpg",
                url: "https://themeforest.net/item/flatsome-multipurpose-responsive-woocommerce-theme/5484319",
              },
              {
                id: "d11",
                name: "Electronics",
                image:
                  "https://flatsome3.uxthemes.com/electronics/wp-content/uploads/2023/04/electronics-demo.jpg",
                url: "https://flatsome3.uxthemes.com/electronics/",
              },
              {
                id: "d12",
                name: "Fashion",
                image:
                  "https://flatsome3.uxthemes.com/fashion/wp-content/uploads/2023/04/fashion-demo.jpg",
                url: "https://flatsome3.uxthemes.com/fashion/",
              },
            ],
          },
          {
            id: "t6",
            name: "WoodMart",
            desc: "Theme eCommerce đa ngành, hỗ trợ Elementor, tối ưu SEO.",
            demos: [
              {
                id: "d13",
                name: "Main",
                image:
                  "https://woodmart.xtemos.com/wp-content/uploads/2023/01/woodmart-main.jpg",
                url: "https://themeforest.net/item/woodmart-woocommerce-wordpress-theme/20264492",
              },
              {
                id: "d14",
                name: "Furniture",
                image:
                  "https://woodmart.xtemos.com/wp-content/uploads/2023/01/woodmart-furniture.jpg",
                url: "https://woodmart.xtemos.com/furniture/",
              },
            ],
          },
        ],
        others: [
          {
            id: "t7",
            name: "Divi",
            desc: "Theme đa năng mạnh mẽ với visual builder, phù hợp mọi ngành nghề.",
            demos: [
              {
                id: "d15",
                name: "Main Demo",
                image:
                  "https://www.elegantthemes.com/layouts/wp-content/uploads/2019/05/divi-layout-pack-preview.jpg",
                url: "https://www.elegantthemes.com/gallery/divi/",
              },
              {
                id: "d16",
                name: "Business",
                image:
                  "https://www.elegantthemes.com/layouts/wp-content/uploads/2019/06/business-layout-pack.jpg",
                url: "https://www.elegantthemes.com/layouts/business/live-demo/",
              },
            ],
          },
          {
            id: "t8",
            name: "Avada",
            desc: "Theme WordPress bán chạy nhất mọi thời đại, đa năng và dễ sử dụng.",
            demos: [
              {
                id: "d17",
                name: "Corporate",
                image:
                  "https://avada.website/wp-content/uploads/2020/01/corporate-demo.jpg",
                url: "https://avada.website/corporate/",
              },
              {
                id: "d18",
                name: "Portfolio",
                image:
                  "https://avada.website/wp-content/uploads/2020/01/portfolio-demo.jpg",
                url: "https://avada.website/portfolio/",
              },
            ],
          },
          {
            id: "t9",
            name: "Astra",
            desc: "Theme nhẹ, nhanh, tương thích tốt với page builder và WooCommerce.",
            demos: [
              {
                id: "d19",
                name: "Agency",
                image:
                  "https://websitedemos.net/digital-agency-04/wp-content/uploads/sites/207/2018/10/agency-demo.jpg",
                url: "https://websitedemos.net/digital-agency-04/",
              },
              {
                id: "d20",
                name: "Restaurant",
                image:
                  "https://websitedemos.net/restaurant-08/wp-content/uploads/sites/201/2018/10/restaurant-demo.jpg",
                url: "https://websitedemos.net/restaurant-08/",
              },
            ],
          },
        ],
      };
      localStorage.setItem("ht_themes", JSON.stringify(seedData));
      setThemesByCat(seedData);
    } else {
      const parsed = JSON.parse(stored);
      setThemesByCat(parsed);
    }
  }, []);

  useEffect(() => {
    const flat = Object.entries(themesByCat).flatMap(([category, items]: any) =>
      items.map((it: any) => ({ ...it, category }))
    );
    setAllFlat(flat);
  }, [themesByCat]);

  const filteredCategories = useMemo(() => {
    let filteredCats = categories;

    console.log("🔄 Category Filter Update:", {
      selectedCategory,
      searchTerm: globalSearch,
      totalCategories: categories.length,
    });

    // Filter by category (nếu không phải "all")
    if (selectedCategory !== "all") {
      filteredCats = categories.filter((cat) => cat.id === selectedCategory);
      console.log(
        `📂 Category filter applied: ${selectedCategory}, result: ${filteredCats.length} categories`
      );
    }

    // Filter by search (nếu có search term)
    if (globalSearch && globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      filteredCats = filteredCats.filter((cat) => {
        // Enhanced search: prioritize category name and description matching
        const categoryMatches =
          cat.title.toLowerCase().includes(q) ||
          cat.desc.toLowerCase().includes(q) ||
          cat.id.toLowerCase().includes(q);

        const themesInCategory = themesByCat[cat.id] || [];
        const hasMatchingThemes = themesInCategory.some(
          (theme) =>
            // Enhanced search: prioritize theme name matching
            theme.name.toLowerCase().includes(q) ||
            theme.desc.toLowerCase().includes(q) ||
            // Also search in demo names and URLs
            theme.demos?.some(
              (demo) =>
                (demo.name || "").toLowerCase().includes(q) ||
                (demo.url || "").toLowerCase().includes(q)
            )
        );

        return categoryMatches || hasMatchingThemes;
      });
      console.log(
        `🔍 Search filter applied: "${q}", result: ${filteredCats.length} categories`
      );
    }

    console.log("✅ Final filtered categories:", filteredCats.length);
    return filteredCats;
  }, [globalSearch, selectedCategory, themesByCat]);

  // Functions để xử lý modal
  const openDemoModal = (theme: Theme) => {
    setSelectedTheme(theme);
    setShowModal(true);
  };

  const closeDemoModal = () => {
    setSelectedTheme(null);
    setShowModal(false);
  };

  // Xử lý đóng modal bằng ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDemoModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTheme.name || !newTheme.category)
      return alert("Vui lòng nhập tên và chọn danh mục");
    const stored = JSON.parse(localStorage.getItem("ht_themes") || "{}");
    const theme: Theme = {
      id: Date.now().toString(),
      name: newTheme.name,
      desc: newTheme.desc,
      demos: [],
    };
    if (newTheme.demoName) {
      theme.demos.push({
        id: Date.now().toString() + "-d",
        name: newTheme.demoName,
        image: newTheme.demoImage,
        url: newTheme.demoUrl,
      });
    }
    if (!stored[newTheme.category]) stored[newTheme.category] = [];
    stored[newTheme.category].push(theme);
    localStorage.setItem("ht_themes", JSON.stringify(stored));
    setThemesByCat(stored);
    setNewTheme({
      name: "",
      desc: "",
      category: "",
      demoName: "",
      demoUrl: "",
      demoImage: "",
    });
    alert("Đã thêm theme!");
  };

  return (
    <>
      <Head>
        <title>H Themes — Kho theme WordPress</title>
        <meta
          name="description"
          content="H Themes - Lưu trữ theme WordPress cho nhiều ngành nghề. Multi-demo cho mỗi theme."
        />
      </Head>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center">
            {/* Logo with enhanced animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-8 animate-bounceOnce">
              <img
                src="/logo.svg"
                alt="H Themes"
                className="w-12 h-12 filter brightness-0 invert"
              />
            </div>

            {/* Main Title with gradient text */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                H Themes
              </span>
            </h1>

            {/* Enhanced subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4 animate-slideUp font-light leading-relaxed">
              Kho theme WordPress chuyên nghiệp
            </p>
            <p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              Phân loại theo ngành nghề với nhiều demo live cho mỗi theme • Tối
              ưu SEO • Responsive hoàn hảo
            </p>

            {/* Enhanced CTA button */}
            <div
              className="flex items-center justify-center mb-12 animate-slideUp"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="/themes"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats Section */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slideUp"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {Object.values(themesByCat).flat().length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Premium Themes
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  4
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Ngành nghề
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Live Demos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Responsive
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white dark:text-gray-900"
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

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tìm kiếm & Lọc Theme
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Khám phá hàng trăm theme WordPress chất lượng cao, được phân loại
              theo ngành nghề
            </p>
          </div>

          {/* Enhanced Search Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên theme (VD: Houzez, Flatsome) hoặc danh mục (VD: Bất động sản, Y tế)..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 transition-all duration-200"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>

            {/* Search suggestions when typing */}
            {globalSearch && globalSearch.trim() && (
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-700 dark:text-blue-300">
                    Tìm kiếm "{globalSearch}" trong tên theme và danh mục...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Category Filter */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Lọc theo danh mục
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => {
                  console.log("🎯 Category button clicked: all");
                  setSelectedCategory("all");
                }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers3 className="w-4 h-4" />
                  <span>Tất cả</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === "all"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {Object.values(themesByCat).flat().length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  console.log("🎯 Category button clicked: realestate");
                  setSelectedCategory("realestate");
                }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "realestate"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-600 hover:text-emerald-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Bất động sản</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === "realestate"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {themesByCat.realestate?.length || 0}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  console.log("🎯 Category button clicked: medicaltourism");
                  setSelectedCategory("medicaltourism");
                }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "medicaltourism"
                    ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg shadow-pink-500/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-600 hover:text-pink-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Y tế & Du lịch</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === "medicaltourism"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {themesByCat.medicaltourism?.length || 0}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  console.log("🎯 Category button clicked: ecommerce");
                  setSelectedCategory("ecommerce");
                }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "ecommerce"
                    ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-600 hover:text-orange-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>E-commerce</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === "ecommerce"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {themesByCat.ecommerce?.length || 0}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  console.log("🎯 Category button clicked: others");
                  setSelectedCategory("others");
                }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "others"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 hover:text-purple-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers3 className="w-4 h-4" />
                  <span>Đa năng</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === "others"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {themesByCat.others?.length || 0}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Results Info */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {selectedCategory === "all"
                  ? `Hiển thị ${filteredCategories.length} danh mục với ${
                      Object.values(themesByCat).flat().length
                    } Theme`
                  : `Danh mục "${
                      categories.find((c) => c.id === selectedCategory)?.title
                    }" ${themesByCat[selectedCategory]?.length || 0} Theme`}
                {globalSearch &&
                  globalSearch.trim() &&
                  ` • Tìm kiếm: "${globalSearch}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {filteredCategories.length ? (
          filteredCategories.map((cat) => {
            const list = themesByCat[cat.id] || [];
            const preview = list.slice(0, 3);

            // Category color mapping
            const categoryColors = {
              realestate: {
                bg: "from-emerald-500 to-teal-600",
                accent: "emerald",
              },
              medicaltourism: {
                bg: "from-pink-500 to-rose-600",
                accent: "pink",
              },
              ecommerce: {
                bg: "from-orange-500 to-amber-600",
                accent: "orange",
              },
              others: { bg: "from-purple-500 to-indigo-600", accent: "purple" },
            };

            const colors = categoryColors[cat.id] || {
              bg: "from-blue-500 to-blue-600",
              accent: "blue",
            };

            return (
              <div key={cat.id} className="animate-slideUp">
                {/* Enhanced Category Header */}
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 mb-8 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Background Pattern */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-5`}
                  ></div>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${colors.bg} rounded-full transform translate-x-16 -translate-y-16`}
                    ></div>
                  </div>

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-2xl shadow-lg`}
                        >
                          {cat.id === "realestate" && (
                            <Building2 className="w-6 h-6 text-white" />
                          )}
                          {cat.id === "medicaltourism" && (
                            <Stethoscope className="w-6 h-6 text-white" />
                          )}
                          {cat.id === "ecommerce" && (
                            <ShoppingCart className="w-6 h-6 text-white" />
                          )}
                          {cat.id === "others" && (
                            <Layers3 className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {cat.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {cat.desc}
                            </span>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${colors.accent}-100 text-${colors.accent}-800 dark:bg-${colors.accent}-900/30 dark:text-${colors.accent}-300`}
                            >
                              {list.length} theme{list.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/themes/${cat.id}`}
                      className={`btn-gradient inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.bg} text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold`}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Enhanced Theme Cards */}
                {preview.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {preview
                      .filter((t) => {
                        // Additional filtering for themes within categories when searching
                        if (!globalSearch || !globalSearch.trim()) return true;
                        const q = globalSearch.toLowerCase();
                        return (
                          t.name.toLowerCase().includes(q) ||
                          t.desc.toLowerCase().includes(q) ||
                          cat.title.toLowerCase().includes(q) ||
                          cat.desc.toLowerCase().includes(q) ||
                          t.demos?.some(
                            (demo) =>
                              (demo.name || "").toLowerCase().includes(q) ||
                              (demo.url || "").toLowerCase().includes(q)
                          )
                        );
                      })
                      .map((t, index) => (
                        <div
                          key={t.id}
                          className="group card-hover bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Theme Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                {/* Highlight search term in theme name */}
                                {globalSearch && globalSearch.trim() ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: t.name.replace(
                                        new RegExp(`(${globalSearch})`, "gi"),
                                        '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                                      ),
                                    }}
                                  />
                                ) : (
                                  t.name
                                )}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-${colors.accent}-100 text-${colors.accent}-800 dark:bg-${colors.accent}-900/30 dark:text-${colors.accent}-300`}
                                >
                                  {/* Highlight search term in category name */}
                                  {globalSearch && globalSearch.trim() ? (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: cat.title.replace(
                                          new RegExp(`(${globalSearch})`, "gi"),
                                          '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                                        ),
                                      }}
                                    />
                                  ) : (
                                    cat.title
                                  )}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    4.8
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Theme Description */}
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                            {/* Highlight search term in description */}
                            {globalSearch && globalSearch.trim() ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: t.desc.replace(
                                    new RegExp(`(${globalSearch})`, "gi"),
                                    '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                                  ),
                                }}
                              />
                            ) : (
                              t.desc
                            )}
                          </p>

                          {/* Demo Info */}
                          <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t.demos?.length || 0} demo live
                            </span>
                            <div className="flex-1"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Responsive
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => openDemoModal(t)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-blue-600 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm">Xem Demo</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Layers3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium mb-2">
                      Chưa có theme trong danh mục này
                    </p>
                    <p className="text-gray-400 text-sm">
                      Chúng tôi đang cập nhật thêm theme mới. Vui lòng quay lại
                      sau!
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để khám phá
              thêm theme
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setGlobalSearch("")}
                className="px-4 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
              >
                Xóa tìm kiếm
              </button>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-4 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
              >
                Xem tất cả danh mục
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Modal cho Demo Chi Tiết */}
      {showModal && selectedTheme && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeDemoModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  Demos Chi Tiết: {selectedTheme.name}
                </h3>
                <button
                  onClick={closeDemoModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Theme này có{" "}
                  <strong>
                    {selectedTheme.demos?.length || 0} mẫu demo LIVE
                  </strong>{" "}
                  chuyên biệt theo từng phân khúc ngành nghề. Bấm vào để xem
                  trực tiếp!
                </p>
              </div>

              <div className="space-y-4">
                {selectedTheme.demos?.map((demo, index) => (
                  <div
                    key={demo.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Demo: {demo.name}
                      </h4>
                      {demo.url && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {demo.url}
                        </p>
                      )}
                    </div>
                    {demo.url && (
                      <a
                        href={
                          demo.url.startsWith("http")
                            ? demo.url
                            : `https://${demo.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                        onClick={(e) => {
                          console.log("Clicking demo URL:", demo.url);
                          // If URL is invalid, prevent default and show error
                          try {
                            const url = new URL(
                              demo.url.startsWith("http")
                                ? demo.url
                                : `https://${demo.url}`
                            );
                            console.log("Valid URL:", url.href);
                          } catch (error) {
                            e.preventDefault();
                            console.error("Invalid URL:", error);
                            alert("URL không hợp lệ: " + demo.url);
                          }
                        }}
                      >
                        Live Demo 🔗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
