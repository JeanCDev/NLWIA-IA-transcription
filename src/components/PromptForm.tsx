import { Wand2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useEffect, useState, FormEvent } from "react";
import api from "@/lib/axios";

type Prompt = {
  id: string;
  title: string,
  template: string
}

type PromptFormProps = {
  isLoading: boolean;
  temperature: number;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setTemperature: (template: number) => void;
  handlePromptSelected: (template: string) => void;
}

const PromptForm = ({
  isLoading,
  temperature,
  handleSubmit,
  setTemperature,
  handlePromptSelected
}: PromptFormProps) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    api.get('/prompts').then(response => setPrompts(response.data));
  }, []);

  const onPromptSelect = (id: string) => {
    const data = prompts.find(prompt => prompt.id == id);

    if (!data) {
      return;
    }

    handlePromptSelected(data.template);
  }

  const mappedPrompts = () => prompts.map(item => <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Prompt</Label>

        <Select onValueChange={onPromptSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt"/>
          </SelectTrigger>

          <SelectContent>
            {mappedPrompts()}
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
          value={[temperature]}
          onValueChange={value => setTemperature(value[0])}
        />
        <span className="block text-xs text-muted-foreground italic">Valores nais auto tendem a deixar o resultado mais criativo, mas com possíveis erros</span>
      </div>

      <Separator />

      <Button disabled={isLoading} type="submit" className="w-full">
        Executar
        <Wand2 className="w-4 h-4 ml-2"/>
      </Button>
    </form>
  );
}

export default PromptForm;