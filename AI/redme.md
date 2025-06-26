## AI

### Agents vs. Assistants

- **Agents** are autonomous entities capable of performing tasks, making decisions, and interacting with their environment independently, without human intervention.
- **Assistants** are tools designed to help humans accomplish tasks, typically requiring human input, guidance, or oversight.

**Example:**
- An AI-powered robot vacuum that navigates and cleans your home on its own is an **Agent**.
- A virtual assistant like Siri or Alexa, which responds to your commands and questions, is an **Assistant**.

---

### What is an LLM (Large Language Model)?

- An **LLM** is a type of AI model trained on vast amounts of text data to predict the most probable next word in a sentence, given all previous context.
- At its core, a model is a file containing a set of statistics and probabilities, trained on labeled data (e.g., images, text).
- LLMs are different from earlier AI models because they can keep track of much more context, allowing them to generate coherent and contextually relevant text.
- The “large” in LLM refers to the massive amount of data and parameters (often billions) used to train these models.

#### Transformers and Attention

- The architecture behind LLMs is called a **transformer** (see the paper “Attention Is All You Need”).
- Transformers use a mechanism called **attention** to keep track of context and relationships between words, enabling better predictions.
- The “T” in GPT stands for “transformer.”

#### Tokens and Context Windows

- **Tokens** are chunks of text (usually 3–4 characters or a word) that the model processes. LLMs charge and limit usage based on token count.
- Each model has a **context window**—the maximum number of tokens it can process at once. Exceeding this limit will cause the model to fail or truncate input/output.
- Token limits are determined by the model’s architecture and available hardware (like GPU memory).

#### Embeddings and Vectors

- Words and tokens are represented as high-dimensional vectors (embeddings) that capture their meaning numerically.
- These vectors allow the model to perform mathematical operations to determine similarity and context.

#### Practical Notes

- Most users won’t train LLMs from scratch, but understanding tokens and context windows is important for using LLM APIs.
- If you want to learn more about transformers, read the “Attention Is All You Need” paper or use AI tools like ChatGPT to explain complex concepts in simpler terms.

---
