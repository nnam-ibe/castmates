import { SearchDrawer } from "@/components/search-drawer";
import { Suspense } from "react";
import { Header } from "./header";
import { SidebarPeople } from "./sidebar-people";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-500 flex-1 rounded-xl p-3 md:max-w-72">
      <Suspense>
        <Header />
      </Suspense>
      <div className="pt-8">
        <Suspense>
          <SearchDrawer />
        </Suspense>
      </div>
      <div>
        <Suspense>
          <SidebarPeople />
        </Suspense>
      </div>
    </aside>
  );
};
