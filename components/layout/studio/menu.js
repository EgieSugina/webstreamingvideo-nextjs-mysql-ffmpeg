import Link from "next/link";

export default function Menu({ main, icons, name, href }) {
  return (
    <>
      <li className="px-3">
        <Link
          href={(main || "/studio/") + href}
          className="flex items-center gap-3 rounded p-3 text-slate-300 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
        >
          <div className="flex items-center self-center">{icons}</div>
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            {name}
          </div>
        </Link>
      </li>
    </>
  );
}
