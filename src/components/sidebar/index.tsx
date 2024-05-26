import { Suspense } from "react";
import { Header } from "./header";

export const Sidebar = () => {
  return (
    <aside className="bg-slate-500 md:flex-1 rounded-xl p-3 md:max-w-72">
      <Suspense>
        <Header />
      </Suspense>
    </aside>
  );
};
