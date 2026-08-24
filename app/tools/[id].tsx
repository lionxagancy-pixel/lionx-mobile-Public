import { ArchitectureDetailPage } from "@/components/architecture-page";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function Page() {
  return <ArchitectureDetailPage pageKey="tools-detail" paramName="id" />;
}
