import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation, flattenSlugs } from "@/lib/navigation";

const servicesCategory = navigation.find((c) => c.href === "/services");

export default async function ServicesSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allItems = servicesCategory ? flattenSlugs(servicesCategory.children) : [];
    const item = allItems.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="Services We Offer"
            title={item?.label || slug}
            description={`Detailed information about our ${item?.label || slug} service offerings and expertise.`}
            breadcrumbs={["Services", item?.label || slug]}
        />
    );
}
