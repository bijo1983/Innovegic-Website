#!/usr/bin/env python3
"""Integrate stock photos from assets/images/ into the site.

Usage:  python3 scripts/integrate-images.py        (from the repo root)

For every mapping below whose image file exists, the script:
  1. optimizes the image in place (max 1600px wide, JPEG quality 82), and
  2. swaps the page's <img> src/alt to point at it.
Missing files are skipped silently, so the script can be re-run as photos
arrive. Requires Pillow (pip install pillow).
"""
import pathlib, re, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install pillow")

ROOT = pathlib.Path(__file__).resolve().parent.parent

# (page, old_src, new_src, new_alt)
MAPPINGS = [
    ("index.html",           "img/poster.jpg",      "assets/images/about/team-collaboration.jpg", "The Innovegic team collaborating in a modern office"),
    ("about.html",           "img/faqs.jpg",        "assets/images/about/office-meeting.jpg",     "Innovegic consultants in a leadership meeting"),
    ("about.html",           "img/poster.jpg",      "assets/images/about/team-collaboration.jpg", "The Innovegic team collaborating in a modern office"),
    ("solutions.html",       "img/portfolio-1.jpg", "assets/images/healthcare/doctor-tablet.jpg", "Doctor using a tablet with a patient in a modern clinic"),
    ("solutions.html",       "img/portfolio-2.jpg", "assets/images/industries/government.jpg",    "Modern government building"),
    ("solutions.html",       "img/portfolio-3.jpg", "assets/images/industries/logistics.jpg",     "Warehouse worker scanning inventory"),
    ("services.html",        "img/service-1.png",   "assets/images/services/consulting.jpg",      "Technology consultants working through a solution design"),
    ("products.html",        "img/service-4.png",   "assets/images/products/xentraerp.jpg",       "Enterprise analytics dashboards"),
    ("success-stories.html", "img/portfolio-1.jpg", "assets/images/healthcare/hospital-dashboard.jpg", "Healthcare professionals using clinical technology"),
    ("resources.html",       "img/news.jpg",        "assets/images/ai/ai-analytics.jpg",          "AI analytics on screen"),
    ("resources.html",       "img/portfolio-4.jpg", "assets/images/ai/machine-learning.jpg",      "Machine learning data visualization"),
    ("resources.html",       "img/faqs.jpg",        "assets/images/services/cloud-services.jpg",  "Cloud infrastructure"),
]

# og:image swaps applied when the target exists
OG_MAPPINGS = [
    ("index.html",    "assets/images/hero/digital-transformation.jpg"),
    ("about.html",    "assets/images/about/team-collaboration.jpg"),
    ("services.html", "assets/images/services/consulting.jpg"),
    ("solutions.html","assets/images/hero/ai-enterprise.jpg"),
]

def optimize(path: pathlib.Path):
    im = Image.open(path)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    return im.size

optimized = set()
for page, old_src, new_src, new_alt in MAPPINGS:
    target = ROOT / new_src
    if not target.exists():
        continue
    if new_src not in optimized:
        w, h = optimize(target)
        optimized.add(new_src)
        print(f"optimized {new_src} -> {w}x{h}, {target.stat().st_size // 1024}KB")
    html_path = ROOT / page
    html = html_path.read_text()
    # swap src, alt, and intrinsic dimensions on the matching <img>
    pattern = re.compile(r'<img src="' + re.escape(old_src) + r'" alt="[^"]*"([^>]*?) width="\d+" height="\d+"')
    im = Image.open(target)
    new_tag = f'<img src="{new_src}" alt="{new_alt}"\\1 width="{im.width}" height="{im.height}"'
    html, n = pattern.subn(new_tag, html, count=1)
    if n:
        html_path.write_text(html)
        print(f"wired   {page}: {old_src} -> {new_src}")

for page, og in OG_MAPPINGS:
    if not (ROOT / og).exists():
        continue
    html_path = ROOT / page
    html = html_path.read_text()
    html2 = re.sub(r'(property="og:image" content="https://www\.innovegicit\.com/)[^"]+(")',
                   r'\g<1>' + og + r'\g<2>', html, count=1)
    html2 = re.sub(r'(name="twitter:image" content="https://www\.innovegicit\.com/)[^"]+(")',
                   r'\g<1>' + og + r'\g<2>', html2, count=1)
    if html2 != html:
        html_path.write_text(html2)
        print(f"og:image {page} -> {og}")

print("done. Review pages, then commit.")
