# NexusClass - React Native com Expo + Tailwind (NativeWind)

Projeto de aplicativo mobile feito com **React Native + Expo**, usando **Tailwind CSS no mobile com NativeWind** e componentes reutilizáveis inspirados em `shadcn/ui` para React Native.

Este README foi escrito para quem está começando e quer entender o projeto sem precisar ter muito conhecimento prévio.

## Sumário

1. [O que é este projeto](#o-que-é-este-projeto)
2. [Tecnologias usadas](#tecnologias-usadas)
3. [Como rodar o projeto](#como-rodar-o-projeto)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Como o app funciona na prática](#como-o-app-funciona-na-prática)
6. [Conceitos importantes: React Native + Expo](#conceitos-importantes-react-native--expo)
7. [Tailwind no mobile com NativeWind](#tailwind-no-mobile-com-nativewind)
8. [Componentes reutilizáveis (estilo shadcn)](#componentes-reutilizáveis-estilo-shadcn)
9. [Problemas comuns e soluções](#problemas-comuns-e-soluções)
10. [Leitura complementar (PDFs e links)](#leitura-complementar-pdfs-e-links)

## O que é este projeto

O **NexusClass** é um app com foco acadêmico/escolar, com telas como:

- principal
- mural
- calendário
- pesquisar
- mensagens
- suporte

A navegação e estado principal do app ficam centralizados em hooks, e a interface usa classes do Tailwind através do NativeWind para acelerar a criação de UI.

## Tecnologias usadas

Principais bibliotecas do projeto:

- `react` e `react-native`
- `expo`
- `typescript`
- `nativewind` + `tailwindcss`
- `@rn-primitives/*` (base de componentes acessíveis)
- `lucide-react-native` (ícones)
- `react-native-calendars`
- `expo-av` (áudio)

Versões principais (resumo):

- React Native `0.81.5`
- Expo `~54.0.0`
- React `19.1.0`
- NativeWind `^4.2.2`

## Como rodar o projeto

### 1. Pré-requisitos

- Node.js instalado
- npm instalado
- Expo Go no celular (opcional, mas recomendado para testes rápidos)

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o projeto

```bash
npm run start
```

Scripts disponíveis:

- `npm run start` -> abre o menu do Expo
- `npm run android` -> inicia direto para Android
- `npm run ios` -> inicia direto para iOS (em ambiente compatível)
- `npm run web` -> roda versão web

## Estrutura de pastas

```text
components/      -> componentes de interface e telas
components/ui/   -> componentes base reutilizáveis (button, card, input...)
hooks/           -> regras de estado e comportamento (lógica)
lib/             -> utilitários e configurações auxiliares
dados/           -> dados locais (ex.: turmas.json)
assets/          -> imagens, logos e sons
```

Arquivos importantes:

- `App.tsx`: ponto principal da aplicação
- `app.json`: configurações do Expo
- `tailwind.config.js`: configuração do Tailwind/NativeWind
- `global.css`: tokens de tema (cores, radius, modo escuro)
- `babel.config.js`: preset Expo + plugin NativeWind + Reanimated

## Como o app funciona na prática

1. O app inicia em `App.tsx`.
2. O `useColorScheme` controla tema claro/escuro.
3. A navbar e sidebar controlam navegação entre telas.
4. O hook `useGerenciador` guarda:
   - tela atual (`acessouOq`)
   - inscrições por matéria
   - chave selecionada para o mural
5. O hook `useConfiguracoes` gerencia notificações e uma ação de suporte com som/vibração.

Em resumo: os **hooks guardam a regra**, os **componentes exibem a interface**.

## Conceitos importantes: React Native + Expo

### React Native (base)

Com React Native, você cria app mobile usando componentes como `View`, `Text`, `TouchableOpacity`, em vez de `div` e `span`.

### Expo (acelerador)

Expo simplifica muito o desenvolvimento:

- inicialização de projeto
- build e execução em Android/iOS/Web
- acesso a APIs nativas (ex.: áudio com `expo-av`)

No seu projeto, o `app.json` define nome, ícones, splash e opções por plataforma.

## Tailwind no mobile com NativeWind

No React Native puro, não existe CSS tradicional como na web. O NativeWind traduz classes Tailwind para estilos nativos.

Exemplo de uso no projeto:

```tsx
<View className="flex-1 bg-background" />
```

Como isso está montado aqui:

- `global.css` define variáveis de tema (`--background`, `--foreground`, etc.)
- `tailwind.config.js` mapeia essas variáveis para as classes
- `babel.config.js` habilita o NativeWind no pipeline

Resultado: você escreve classes Tailwind e mantém padrão visual consistente no app inteiro.

## Componentes reutilizáveis (estilo shadcn)

A pasta `components/ui` segue a ideia de componentes reutilizáveis, semelhantes ao ecossistema shadcn no mobile.

Vantagens:

- padronização visual
- manutenção mais simples
- reaproveitamento entre telas

Bibliotecas como `@rn-primitives/*` ajudam a manter acessibilidade e estrutura robusta desses componentes.

## Problemas comuns e soluções

### Erro de TypeScript/JSX no editor

Se aparecer algo como:

- `Cannot use JSX unless the '--jsx' flag is provided`
- `File 'expo/tsconfig.base' not found`

Faça:

```bash
npm install
npx tsc --noEmit
```

Se no terminal estiver OK e no VS Code ainda errado, reinicie o TypeScript Server e confira se o editor está usando o TypeScript da workspace.

### Estilos Tailwind não aplicam

Verifique:

- `import './global.css'` no `App.tsx`
- `nativewind/babel` no `babel.config.js`
- caminhos corretos em `content` no `tailwind.config.js`

## Leitura complementar (PDFs e links)

### PDFs do projeto

- `Configuração Expo + TypeScript + NativeWind + Web.pdf`
- `Configuração do Shadcn Mobile no Expo.pdf`

Esses materiais mostram o passo a passo de configuração e reforçam os conceitos usados aqui (Expo + TS + NativeWind + componentes reutilizáveis no estilo shadcn).

### Links oficiais e referência

- React Native Reusables: https://reactnativereusables.com/
- React Native (oficial): https://reactnative.dev/
- Expo (oficial): https://expo.dev/
- Expo (oficial): https://expo.dev/

