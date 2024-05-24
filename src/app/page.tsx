import { SharedCredits } from "@/components/shared-credits";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <SharedCredits />
    </Suspense>
  );
}
