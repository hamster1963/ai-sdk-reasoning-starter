import { modelID, myProvider } from "@/lib/models";
import { Message, streamText } from "ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
  }: {
    messages: Array<Message>;
    selectedModelId: modelID;
    isReasoningEnabled: boolean;
  } = await request.json();

  const stream = streamText({
    system:
      "you are a friendly assistant. do not use emojis in your responses.",
    model: myProvider.languageModel(selectedModelId),
    messages,
  });

  return stream.toDataStreamResponse({
    sendReasoning: true,
    getErrorMessage: () => {
      return `An error occurred, please try again!`;
    },
  });
}
