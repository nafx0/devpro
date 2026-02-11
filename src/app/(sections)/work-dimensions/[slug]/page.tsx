import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation } from "@/lib/navigation";

const workCategory = navigation.find((c) => c.href === "/work-dimensions");

export default async function WorkDimensionsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = workCategory?.children.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="Work Dimensions"
            title={item?.label || slug}
            description={`Our expertise and project portfolio in the ${item?.label || slug} sector.`}
            breadcrumbs={["Work Dimensions", item?.label || slug]}
        />
    );
}
