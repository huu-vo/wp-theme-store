"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Menu,
  X,
  Building2,
  Stethoscope,
  ShoppingCart,
  Layers3,
  Globe,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Facebook,
  Linkedin,
  Star,
  Heart,
  Coffee,
  Zap,
  Shield,
  Clock,
  Users,
  ArrowUp,
} from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      const showButton = window.scrollY > 400;
      setScrolled(isScrolled);
      setShowScrollTop(showButton);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ht_theme");
    const prefer = saved
      ? saved === "dark"
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefer);
    document.documentElement.classList.toggle("dark", prefer);
  }, []);

  const toggle = () => {
    const v = !dark;
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("ht_theme", v ? "dark" : "light");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    {
      id: "realestate",
      title: "Bất động sản",
      icon: Building2,
      color: "emerald",
    },
    {
      id: "medicaltourism",
      title: "Du lịch y tế",
      icon: Stethoscope,
      color: "pink",
    },
    { id: "ecommerce", title: "Bán hàng", icon: ShoppingCart, color: "orange" },
    { id: "others", title: "Ngành nghề khác", icon: Layers3, color: "purple" },
  ];

  return (
    <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      {/* Enhanced Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  H Themes
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  WordPress Store
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
              >
                Trang chủ
              </Link>
              <Link
                href="/themes"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
              >
                Kho theme
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 flex items-center gap-1">
                  Danh mục
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/themes/${cat.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group/item"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            cat.color === "emerald"
                              ? "bg-emerald-100 dark:bg-emerald-900/30"
                              : cat.color === "pink"
                              ? "bg-pink-100 dark:bg-pink-900/30"
                              : cat.color === "orange"
                              ? "bg-orange-100 dark:bg-orange-900/30"
                              : "bg-purple-100 dark:bg-purple-900/30"
                          }`}
                        >
                          <cat.icon
                            className={`w-4 h-4 ${
                              cat.color === "emerald"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : cat.color === "pink"
                                ? "text-pink-600 dark:text-pink-400"
                                : cat.color === "orange"
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-purple-600 dark:text-purple-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                            {cat.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Theme chuyên nghiệp
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                aria-label="Toggle theme"
                onClick={toggle}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              >
                {dark ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/themes"
                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kho theme
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Danh mục
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/themes/${cat.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <cat.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {cat.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Enhanced Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    H Themes
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Premium WordPress Store
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-md">
                Kho theme WordPress chuyên nghiệp hàng đầu Việt Nam. Cung cấp
                các mẫu theme đa dạng, tối ưu SEO và hiệu suất cao cho mọi ngành
                nghề.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    500+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Themes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    10K+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Khách hàng
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    4.9★
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Đánh giá
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Theo dõi:
                </span>
                <div className="flex gap-2">
                  {[
                    { icon: Facebook, color: "bg-blue-600 hover:bg-blue-700" },
                    { icon: Twitter, color: "bg-sky-500 hover:bg-sky-600" },
                    { icon: Linkedin, color: "bg-blue-700 hover:bg-blue-800" },
                    { icon: Github, color: "bg-gray-800 hover:bg-gray-900" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`w-8 h-8 ${social.color} text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Liên kết nhanh
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Trang chủ", href: "/" },
                  { name: "Kho theme", href: "/themes" },
                  { name: "Bất động sản", href: "/themes/realestate" },
                  { name: "Du lịch y tế", href: "/themes/medicaltourism" },
                  { name: "Bán hàng", href: "/themes/ecommerce" },
                  { name: "Ngành nghề khác", href: "/themes/others" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Liên hệ
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    honghuudl@gmail.com
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    +84 982577598
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Đà Nẵng, Việt Nam
                  </span>
                </li>
              </ul>

              {/* Features */}
              <div className="mt-6 space-y-2">
                {[
                  {
                    icon: Shield,
                    text: "Bảo mật cao",
                    color: "text-green-600",
                  },
                  { icon: Zap, text: "Tốc độ nhanh", color: "text-yellow-600" },
                  { icon: Clock, text: "Hỗ trợ 24/7", color: "text-blue-600" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>© {new Date().getFullYear()} H Themes</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Made with</span>
                <Heart className="w-4 h-4 text-red-500 hidden md:inline" />
                <span className="hidden md:inline">in Vietnam</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 ${
          showScrollTop
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 mx-auto" />
      </button>
    </body>
  );
}
