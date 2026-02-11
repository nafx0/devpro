import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation } from "@/lib/navigation";

const contactCategory = navigation.find((c) => c.href === "/contact");

export default async function ContactSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = contactCategory?.children.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="Contact Us"
            title={item?.label || slug}
            description={`Information about ${item?.label || slug}.`}
            breadcrumbs={["Contact", item?.label || slug]}
        />
    );
}
