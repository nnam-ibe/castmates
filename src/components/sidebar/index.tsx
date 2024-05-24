import { SearchDrawer } from "@/components/search-drawer";
import { Suspense } from "react";
import { Header } from "./header";
import { SelectedList } from "./selected-list";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-500 flex-1 rounded-xl p-3 max-w-72">
      <Header />
      <div className="pt-8">
        <Suspense>
          <SearchDrawer />
        </Suspense>
      </div>
      <div>
        <Suspense>
          <SelectedList />
        </Suspense>
      </div>
    </aside>
  );
};
