import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation } from "@/lib/navigation";

const aboutCategory = navigation.find((c) => c.href === "/about");

export default async function AboutSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = aboutCategory?.children.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="About Us"
            title={item?.label || slug}
            description={`Explore ${item?.label || slug} — part of our institutional profile and organizational background.`}
            breadcrumbs={["About Us", item?.label || slug]}
        />
    );
}
