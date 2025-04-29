# 🩺 HealthMate AI — Your Personal Mini Health Advisor

**GitHub Repository**: [https://github.com/James7881/healthmate-ai](https://github.com/James7881/healthmate-ai)

---

## 💡 Overview

**HealthMate AI** is an intelligent, agentic health assistant designed to offer users fast, accurate, and structured medical guidance based on their symptom descriptions. It provides a streamlined interface for non-emergency health queries and delivers actionable insights tailored to the user's needs.

---

## ✅ Key Features

- 🧠 **AI-Driven Symptom Analysis**: Parses free-text symptom input and returns structured, context-aware responses.
- 🗂️ **Structured Health Guidance**:
  - **Suspected Condition**
  - **Home Remedies** (2 suggestions)
  - **Precautions** (3 tips)
  - **Nutrition Recommendations** (3 beneficial foods)
  - **Recommended Specialist**
  - **Follow-up Question**
  - **“How to Explain to Your Doctor”** snippet
- 🧵 **Context-Aware Conversation**: Maintains context across interactions for better follow-up and personalized advice.
- 🔒 **Domain-Constrained**: Intelligently rejects non-health-related queries to ensure focused interactions.
- 🛠️ **Robust Error Handling**: Gracefully manages API failures, invalid inputs, and edge cases.

---

## 🧰 Tech Stack

| Layer     | Technology                              |
|-----------|------------------------------------------|
| Frontend  | HTML5, Materialize CSS, Vanilla JavaScript |
| Backend   | Node.js, Express.js                     |
| AI/LLM    | GPT-4.1 via `@azure-rest/ai-inference` (GitHub Models) |
| Env Mgmt  | dotenv (for environment variables)       |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/healthmate-ai
cd healthmate-ai
