import { Github, FileVideo, Upload, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";

function App() {
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
              placeholder="Inclua o prompt para a ia"
              className="resize-none p-5 leading-relaxed"
            />
            <Textarea
              readOnly
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela ia"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode usar a variável <code className="text-violet-400">{"{transcription}"}</code> no seu prompt pra adicionar o conteúdo da descrição do seu vídeo selecionado
          </p>
        </section>

        <aside className="w-80 bg-black space-y-6 p-3">
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="border w-full flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Selecione um vídeo
            </label>
            <input type="file" id="video" accept="video/mp4" className="sr-only"/>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>
              <Textarea
                id="transcription-prompt"
                className="h-20 leading-relaxed"
                placeholder="Inclua palavras chave mencionadas no vídeo separadas por vírgula (,)"
              />
            </div>

            <Button className="w-full" type="submit">
              Carregar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selcione um prompt"/>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="title">Título do YouTube</SelectItem>
                  <SelectItem value="description">Descrição od YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>

                <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve</span>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={.1}
                defaultValue={[0.5]}
              />
              <span className="block text-xs text-muted-foreground italic">Valores nais auto tendem a deixar o resultado mais criativo, mas com possíveis erros</span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
          </form>

        </aside>
      </main>
    </div>
  );
}

export default App;
