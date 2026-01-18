import ollama
import os
import json
import time
from pathlib import Path

# === Configuration - change these if needed ===
MODELS = [
    'llava-llama3',   # Balanced, detailed
    'llava:7b',       # Concise captions
    'bakllava',       # Creative/mood-focused
    'moondream'       # Keyword-heavy for SEO
]

# Define multiple prompts — each gets its own key in the output
PROMPTS = [
    {
        "name": "detailed",
        "text": (
            "Describe this wallpaper in detail for alt text and SEO. "
            "Include main subject, style, mood, colors, lighting, key elements. "
            "Keep it under 120 words. Write in natural, flowing sentences."
        )
    },
    {
        "name": "keywords",
        "text": (
            "Generate a list of 10–20 precise keywords and tags for this wallpaper. "
            "Include: main objects, location/setting, style (e.g. cyberpunk, minimalist), "
            "mood/emotion, colors, lighting/time of day, artistic influences. "
            "Output only as comma-separated list of the actual keywords — no full sentences."
        )
    }
    # You can easily add more prompts here later
]

BASE_DIR = Path('/var/www/nicer.app-5.10.z/domains/nicer.app/siteMedia/backgrounds/Landscape')

OUTPUT_FILE = 'wallpaper_descriptions_multi_prompts-Landscape.json'

CHECKPOINT_INTERVAL = 10  # Save every X images

# === Main code ===

def should_skip_folder(folder_name: str) -> bool:
    return folder_name.lower().startswith('thumbs')

def describe_image_with_model_and_prompt(image_path: Path, model: str, prompt_text: str) -> str:
    try:
        response = ollama.chat(
            model=model,
            messages=[
                {
                    'role': 'user',
                    'content': prompt_text,
                    'images': [str(image_path)]
                }
            ],
            options={'num_ctx': 2048}
        )
        return response['message']['content'].strip()
    except Exception as e:
        return f"ERROR: {str(e)}"

# ── Collect images (same as before) ──
print(f"Scanning folders under: {BASE_DIR}")
image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

image_files = []
for root, dirs, files in os.walk(BASE_DIR):
    dirs[:] = [d for d in dirs if not should_skip_folder(d)]
    for file in files:
        if Path(file).suffix.lower() in image_extensions:
            image_files.append(Path(root) / file)

print(f"Found {len(image_files)} total images")

# ── Load existing results for resume ──
results = {}
if os.path.exists(OUTPUT_FILE):
    try:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            results = json.load(f)
        print(f"Loaded {len(results)} completed images")
    except json.JSONDecodeError:
        print(f"Warning: Invalid JSON in {OUTPUT_FILE}. Starting fresh.")
else:
    print(f"No existing file found. Starting from scratch.")

unprocessed_files = [
    img_path for img_path in image_files
    if str(img_path.relative_to(BASE_DIR)) not in results
]
print(f"{len(unprocessed_files)} images left to process\n")

# ── Process ──
for i, img_path in enumerate(unprocessed_files, 1):
    rel_path = str(img_path.relative_to(BASE_DIR))
    print(f"[{i:4d}/{len(unprocessed_files):4d}] {img_path.name}")

    image_results = {}
    for model in MODELS:
        model_results = {}
        for prompt_config in PROMPTS:
            pname = prompt_config["name"]
            ptext = prompt_config["text"]
            print(f"  - {model} / {pname} ... ", end="", flush=True)
            desc = describe_image_with_model_and_prompt(img_path, model, ptext)
            model_results[pname] = desc
            print("done")
            time.sleep(0.4)  # gentle pause

        image_results[model] = model_results

    results[rel_path] = image_results

    # Checkpoint save
    if i % CHECKPOINT_INTERVAL == 0 or i == len(unprocessed_files):
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print(f"  → Checkpoint saved ({len(results)} total)")
        break

    time.sleep(1.5)  # between images

print(f"\nAll done! Results in: {OUTPUT_FILE}")
print("Structure: { \"relative/path.jpg\": { \"llava-llama3\": { \"detailed\": \"…\", \"keywords\": \"…\" }, … } }")
