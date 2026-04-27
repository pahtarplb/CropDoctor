"""
ISG Pitch Deck PDF Generator
Converts the HTML presentation to a high-quality PDF

Requirements:
    pip install playwright
    playwright install chromium
"""

import asyncio
import os
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright not installed. Installing...")
    os.system("pip install playwright")
    os.system("playwright install chromium")
    from playwright.async_api import async_playwright


async def generate_pdf():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    html_file = script_dir / "pitch-deck-saas.html"
    output_pdf = script_dir / "Smart_Crop_Doctor_Pitch_Deck.pdf"

    if not html_file.exists():
        print(f"Error: {html_file} not found!")
        return

    print("Starting PDF generation...")

    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set viewport to 16:9 widescreen
        await page.set_viewport_size({"width": 1920, "height": 1080})

        # Load the HTML file
        file_url = f"file:///{html_file.as_posix()}"
        print(f"Loading: {file_url}")
        await page.goto(file_url, wait_until="networkidle")

        # Wait for fonts to load
        await page.wait_for_timeout(2000)

        # Generate PDF
        print("Generating PDF...")
        await page.pdf(
            path=str(output_pdf),
            width="16in",
            height="9in",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            display_header_footer=False,
        )

        await browser.close()

    print(f"\nPDF generated successfully!")
    print(f"Output: {output_pdf}")


def main():
    asyncio.run(generate_pdf())


if __name__ == "__main__":
    main()
