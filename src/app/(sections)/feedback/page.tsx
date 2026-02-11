import FeedbackForm from "@/components/sections/FeedbackForm";

export default function FeedbackPage() {
    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-deep-forest/40 mb-6">
                <span>Feedback</span>
                <span className="text-deep-forest/20">/</span>
                <span>Write to Us</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-[0.2em] text-growth-green mb-3">
                Feedback
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep-forest leading-tight mb-4">
                Write to Us
            </h1>

            <p className="text-lg text-deep-forest/60 leading-relaxed mb-10 max-w-2xl">
                We value your feedback, queries, and suggestions. Reach out and our team will respond within 48 hours.
            </p>

            <FeedbackForm />
        </div>
    );
}
