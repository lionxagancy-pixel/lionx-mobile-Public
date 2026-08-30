from __future__ import annotations

import hashlib
import json
import re
import shutil
import time
from collections import deque
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

try:
    import cairosvg
except ImportError as exc:  # pragma: no cover
    raise SystemExit("cairosvg is required to rasterize SVG assets") from exc

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "public/assets/data/catalog.json"
MANIFEST_PATH = ROOT / "public/assets/data/catalog-image-manifest.json"
ASSET_DIR = ROOT / "public/assets/catalog"
SEARCH_DIR = Path("/home/ubuntu/upload/search_images")

# The original catalog source URLs are retained as keys so every affected service
# is remapped deterministically. Replacement sources are public, no-key assets.
REPLACEMENTS = {
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Canva_Logo.jpg/1024px-Canva_Logo.jpg": (
        "https://www.google.com/s2/favicons?domain=canva.com&sz=256",
        "canva-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Creative_Cloud_rainbow_icon.svg": (
        "https://www.google.com/s2/favicons?domain=adobe.com&sz=256",
        "adobe-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/5/57/Discord_logo.svg": (
        "https://cdn.simpleicons.org/discord/5865F2",
        "discord-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/2/f0/Twitch_logo.svg": (
        "https://cdn.simpleicons.org/twitch/9146FF",
        "twitch-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Garena_Free_Fire_logo.png": (
        "https://www.google.com/s2/favicons?domain=garena.com&sz=256",
        "garena-free-fire-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/6/60/Roblox_logo.svg": (
        "https://cdn.simpleicons.org/roblox/000000",
        "roblox-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Call_of_Duty_logo.svg": (
        "https://www.google.com/s2/favicons?domain=callofduty.com&sz=256",
        "call-of-duty-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/League_of_Legends_Logo_2023.svg": (
        "https://cdn.simpleicons.org/leagueoflegends/C89B3C",
        "league-of-legends-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mobile_Legends_Bang_Bang_logo.png": (
        "https://www.google.com/s2/favicons?domain=mobilelegends.com&sz=256",
        "mobile-legends-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Genshin_Impact_logo.svg": (
        "https://www.google.com/s2/favicons?domain=genshin.hoyoverse.com&sz=256",
        "genshin-impact-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Payoneer_logo.svg": (
        "https://cdn.simpleicons.org/payoneer/FF4800",
        "payoneer-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/8/86/Skrill_logo.svg": (
        "https://www.google.com/s2/favicons?domain=skrill.com&sz=256",
        "skrill-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/7/7a/Neteller_logo.svg": (
        "https://www.google.com/s2/favicons?domain=neteller.com&sz=256",
        "neteller-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Perfect_Money_logo.png": (
        "https://www.perfectmoney.com/favicon.ico",
        "perfect-money-brand.png",
        "official-domain-favicon",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/3/3b/Wise_logo.svg": (
        "https://cdn.simpleicons.org/wise/9FE870",
        "wise-brand.png",
        "simpleicons-cdn",
    ),
    "https://upload.wikimedia.org/wikipedia/commons/a/9f/TikTok_logo.svg": (
        "https://cdn.simpleicons.org/tiktok/000000",
        "tiktok-brand.png",
        "simpleicons-cdn",
    ),
}

# Search results are used only for the two legacy brands whose public domains
# do not expose a working favicon endpoint in this environment.
SEARCH_FALLBACKS = {
    "garena-free-fire-brand.png": SEARCH_DIR / "vuQi28aBAeiz.png",
    "call-of-duty-brand.png": SEARCH_DIR / "RrXCBQb8R6sx.png",
    "mobile-legends-brand.png": SEARCH_DIR / "2bARGJ2shBXZ.png",
    "genshin-impact-brand.png": SEARCH_DIR / "ZjKDZvL3hkgr.png",
    "neteller-brand.png": SEARCH_DIR / "RpgmfAeh0UBf.png",
    "perfect-money-brand.png": SEARCH_DIR / "koIKdFcnim7f.png",
}


def fetch(url: str) -> bytes:
    req = Request(
        url,
        headers={
            "User-Agent": "LIONX catalog asset restoration/1.0 (public brand assets)",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/png,image/jpeg,*/*;q=0.8",
        },
    )
    with urlopen(req, timeout=35) as response:
        payload = response.read()
        content_type = response.headers.get("Content-Type", "")
    if not payload:
        raise ValueError("empty response")
    if "text/html" in content_type.lower() and not payload.lstrip().startswith(b"<svg"):
        raise ValueError(f"unexpected HTML response ({content_type})")
    return payload


def remove_light_border_background(image: Image.Image) -> Image.Image:
    """Remove a light/gray background connected to the outer edge.

    This keeps white details enclosed inside a colored logo (for example Discord's
    eyes) while removing white or checkerboard backgrounds from public PNG previews.
    """
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()

    def is_background(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        neutral = max(r, g, b) - min(r, g, b) <= 22
        return a <= 12 or (neutral and min(r, g, b) >= 175)

    queue: deque[tuple[int, int]] = deque()
    seen: set[tuple[int, int]] = set()
    for x in range(width):
        for y in (0, height - 1):
            if is_background(x, y) and (x, y) not in seen:
                seen.add((x, y))
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if is_background(x, y) and (x, y) not in seen:
                seen.add((x, y))
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        pixels[x, y] = (pixels[x, y][0], pixels[x, y][1], pixels[x, y][2], 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1),
                       (x - 1, y - 1), (x + 1, y - 1), (x - 1, y + 1), (x + 1, y + 1)):
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in seen and is_background(nx, ny):
                seen.add((nx, ny))
                queue.append((nx, ny))
    return image


def make_512_png(payload: bytes, output_path: Path) -> tuple[int, int, str]:
    if payload.lstrip().startswith(b"<svg") or b"<svg" in payload[:500]:
        png = cairosvg.svg2png(bytestring=payload, output_width=512, output_height=512)
        image = Image.open(BytesIO(png)).convert("RGBA")
    else:
        image = remove_light_border_background(Image.open(BytesIO(payload)))
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (512, 512), (255, 255, 255, 0))
        canvas.paste(image, ((512 - image.width) // 2, (512 - image.height) // 2), image)
        image = canvas
    if image.size != (512, 512):
        image = image.resize((512, 512), Image.Resampling.LANCZOS)
    image.save(output_path, "PNG", optimize=True)
    return image.size[0], image.size[1], hashlib.sha256(output_path.read_bytes()).hexdigest()[:12]


def main() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    manifest_by_source = {entry["source_url"]: entry for entry in manifest}
    downloaded = []
    failed = []

    for old_url, (new_url, filename, source_kind) in REPLACEMENTS.items():
        target = ASSET_DIR / filename
        try:
            if filename in SEARCH_FALLBACKS and SEARCH_FALLBACKS[filename].exists():
                payload = SEARCH_FALLBACKS[filename].read_bytes()
                source_note = f"public-image-search:{SEARCH_FALLBACKS[filename].name}"
            else:
                payload = fetch(new_url)
                source_note = source_kind
            size = make_512_png(payload, target)
            downloaded.append((old_url, new_url, filename, source_note, size))
            for item in catalog:
                if item.get("image") == old_url:
                    item["image"] = new_url
            manifest_by_source.pop(old_url, None)
            manifest_by_source[new_url] = {
                "source_url": new_url,
                "local_file": f"/assets/catalog/{filename}",
                "status": "downloaded",
                "error": None,
                "source_kind": source_note,
                "sha256_12": size[2],
            }
            time.sleep(0.15)
        except Exception as exc:
            failed.append((old_url, new_url, filename, str(exc)))
            manifest_by_source[old_url] = {
                "source_url": old_url,
                "local_file": None,
                "status": "failed",
                "error": str(exc),
                "replacement_source": new_url,
            }

    CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    MANIFEST_PATH.write_text(json.dumps(list(manifest_by_source.values()), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"downloaded={len(downloaded)} failed={len(failed)}")
    for old_url, new_url, filename, source_note, size in downloaded:
        print(f"OK\t{filename}\t{size[0]}x{size[1]}\t{source_note}\t{new_url}")
    for old_url, new_url, filename, error in failed:
        print(f"FAIL\t{filename}\t{error}\t{new_url}")
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
