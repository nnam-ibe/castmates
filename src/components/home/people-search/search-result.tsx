import { imgBasePath } from "@/lib/constants";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SearchResultProps = {
  id: number;
  name: string;
  profile_path?: string;
  clearSearchQuery: () => void;
};

export const SearchResult = (props: SearchResultProps) => {
  const { id, name, profile_path, clearSearchQuery } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const _id = props.id.toString();

  const updateSearchParams = useCallback(() => {
    if (searchParams.has("p", _id)) return;
    const params = new URLSearchParams(searchParams);
    params.append("p", _id);

    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
    clearSearchQuery();
  }, [searchParams, _id, router, pathname, clearSearchQuery]);

  return (
    <button
      key={id}
      className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center gap-3 group"
      onClick={updateSearchParams}
    >
      <Image
        src={`${imgBasePath}${profile_path}`}
        alt={""}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500 transition-colors"
      />
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{name}</span>
      </div>
    </button>
  );
};
