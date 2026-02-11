import Sidebar from "@/components/layout/Sidebar";
import ContentTransition from "@/components/layout/ContentTransition";

export default function SectionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-5rem)] pt-20">
            <Sidebar />
            <main className="flex-1 min-w-0">
                <ContentTransition>
                    <div className="px-6 py-8 lg:px-12 lg:py-10">
                        {children}
                    </div>
                </ContentTransition>
            </main>
        </div>
    );
}
