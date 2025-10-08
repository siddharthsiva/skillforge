import os
from dotenv import load_dotenv
load_dotenv()

from langchain.chat_models import ChatAnthropic
from langchain.prompts import PromptTemplate

llm = ChatAnthropic(
    anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
    model_name="claude-2.1",
    temperature=0.7
)

prompt_template = PromptTemplate.from_template(
    "Create a microlearning challenge for a user who struggles with {weakness} but excels at {strength}. Topic: {topic}."
)

async def generate_challenge(topic: str, weakness: str, strength: str):
    prompt = prompt_template.format(topic=topic, weakness=weakness, strength=strength)
    return llm.predict(prompt)
