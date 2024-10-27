import { SharedCredits } from "@/components/home";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <SharedCredits />
    </Suspense>
  );
}
