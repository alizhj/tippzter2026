type Props = {
  src: string;
  alt: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
} as const;

export function TeamFlag({ src, alt, size = "md" }: Props) {
  const px = size === "sm" ? 20 : 28;
  return (
    <img
      src={src}
      alt={alt}
      width={px}
      height={px}
      loading="lazy"
      className={`${sizeClasses[size]} shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700`}
    />
  );
}
