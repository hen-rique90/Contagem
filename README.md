# 📦 Contagem de Estoque

App para **contar o estoque lendo códigos de barras** e depois **comparar com o saldo do sistema**. Feito para tablet e celular Android.

## Como funciona (3 etapas)

1. **Contar:** leia os itens com o **leitor pistola** (USB/Bluetooth) ou com a **câmera** do aparelho. Não precisa de planilha nenhuma: cada código lido entra na lista e vai somando. A contagem é "cega", ou seja, você não vê o saldo do sistema enquanto conta.
2. **Baixar a contagem:** ao terminar, baixe a planilha da contagem (.xlsx ou .csv) com código, descrição, quantidade contada, local e observações.
3. **Comparar:** suba a planilha de saldo exportada do seu sistema (ERP). O app cruza tudo pelo código e mostra:
   - **Batendo:** contado igual ao sistema;
   - **Falta:** contou menos do que o sistema;
   - **Não contado:** está no sistema, mas não foi lido;
   - **Sobra:** contou mais do que o sistema;
   - **Fora do sistema:** foi lido, mas o código não está na planilha do sistema.

   Depois é só **baixar a comparação** (.xlsx com as abas *Resumo*, *Divergências*, *Comparação completa* e *Contagem*), baixar em CSV ou imprimir.

### Saber na hora se o item está no sistema
Na tela **Contar**, toque em **Carregar** e escolha a planilha de saldo do sistema **antes** de começar. A partir daí:
- código que **está** no sistema: bipe normal e a descrição aparece;
- código que **não está**: som de erro e o aviso **"NÃO ESTÁ NO SISTEMA"**. O item fica marcado na lista.

O saldo continua escondido durante a contagem. O app procura o código lido no **código de barras**, no **código interno** e no **código alternativo** (ex.: código de fabricação). Assim, peças sem código de barras no cadastro podem ser contadas digitando o código interno.

### Planilha do Movere (via BI)
O relatório de estoque do BI (com as colunas `CodigoDeBarra`, `Cód Item`, `Cód Fabricação`, `Item` e `Saldo em Estoque`) é reconhecido automaticamente, inclusive com as linhas de "filtros aplicados" no topo. Observações:
- se o mesmo código de barras estiver em mais de um produto, os saldos são somados e a planilha de comparação avisa quais códigos internos foram juntados;
- produtos com saldo 0 que não foram contados ficam fora do relatório de comparação (só aparecem como total no Resumo);
- confira os filtros do relatório no BI (grupos, estabelecimento, depósito): produto que ficou fora do filtro aparece como **"Fora do sistema"** na comparação.

### Dicas na contagem
- **Local / prateleira (opcional):** escreva onde está contando (ex.: `CORREDOR A1`). Cada leitura guarda esse local.
- **Leu errado?** Use **Desfazer último bipe**. Para corrigir a quantidade, toque no item e use **-1**, **Digitar** ou **Remover item**.
- **Muitas unidades iguais:** use **Pedir Qtd em Lote**. Você lê o código uma vez e digita a quantidade.
- **Descrição:** os itens novos vêm "Sem descrição". Dá para escrever na hora; na comparação, o app preenche com a descrição da planilha do sistema.
- A planilha do sistema pode ter o código com zero à esquerda (`0789...`) e o saldo como `1.234,00`: o app entende. Se o mesmo código aparecer em mais de uma linha, os saldos são somados.

## Como usar no Android

1. Abra o endereço do app no **Chrome** (ver "Publicar" abaixo). A câmera só funciona com `https://`.
2. Toque em **Instalar App** no topo, ou no menu ⋮ → **Instalar app**.
3. O ícone **Contagem** abre em tela cheia, mesmo sem internet.

