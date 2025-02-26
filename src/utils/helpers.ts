import { twMerge } from "tailwind-merge";
type ClassValue = string | boolean | undefined | null | Record<string, boolean>;
export const clsx = (...classes: ClassValue[]) => twMerge([...new Set(classes.flat().filter(Boolean))].join(" "));

export const durationFormat = (duration: number): string => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration / 60) % 60;
    const s = Math.floor(duration % 60);
    return `${h ? `${h}:` : ""}${m}:${s.toString().padStart(2, "0")}`;
};

export const errorFormat = (code: number): string => {
    switch (code) {
        case 1: return "Ошибка FETCH: воспроизведение было прервано.";
        case 2: return "Ошибка сети: не удалось загрузить видео.";
        case 3: return "Ошибка декодирования: видео повреждено или неподдерживаемый формат.";
        case 4: return "Источник видео не найден или неподдерживается.";
        default: return "Неизвестная ошибка воспроизведения.";
    }
};

export const parseTime = (time: string) => {
    const match = time.match(/(\d+)([smh]?)/);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    return match[2] === "m" ? (match[3] === "h" ? (value * 60 ** 2) : value * 60) : value;
}