import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "H Themes — Kho theme WordPress",
  description:
    "Lưu trữ theme WordPress cho nhiều ngành: bất động sản, du lịch y tế, bán hàng...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
