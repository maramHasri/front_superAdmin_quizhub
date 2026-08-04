import Sidebar from "@/components/layout/Sidebar";
import Appbar from "@/components/layout/Appbar";

export default function DashboardLayout({
  children,
  searchValue,
  onSearchChange,
  activeTab = "accreditations",
  variant = "default",
  searchPlaceholder,
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f6f8]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Appbar
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          activeTab={activeTab}
          variant={variant}
          searchPlaceholder={searchPlaceholder}
        />

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
