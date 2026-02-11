import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation } from "@/lib/navigation";

const feedbackCategory = navigation.find((c) => c.href === "/feedback");

export default async function FeedbackSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = feedbackCategory?.children.find((c) => c.slug === slug);

    if (slug === "write-to-us") {
        // Redirect logic or render form — for now use placeholder
        const FeedbackForm = (await import("@/components/sections/FeedbackForm")).default;
        return (
            <div className="max-w-3xl">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-growth-green mb-3">
                    Feedback
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep-forest leading-tight mb-4">
                    Write to Us
                </h1>
                <p className="text-lg text-deep-forest/60 leading-relaxed mb-10 max-w-2xl">
                    We value your feedback, queries, and suggestions.
                </p>
                <FeedbackForm />
            </div>
        );
    }

    return (
        <PlaceholderPage
            section="Feedback"
            title={item?.label || slug}
            description={`${item?.label || slug} — explore current openings and collaboration opportunities with DeVPro.`}
            breadcrumbs={["Feedback", item?.label || slug]}
        />
    );
}
