import { Github } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import VideoInputForm from "./components/VideoInputForm";
import PromptForm from "./components/PromptForm";
import { useState, useEffect } from "react";
import { useCompletion } from "ai/react";

function App() {
  const [videoId, setVideoId] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const {
    input,
    isLoading,
    completion,
    setInput,
    handleSubmit,
    handleInputChange
  } = useCompletion({
    api: 'http://localhost:3333/ai/completion',
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-type': 'Application/json'
    }
  });

  useEffect(() => console.log(videoId), [videoId])

  return (
    <div className="max-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Upload AI</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido com 💗 no NLW IA</span>

          <Separator orientation="vertical" className="h-6"/>

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2"/>
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <section className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Inclua o prompt para a ia"
              className="resize-none p-5 leading-relaxed"
            />
            <Textarea
              readOnly
              value={completion}
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela ia"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode usar a variável <code className="text-violet-400">{"{transcription}"}</code> no seu prompt pra adicionar o conteúdo da descrição do seu vídeo selecionado
          </p>
        </section>

        <aside className="w-80 bg-black space-y-6 p-3">
          <VideoInputForm
            setVideoId={setVideoId}
          />

          <Separator />

          <PromptForm
            isLoading={isLoading}
            temperature={temperature}
            handleSubmit={handleSubmit}
            setTemperature={setTemperature}
            handlePromptSelected={setInput}
          />

        </aside>
      </main>
    </div>
  );
}

export default App;
