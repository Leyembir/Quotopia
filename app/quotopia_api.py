from typing import Union
from fastapi import FastAPI, HTTPException
from quotopia import generate_branding_snippet, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

MAX_INPUT_LENGTH = 32
app = FastAPI()
handler = Mangum(app)

origins = ["http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/generate_snippet")
async def gemerate_snippet_api(prompt: str):
    validate_input(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": "Hello quotopia prompt: " + snippet}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input(prompt)
    keywords = generate_keywords(prompt)
    return {"keywords": keywords}

@app.get("/generate_keywords_and_snippets")
async def generate_keywords_api(prompt: str):
    validate_input(prompt)
    keywords = generate_keywords(prompt)
    snippets = generate_branding_snippet(prompt)
    return {"keywords": keywords, "snippet": snippets}

def validate_input(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )