import Image from "next/image"
import { cn } from "@/lib/utils"

type MenuImageProps = {
    src: string
    alt: string
    size?: "sm" | "md" | "lg"
    rounded?: "sm" | "md" | "lg" | "full"
    className?: string
}

const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-32 h-32",
}

const roundedMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
}

export function MenuImage({
    src,
    alt,
    size = "md",
    rounded = "md",
    className,
}: MenuImageProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-muted",
                sizeMap[size],
                roundedMap[rounded],
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
    )
}