### Leitura pela câmera
- Toque no botão 📷 ao lado do campo de leitura e permita o uso da câmera.
- Cada código conta **uma vez** enquanto continuar na frente da câmera. Para contar outra unidade igual, tire a peça da frente e aponte de novo.
- Em lugares escuros, use o botão **Lanterna** (aparece nos aparelhos que permitem).
- O app abre a **câmera traseira principal**. Em celulares com várias câmeras (ex.: Samsung Galaxy), o navegador costuma abrir a ultra-wide, que não foca de perto. Se a imagem ficar borrada, troque em **Câmera** abaixo do vídeo ou use o **zoom 2x** e afaste o celular.
- Segure a uns 15–25 cm, com o código reto na faixa do meio.
- **Plano B, "Ler por foto":** abre o app de câmera do celular, que foca melhor. Você tira a foto do código e o app lê.
- Use o **Chrome**: ele tem o leitor de código de barras nativo do Android, mais rápido. A linha cinza abaixo do vídeo mostra a câmera, a resolução e o leitor em uso.
- Para testar sem peças: abra **Etiquetas de teste** (`etiquetas-teste.html`), leia alguns códigos e, na etapa 3, toque em **Usar exemplo**.

### Leitor pistola (USB/Bluetooth)
- Ligue o **Foco Automático** (no celular ele começa desligado para o teclado não ficar abrindo). Cada bipe soma +1.

> **Importante:** a contagem fica salva só no navegador do aparelho. Se alguém limpar os dados do Chrome ou desinstalar o app, ela se perde. **Baixe a contagem** ao terminar.

## Publicar (GitHub Pages, grátis)

1. No repositório: **Settings → Pages → Source: GitHub Actions**.
2. Faça push na branch `main`. O workflow `.github/workflows/pages.yml` publica a pasta `public/`.
3. O endereço aparece em **Settings → Pages** (algo como `https://SEU-USUARIO.github.io/NOME-DO-REPO/`).

> GitHub Pages em repositório **privado** exige plano pago. Se o repositório for privado, deixe-o público ou publique a pasta `public/` no Netlify/Vercel (arrastar a pasta já basta).

## Gerar um APK (opcional, para a Play Store)

Com o app publicado em `https://`:
1. Acesse **https://www.pwabuilder.com**, cole o endereço do app e clique em **Package for stores → Android**.
2. Ele gera o APK/AAB (um app "TWA" que roda o site em tela cheia, com câmera e downloads funcionando).
3. Para publicar na Play Store é preciso uma conta de desenvolvedor Google (taxa única de US$ 25) e colocar o arquivo `assetlinks.json` que o PWABuilder fornece em `public/.well-known/`.

## Estrutura

```
public/                  → o app (é isto que vai para o ar)
  index.html             → tela e lógica do app
  etiquetas-teste.html   → códigos de barras para testar a câmera
  sw.js                  → guarda o app no aparelho (offline)
  manifest.webmanifest   → nome, ícone e cores do app instalado
  css/app.css            → estilos (gerado a partir de src/input.css)
  vendor/                → bibliotecas locais: SheetJS 0.20.3, html5-qrcode 2.3.8, Font Awesome 6.5.1
  fonts/, icons/
src/input.css            → fonte dos estilos (Tailwind)
```

## Mudou alguma coisa?

- **Mudou classes/estilos no HTML:** rode `npm install` e depois `npm run build:css` para atualizar `public/css/app.css`.
- **Qualquer mudança em `public/`:** aumente a versão em `public/sw.js` (`contagem-estoque-v4` → `v5`). Assim os aparelhos baixam a versão nova e mostram o aviso **"Nova versão disponível → Atualizar"**. A contagem é mantida.
- Testar no computador: `npm run serve` e abra `http://localhost:8080` (no `localhost` a câmera também funciona).

## Bibliotecas

- [SheetJS](https://sheetjs.com) 0.20.3 (`vendor/xlsx.full.min.js`, cópia da build oficial republicada no npm como `@e965/xlsx`). Licença Apache-2.0.
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) 2.3.8. Licença Apache-2.0.
- [Font Awesome Free](https://fontawesome.com) 6.5.1. Ícones CC BY 4.0, fontes SIL OFL 1.1.
- Fontes Inter e JetBrains Mono (via Fontsource). Licença SIL OFL 1.1.
- [Tailwind CSS](https://tailwindcss.com) 3.4 (só para gerar o CSS).
