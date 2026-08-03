# Docker — AfiliadosLAB Landpage

## Build e push

```bash
docker build -t automacaodebaixocusto/affiliadoslab:latest .
docker push automacaodebaixocusto/affiliadoslab:latest
```

## Deploy (Swarm / stack)

1. Rede externa Traefik já existente:
```bash
# se ainda não existir
docker network create --driver overlay network_public
```

2. Ajuste `docker-stack.yml` (domínio, envs, labels) e publique:
```bash
docker stack deploy -c docker-stack.yml affiliadoslab
```

## Variáveis de ambiente (runtime)

| Variável | Descrição |
|---|---|
| `VITE_URGENCY_TEXT` | Texto de urgência do header |
| `VITE_URGENCY_SECONDS` | Timer em segundos |
| `VITE_SITE_URL` | URL pública (OG/SEO), sem barra no final |
| `VITE_CHECKOUT_URL` | Link do checkout |
| `VITE_PRODUCT_PRICE` | Preço (número) |
| `VITE_INSTALLMENTS_TEXT` | Texto de parcelas |
| `VITE_MODAL_MODE` | `lead` \| `waitlist` \| `beta` \| vazio |
| `VITE_WHATSAPP_GROUP_URL` | Grupo WhatsApp (waitlist e página `/beta` com vaga) |
| `VITE_URL_REDIRECT` | Redirect após formulário beta (ex.: `https://afiliadoslab.com/beta`) |
| `VITE_BETA_CAPACITY` | Capacidade máxima do grupo beta |
| `VITE_BETA_WEBHOOK_URL` | Webhook POST do quantitativo (proxied em `/api/beta-slots` para evitar CORS) |
| `VITE_LEAD_WEBHOOK_URL` | Webhook POST JSON de captura |
| `VITE_META_PIXEL_ID` | Meta Pixel ID (vazio = desligado) |
| `VITE_GA_MEASUREMENT_ID` | GA4 Measurement ID `G-...` (vazio = desligado) |

As variáveis entram na **stack** e são aplicadas em runtime via `/env.js` (não precisam rebuild para mudar copy/preço/modal).

> **Atenção (Compose/Stack):** qualquer `$` no YAML precisa ser escapado como `$$`.  
> Ex.: `R$ 45,00` → `R$$ 45,00` (o container recebe `R$ 45,00`).

## Healthcheck

`GET /api/health` → `200 ok` (porta interna **80**)

## Traefik

Labels no `docker-stack.yml` usam:
- rede `network_public`
- router `affiliadoslab`
- Host `afiliadoslab.com`
- TLS Let's Encrypt (`letsencryptresolver`)

> **Swarm / Portainer:** as labels Traefik precisam ficar em `deploy.labels`.  
> Labels só em `labels:` (nível do serviço) **não são lidas** no modo Swarm — o Traefik responde `404 page not found` e o SSL não gera.
