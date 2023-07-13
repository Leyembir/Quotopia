from typing import Union
from fastapi import FastAPI, HTTPException
from quotopia import generate_branding_snippet, generate_keywords, generate_branding_snippet_language, generate_keywords_lang
from mangum import Mangum
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware



origins = [
    "http://localhost:3000",
    "https://quotopia.netlify.app",
    "https://quotopia-sooty.vercel.app",
]

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MAX_INPUT_LENGTH = 32

handler = Mangum(app)





@app.get("/generate_snippet")
async def gemerate_snippet_api(prompt: str):
    validate_input(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": "quotopia prompt: " + snippet}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input(prompt)
    keywords = generate_keywords(prompt)
    return {"keywords": keywords}

@app.get("/generate_keywords_and_snippets")
async def generate_keywords_and_snippets_api(prompt: str):
    validate_input(prompt)
    keywords = generate_keywords(prompt)
    snippets = generate_branding_snippet(prompt)
    return {"keywords": keywords, "snippet": snippets}


@app.get("/generate_keywords_and_snippets_lang")
async def generate_keywords_and_snippets_lang_api(prompt: str, language: str):
    validate_input(prompt)
    keywords = generate_keywords_lang(prompt, language)
    snippets = generate_branding_snippet_language(prompt, language)
    return {"keywords": keywords, "snippet": snippets}

def validate_input(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )