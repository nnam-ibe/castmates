import { Header } from "./header";
import { NewSearch } from "./new-search";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-500 flex-1 rounded-xl p-3 max-w-72">
      <Header />
      <div className="pt-8">
        <NewSearch />
      </div>
    </aside>
  );
};
