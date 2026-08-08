import Sidebar from "@/components/layout/Sidebar";
import Appbar from "@/components/layout/Appbar";

export default function DashboardLayout({
  children,
  showSearch = false,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6f8] dark:bg-slate-900">
      <Sidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Appbar
          showSearch={showSearch}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
        />

        <main className="min-h-0 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
