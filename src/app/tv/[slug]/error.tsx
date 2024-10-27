"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <TriangleAlert className="h-5 w-5" />
          <AlertTitle className="text-red-900">
            Oops! Something went wrong!
          </AlertTitle>
          <AlertDescription className="text-red-800 mt-2">
            {error?.message || "An unexpected error occurred"}
          </AlertDescription>
        </Alert>

        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <button
              onClick={reset}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Safety
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
