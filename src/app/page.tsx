import { Credits } from "@/components/credits";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Credits />
    </Suspense>
  );
}
