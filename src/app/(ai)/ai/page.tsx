import ChatClient from "@/components/AI/ChatClient";
import { BoggoLogoWithText } from "@/components/SVGs/BoggoLogoWithText";

export default async function BoggoAI() {
  const models = ["qwen/qwen3-coder-30b"];
  return (
    <main className="flex flex-col min-h-screen bg-main" role="main">
      <header className="border-b border-white/10" role="banner">
        <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex items-center gap-4"
            role="img"
            aria-label="Boggo logo with text"
          >
            <BoggoLogoWithText
              width={120}
              height={28}
              color="white"
              showTrademark={false}
            />
          </div>
        </div>
      </header>
      <ChatClient initialModels={models} initialModel={models[0]} />
    </main>
  );
}
