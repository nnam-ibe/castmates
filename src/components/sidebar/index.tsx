import { SearchDrawer } from "@/components/search-drawer";
import { Header } from "./header";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-500 flex-1 rounded-xl p-3 max-w-72">
      <Header />
      <div className="pt-8">
        <SearchDrawer />
      </div>
    </aside>
  );
};
