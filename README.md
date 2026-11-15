# 📦 AutoParts Audit — Balanço de Estoque

Conferência e balanço de estoque por **código de barras**, feito para tablet e celular Android.

- Lê com **leitor pistola** (USB/Bluetooth) ou com a **câmera** do aparelho (EAN-13, EAN-8, UPC, Code 128, Code 39, ITF, QR e outros).
- Importa a planilha do ERP (**.xlsx, .xls ou .csv**) e mostra **saldo do sistema × contado × diferença**.
- Exporta o balanço completo, só as divergências (.xlsx) ou CSV com `;` para o ERP. Também imprime/gera PDF.
- **Funciona sem internet** depois do primeiro acesso, e **instala como app** na tela inicial do Android.
- A contagem fica salva no próprio aparelho, e nada é enviado para servidor nenhum.

## Como usar no Android

1. Abra o endereço do app no **Chrome** (ver "Publicar" abaixo). A câmera só funciona com `https://`.
2. Toque em **Instalar App** no topo, ou no menu ⋮ → **Instalar app / Adicionar à tela inicial**.
3. Pronto: o ícone **Balanço** abre em tela cheia, mesmo sem internet.

### Leitura pela câmera
- Toque no botão 📷 ao lado do campo de leitura e permita o uso da câmera.
- Cada código conta **uma vez** enquanto continuar na frente da câmera. Para contar outra unidade igual, tire a peça da frente e aponte de novo (ou use **Pedir Qtd em Lote** e digite a quantidade).
- Em lugares escuros, use o botão **Lanterna** (aparece nos aparelhos que permitem).
- Para testar sem peças, abra **Subir Planilha → Etiquetas de teste para a câmera** (`etiquetas-teste.html`), que tem os códigos do lote de exemplo.

### Leitor pistola (USB/Bluetooth)
- Ligue o **Foco Automático** (no celular ele começa desligado para o teclado não ficar abrindo). O cursor volta sempre para o campo de leitura, e cada bipe soma +1.
- Com a câmera ligada, o foco automático fica pausado.

> **Importante:** os dados ficam salvos só no navegador do aparelho. Se alguém limpar os dados do Chrome ou desinstalar o app, a contagem em andamento é perdida. **Exporte o balanço** antes de encerrar.

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
- **Qualquer mudança em `public/`:** aumente a versão em `public/sw.js` (`balanco-estoque-v1` → `v2`). Assim os aparelhos baixam a versão nova e mostram o aviso **"Nova versão disponível → Atualizar"**. As contagens são mantidas.
- Testar no computador: `npm run serve` e abra `http://localhost:8080` (no `localhost` a câmera também funciona).

## Bibliotecas

- [SheetJS](https://sheetjs.com) 0.20.3 (`vendor/xlsx.full.min.js`, cópia da build oficial republicada no npm como `@e965/xlsx`). Licença Apache-2.0.
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) 2.3.8. Licença Apache-2.0.
- [Font Awesome Free](https://fontawesome.com) 6.5.1. Ícones CC BY 4.0, fontes SIL OFL 1.1.
- Fontes Inter e JetBrains Mono (via Fontsource). Licença SIL OFL 1.1.
- [Tailwind CSS](https://tailwindcss.com) 3.4 (só para gerar o CSS).
