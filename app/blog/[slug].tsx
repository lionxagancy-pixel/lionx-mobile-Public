import { ArchitectureDetailPage } from "@/components/architecture-page";

export function generateStaticParams() {
  return [{ slug: "demo" }];
}

export default function Page() {
  return <ArchitectureDetailPage pageKey="blog-detail" paramName="slug" />;
}
