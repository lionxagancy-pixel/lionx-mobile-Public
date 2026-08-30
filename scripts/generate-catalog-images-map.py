from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest_path = ROOT / "public/assets/data/catalog-image-manifest.json"
out_path = ROOT / "shared/catalog-images.ts"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
entries = [entry for entry in manifest if entry.get("status") == "downloaded" and entry.get("local_file")]

lines = [
    'import { Platform, type ImageSourcePropType } from "react-native";',
    "",
    "type CatalogImageAsset = {",
    "  native: ImageSourcePropType;",
    "  web: string;",
    "};",
    "",
    "const webAsset = (filename: string) => {",
    '  const prefix = typeof window === "undefined"',
    '    ? "/lionx-mobile-Public"',
    '    : window.location.pathname.startsWith("/lionx-mobile-Public")',
    '      ? "/lionx-mobile-Public"',
    '      : "";',
    '  return `${prefix}/assets/catalog/${filename}`;',
    "};",
    "",
    "const asset = (filename: string, native: ImageSourcePropType): CatalogImageAsset => ({",
    "  native,",
    "  web: webAsset(filename),",
    "});",
    "",
    "export const localCatalogImages: Record<string, CatalogImageAsset> = {",
]
for entry in entries:
    source = json.dumps(entry["source_url"], ensure_ascii=False)
    filename = entry["local_file"].rsplit("/", 1)[-1]
    filename_literal = json.dumps(filename, ensure_ascii=False)
    require_path = json.dumps(f"@/public/assets/catalog/{filename}")
    lines.append(f"  {source}: asset({filename_literal}, require({require_path})),")
lines += [
    "};",
    "",
    "export const getCatalogImageWebPath = (sourceUrl: string): string | undefined => localCatalogImages[sourceUrl]?.web;",
    "",
    "export const getCatalogImageSource = (sourceUrl: string): ImageSourcePropType | undefined => {",
    "  const local = localCatalogImages[sourceUrl];",
    "  if (!local) return undefined;",
    '  return Platform.OS === "web" ? { uri: local.web } : local.native;',
    "};",
    "",
]
out_path.write_text("\n".join(lines), encoding="utf-8")
print(f"generated={out_path} entries={len(entries)}")
