# Golf Prime Brasil

Landing page "Em Breve" com galeria de imagens em carousel com crossfade automático.

## Estrutura

```
golf/
├── html/
│   └── index.html        # Página principal
├── css/
│   └── style.css         # Estilos e animações
├── javascript/
│   └── script.js         # Comportamentos e carousels
└── img/                  # Imagens (campogolf*, tacada*, equipamentos*)
```

## Características

- **Carousels com crossfade**: 3 blocos de imagens com transição suave.
- **Contagem regressiva**: Timer para data de lançamento.
- **Modal para e-mail**: Captura de contatos.
- **Responsivo**: Adapta-se a mobile e desktop.
- **Acessível**: Respeita preferências de redução de movimento.

## Configuração

### Intervalo do carousel
Abra `javascript/script.js` e ajuste `defaultInterval`:

```javascript
const defaultInterval = prefersReduced ? 7000 : 4500; // ms
```

### Duração da transição
Abra `css/style.css` e ajuste `transition` em `.carousel img`:

```css
transition: opacity 1.2s ease-in-out;
```

## Como usar

Abra `html/index.html` diretamente no navegador ou inicie um servidor local:

```bash
python -m http.server 8000
```

Então acesse: `http://localhost:8000/html/index.html`

## Navegadores suportados

Chrome, Firefox, Safari, Edge (últimas versões com suporte a CSS `aspect-ratio` e `grid`).

## To Do / Próximas melhorias

- [ ] Adicionar controles visuais (play, pause, anterior, próximo).
- [ ] Implementar `data-interval` por carousel para tempos customizáveis.
- [ ] Minificar CSS e JS para produção.
- [ ] Adicionar lazy-loading avançado para imagens.
- [ ] Integrar API de e-mail (envio real).
- [ ] Testes automatizados (Jest/Cypress).
- [ ] SEO e meta tags (Open Graph, Twitter Card).
- [ ] Compactar imagens (WebP, AVIF).