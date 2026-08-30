from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
asset_dir = root / "public/assets/catalog"
names = [
    "canva-brand.png", "adobe-brand.png", "discord-brand.png", "twitch-brand.png",
    "garena-free-fire-brand.png", "roblox-brand.png", "call-of-duty-brand.png",
    "league-of-legends-brand.png", "mobile-legends-brand.png", "genshin-impact-brand.png",
    "payoneer-brand.png", "skrill-brand.png", "neteller-brand.png", "perfect-money-brand.png",
    "wise-brand.png", "tiktok-brand.png",
]
cell_w, cell_h = 240, 280
cols = 4
rows = (len(names) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "#e9e9e9")
draw = ImageDraw.Draw(sheet)
for idx, name in enumerate(names):
    x = (idx % cols) * cell_w
    y = (idx // cols) * cell_h
    asset = Image.open(asset_dir / name).convert("RGBA")
    preview = Image.new("RGB", (220, 220), "white")
    asset.thumbnail((190, 190), Image.Resampling.LANCZOS)
    preview.paste(asset, ((220 - asset.width) // 2, (220 - asset.height) // 2), asset)
    sheet.paste(preview, (x + 10, y + 10))
    draw.text((x + 10, y + 238), name.replace("-brand.png", ""), fill="#111111")
    draw.text((x + 10, y + 258), str(Image.open(asset_dir / name).size), fill="#666666")
sheet.save(root / "LIONX_CATALOG_NEW_ASSETS_CONTACT_SHEET.png")
