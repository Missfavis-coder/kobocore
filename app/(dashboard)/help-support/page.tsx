import { Suspense } from "react";
import SupportPage from "./support-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading support...</div>}>
      <SupportPage />
    </Suspense>
  );
}