import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation, flattenSlugs } from "@/lib/navigation";

const infoCategory = navigation.find((c) => c.href === "/info-center");

export default async function InfoCenterSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allItems = infoCategory ? flattenSlugs(infoCategory.children) : [];
    const item = allItems.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="Information Center"
            title={item?.label || slug}
            description={`In-depth resources and analytics on ${item?.label || slug}.`}
            breadcrumbs={["Info Center", item?.label || slug]}
        />
    );
}
