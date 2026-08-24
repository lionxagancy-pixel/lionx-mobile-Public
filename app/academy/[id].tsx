import { ArchitectureDetailPage } from "@/components/architecture-page";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function Page() {
  return <ArchitectureDetailPage pageKey="academy-detail" paramName="id" />;
}
