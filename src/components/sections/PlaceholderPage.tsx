import { HiOutlineDocumentText } from "react-icons/hi2";

interface PlaceholderPageProps {
    section: string;
    title: string;
    description?: string;
    breadcrumbs?: string[];
}

export default function PlaceholderPage({
    section,
    title,
    description,
    breadcrumbs,
}: PlaceholderPageProps) {
    return (
        <div className="max-w-3xl">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-deep-forest/40 mb-6">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} className="flex items-center gap-2">
                            {i > 0 && <span className="text-deep-forest/20">/</span>}
                            <span>{crumb}</span>
                        </span>
                    ))}
                </div>
            )}

            {/* Section label */}
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-growth-green mb-3">
                {section}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep-forest leading-tight mb-6">
                {title}
            </h1>

            {/* Description */}
            {description && (
                <p className="text-lg text-deep-forest/60 leading-relaxed mb-10 max-w-2xl">
                    {description}
                </p>
            )}

            {/* Placeholder content card */}
            <div className="rounded-2xl border border-deep-forest/5 bg-white/60 backdrop-blur-sm p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-2xl bg-growth-green/10 flex items-center justify-center mb-6">
                    <HiOutlineDocumentText className="w-7 h-7 text-growth-green" />
                </div>
                <h3 className="text-lg font-display font-semibold text-deep-forest mb-2">
                    Content Coming Soon
                </h3>
                <p className="text-sm text-deep-forest/50 max-w-md">
                    This section is being prepared by the DeVPro team. Rich content, data visualizations, and downloadable resources will appear here.
                </p>
            </div>
        </div>
    );
}
