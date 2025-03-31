import DynamicTablePage from "@/components/DynamicTablePage";

export default async function Page({ params }) {
    const { id } = await params;
    return <DynamicTablePage id={id} />;
}