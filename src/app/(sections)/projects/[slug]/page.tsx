import PlaceholderPage from "@/components/sections/PlaceholderPage";
import { navigation, flattenSlugs } from "@/lib/navigation";

const projectsCategory = navigation.find((c) => c.href === "/projects");

export default async function ProjectsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allItems = projectsCategory ? flattenSlugs(projectsCategory.children) : [];
    const item = allItems.find((c) => c.slug === slug);

    return (
        <PlaceholderPage
            section="Projects & Assignments"
            title={item?.label || slug}
            description={`Details and progress on ${item?.label || slug}.`}
            breadcrumbs={["Projects", item?.label || slug]}
        />
    );
}
