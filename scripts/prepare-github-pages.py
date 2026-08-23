from pathlib import Path
import shutil

BASE = "/lionx-mobile-Public"
ROOT = Path("web-dist")

for html_path in ROOT.rglob("*.html"):
    text = html_path.read_text(encoding="utf-8")
    text = text.replace('href="/', f'href="{BASE}/')
    text = text.replace('src="/', f'src="{BASE}/')
    html_path.write_text(text, encoding="utf-8")

# GitHub Pages serves clean route URLs from directory index files.
for html_path in list(ROOT.glob("*.html")):
    if html_path.name in {"index.html", "404.html"}:
        continue
    route_dir = ROOT / html_path.stem
    route_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(html_path, route_dir / "index.html")

(ROOT / "404.html").write_text(
    "<!doctype html><meta charset=\"utf-8\"><meta http-equiv=\"refresh\" content=\"0; url=/lionx-mobile-Public/\"><title>LIONX</title>",
    encoding="utf-8",
)
