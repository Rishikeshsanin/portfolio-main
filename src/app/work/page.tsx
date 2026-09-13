import type { Metadata } from "next";
import ProjectGrid from "../components/ProjectGrid";
import MoreProjects from "../components/MoreProjects";

export const metadata: Metadata = {
    title: "Work",
};

export default function WorkPage() {
    return (
        <main className="flex-1 flex flex-col pt-32 pb-40 min-h-screen">
            <ProjectGrid />
            <MoreProjects />
        </main>
    );
}
