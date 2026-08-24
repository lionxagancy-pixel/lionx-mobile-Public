from pathlib import Path
import re
import shutil

BASE = "/lionx-mobile-Public"
ROOT = Path("web-dist")

for html_path in ROOT.rglob("*.html"):
    text = html_path.read_text(encoding="utf-8")
    # Normalize any existing prefix first so the script is safe to run repeatedly.
    text = re.sub(rf'(href|src)="(?:{re.escape(BASE)}/)+', r'\1="/', text)
    text = text.replace('href="/', f'href="{BASE}/')
    text = text.replace('src="/', f'src="{BASE}/')
    html_path.write_text(text, encoding="utf-8")

# GitHub Pages serves clean route URLs from directory index files.
# Handle top-level and nested route HTML files, e.g. admin/suppliers.html -> admin/suppliers/index.html.
for html_path in list(ROOT.rglob("*.html")):
    if html_path.name in {"index.html", "404.html"}:
        continue
    route_dir = html_path.with_suffix("")
    route_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(html_path, route_dir / "index.html")

(ROOT / "404.html").write_text(
    "<!doctype html><meta charset=\"utf-8\"><meta http-equiv=\"refresh\" content=\"0; url=/lionx-mobile-Public/\"><title>LIONX</title>",
    encoding="utf-8",
)
