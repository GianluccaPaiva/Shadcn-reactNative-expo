import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pressable, View } from "react-native";
//import { toast } from "sonner"

type AtendimentoContatoProps = {
  professorNome: string;
  aberto: boolean;
  onClose: () => void;
  assunto: string;
  setAssunto: (assunto: string) => void;
  mensagem: string;
  setMensagem: (mensagem: string) => void;
  onEnviar: () => void;
};

export function AtendimentoContato({
  professorNome,
  aberto,
  onClose,
  assunto,
  setAssunto,
  mensagem,
  setMensagem,
  onEnviar,
}: AtendimentoContatoProps) {
  if (!aberto) return null;

  return (
    <>
      <Pressable className="absolute inset-0 z-50 bg-black/50" onPress={onClose} />
      <Card className="absolute left-4 right-4 top-24 z-50 max-w-xl self-center p-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="assunto-contato">
                Assunto
              </FieldLabel>
              <Input
                id="assunto-contato"
                placeholder="Ex: Dúvida sobre a atividade"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
              />
              <FieldDescription>
                Descreva brevemente o motivo do contato.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="mensagem-contato">
                Digite o conteúdo da mensagem para o professor {professorNome}
              </FieldLabel>
              <Textarea
                id="mensagem-contato"
                placeholder="Escreva sua mensagem aqui..."
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <View className="mt-4 flex-row justify-end gap-2">
          <Button variant="outline" onPress={onClose}>
            <Text>Cancelar</Text>
          </Button>
          <Button 
            onPress={() => {
              onEnviar();
            }}
            disabled={!assunto.trim() || !mensagem.trim()}
          >
            <Text>Enviar mensagem</Text>
          </Button>
        </View>
      </Card>
    </>
  );
}