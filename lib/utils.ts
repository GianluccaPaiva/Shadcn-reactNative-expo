import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getCorMateria = (nomeDaMateria: string) => {
    const cores = [
        { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-700 dark:text-blue-400" },
        { bg: "bg-emerald-100 dark:bg-emerald-900/50", text: "text-emerald-700 dark:text-emerald-400" },
        { bg: "bg-red-100 dark:bg-red-900/50", text: "text-red-700 dark:text-red-400" },
        { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-700 dark:text-purple-400" },
        { bg: "bg-amber-100 dark:bg-amber-900/50", text: "text-amber-700 dark:text-amber-400" },
        { bg: "bg-pink-100 dark:bg-pink-900/50", text: "text-pink-700 dark:text-pink-400" },
        { bg: "bg-teal-100 dark:bg-teal-900/50", text: "text-teal-700 dark:text-teal-400" },
        { bg: "bg-indigo-100 dark:bg-indigo-900/50", text: "text-indigo-700 dark:text-indigo-400" },
        { bg: "bg-orange-100 dark:bg-orange-900/50", text: "text-orange-700 dark:text-orange-400" },
        { bg: "bg-cyan-100 dark:bg-cyan-900/50", text: "text-cyan-700 dark:text-cyan-400" },
        { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/50", text: "text-fuchsia-700 dark:text-fuchsia-400" },
        { bg: "bg-rose-100 dark:bg-rose-900/50", text: "text-rose-700 dark:text-rose-400" },
        { bg: "bg-violet-100 dark:bg-violet-900/50", text: "text-violet-700 dark:text-violet-400" },
        { bg: "bg-sky-100 dark:bg-sky-900/50", text: "text-sky-700 dark:text-sky-400" },
        { bg: "bg-lime-100 dark:bg-lime-900/50", text: "text-lime-800 dark:text-lime-400" },
    ];

    let hash = 0;
    for (let i = 0; i < nomeDaMateria.length; i++) {
        hash = nomeDaMateria.charCodeAt(i) + ((hash << 5) - hash);
    }

    return cores[Math.abs(hash) % cores.length];
};