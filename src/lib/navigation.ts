export interface NavItem {
    label: string;
    slug: string;
    anchorId?: string;
    children?: NavItem[];
}

export interface NavCategory {
    label: string;
    href: string;
    anchorId: string; // The ID on the home page for anchor scrolling
    children: NavItem[];
}

export const navigation: NavCategory[] = [
    {
        label: "Home",
        href: "/",
        anchorId: "home",
        children: [
            { label: "News", slug: "news", anchorId: "news" },
            { label: "Upcoming Events", slug: "upcoming-events", anchorId: "upcoming-events" },
            { label: "Message from MD/Head", slug: "message-from-md", anchorId: "message-from-md" },
            { label: "Dashboard Features & Infographics", slug: "dashboard", anchorId: "dashboard" },
        ],
    },
    {
        label: "About Us",
        href: "/about",
        anchorId: "about",
        children: [
            { label: "CLSD", slug: "clsd" },
            { label: "Partners Abroad", slug: "partners-abroad" },
            { label: "Mission & Vision", slug: "mission-vision" },
            { label: "Staff Profile", slug: "staff-profile" },
        ],
    },
    {
        label: "Services",
        href: "/services",
        anchorId: "services",
        children: [
            {
                label: "Policy Advocacy & Research",
                slug: "policy-advocacy",
                children: [
                    { label: "Policy Planning & Formulation", slug: "policy-planning" },
                    { label: "Policy Advocacy to Donors", slug: "policy-advocacy-donors" },
                    { label: "Stakeholders Consultation", slug: "stakeholders-consultation" },
                ],
            },
            { label: "Capacity Development & Trainings", slug: "capacity-development" },
            { label: "Business Case & Project Dev Support", slug: "business-case" },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        anchorId: "projects",
        children: [
            {
                label: "PDS / Info about Assignment",
                slug: "pds",
                children: [
                    { label: "Project 1 / Assignment 1", slug: "project-1" },
                    { label: "Project 2", slug: "project-2" },
                    { label: "Project 3", slug: "project-3" },
                ],
            },
            { label: "Projects in Hand", slug: "projects-in-hand" },
            { label: "Upcoming Projects", slug: "upcoming-projects" },
        ],
    },
    {
        label: "Info Center",
        href: "/info-center",
        anchorId: "info-center",
        children: [
            { label: "Download", slug: "download" },
            {
                label: "Energy Sector",
                slug: "energy-sector",
                children: [
                    { label: "Renewable Energy", slug: "renewable-energy" },
                    { label: "Energy Efficiency", slug: "energy-efficiency" },
                    { label: "Energy Sector Analytics", slug: "energy-analytics" },
                    { label: "Current & Future Trends", slug: "energy-trends" },
                ],
            },
            {
                label: "Climate Change",
                slug: "climate-change",
                children: [
                    { label: "Climate Change Adaptation", slug: "climate-adaptation" },
                ],
            },
            { label: "Sustainable Development", slug: "sustainable-development" },
        ],
    },
    {
        label: "Work Dimensions",
        href: "/work-dimensions",
        anchorId: "work-dimensions",
        children: [
            { label: "Power Plant", slug: "power-plant" },
            { label: "Textile", slug: "textile" },
            { label: "Cement & Fertilizer", slug: "cement-fertilizer" },
            { label: "Steel Mill", slug: "steel-mill" },
            { label: "Chemical Industries", slug: "chemical-industries" },
            { label: "Paper & Jute Mills", slug: "paper-jute-mills" },
            { label: "Power Transmission & Distribution", slug: "power-transmission" },
            { label: "Gas Transmission & Distribution", slug: "gas-transmission" },
            { label: "Real Estate", slug: "real-estate" },
            { label: "Agriculture", slug: "agriculture" },
            { label: "Poultry", slug: "poultry" },
            { label: "Waste Management", slug: "waste-management" },
            { label: "Forestry", slug: "forestry" },
        ],
    },
    {
        label: "Feedback",
        href: "/feedback",
        anchorId: "feedback",
        children: [
            { label: "Write to Us", slug: "write-to-us" },
            { label: "Opportunities", slug: "opportunities" },
        ],
    },
    {
        label: "Contact Us",
        href: "/contact",
        anchorId: "contact",
        children: [
            { label: "Bangladesh Carbon", slug: "bangladesh-carbon" },
            { label: "External Links", slug: "external-links" },
            { label: "Glossary", slug: "glossary" },
        ],
    },
];

/** Find a category by its href path */
export function getCategoryByPath(pathname: string): NavCategory | undefined {
    if (pathname === "/") return navigation[0];
    return navigation.find(
        (cat) => cat.href !== "/" && pathname.startsWith(cat.href)
    );
}

/** Flatten all slugs from a category's children (including nested) */
export function flattenSlugs(items: NavItem[]): NavItem[] {
    const result: NavItem[] = [];
    for (const item of items) {
        result.push(item);
        if (item.children) {
            result.push(...flattenSlugs(item.children));
        }
    }
    return result;
}
