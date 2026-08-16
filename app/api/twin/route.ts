import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { TWIN_PERSONA } from "@/lib/twin/persona";
import { consumeRateLimit, getClientIp } from "@/lib/twin/rateLimit";
import { twinTools } from "@/lib/twin/tools";

export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

function isUiMessage(value: unknown): value is UIMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const message = value as { role?: unknown; parts?: unknown };
  return (
    (message.role === "user" || message.role === "assistant") &&
    Array.isArray(message.parts)
  );
}

function sanitizeMessages(input: unknown): UIMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    return null;
  }

  const messages = input.filter(isUiMessage);
  if (messages.length === 0) {
    return null;
  }

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return null;
  }

  const lastText = last.parts
    .filter((part) => part.type === "text")
    .map((part) => ("text" in part ? part.text : ""))
    .join("");

  if (lastText.trim().length === 0 || lastText.length > MAX_MESSAGE_CHARS) {
    return null;
  }

  return messages;
}

export async function POST(request: Request) {
  const limit = consumeRateLimit(getClientIp(request));
  if (!limit.ok) {
    return Response.json(
      { error: "Too many questions. Try again in a minute." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The twin is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitizeMessages(
    typeof body === "object" && body !== null && "messages" in body
      ? (body as { messages: unknown }).messages
      : null,
  );

  if (!messages) {
    return Response.json({ error: "Send a short question to continue." }, { status: 400 });
  }

  const modelId = process.env.TWIN_MODEL ?? "claude-sonnet-5";

  const result = streamText({
    model: anthropic(modelId),
    system: TWIN_PERSONA,
    messages: await convertToModelMessages(messages),
    tools: twinTools,
    stopWhen: isStepCount(5),
    maxOutputTokens: 800,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
