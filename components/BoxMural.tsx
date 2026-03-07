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
import { Textarea } from "@/components/ui/textarea";
import { Pressable, View } from "react-native";

type BoxMuralProps = {
  materia: string;
  professorNome: string;
  aberto: boolean;
  onClose: () => void;
  conteudo: string;
  setConteudo: (conteudo: string) => void;
  onPublicar: () => void;
};

export function BoxMural({ materia, professorNome, aberto, onClose, conteudo, setConteudo, onPublicar }: BoxMuralProps) {
  if (!aberto) return null;

  return (
    <>
      <Pressable
        className="absolute inset-0 z-50 bg-black/50"
        onPress={onClose}
      />
      <Card className="absolute left-4 right-4 top-24 z-50 max-w-xl self-center p-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="mensagem-mural">Postar no mural de {materia}</FieldLabel>
              <Textarea
                id="mensagem-mural"
                placeholder="Escreva sua mensagem aqui..."
                rows={4}
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
              <FieldDescription>
                Compartilhe algo com a turma de {professorNome}
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <View className="mt-4 flex-row justify-end gap-2">
          <Button variant="outline" onPress={onClose}>
            <Text>Cancelar</Text>
          </Button>
          <Button onPress={onPublicar} disabled={!conteudo.trim()}>
            <Text>Publicar</Text>
          </Button>
        </View>
      </Card>
    </>
  );
}
