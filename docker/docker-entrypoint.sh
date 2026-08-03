#!/bin/sh
set -eu

export VITE_URGENCY_TEXT="${VITE_URGENCY_TEXT:-}"
export VITE_URGENCY_SECONDS="${VITE_URGENCY_SECONDS:-}"
export VITE_SITE_URL="${VITE_SITE_URL:-}"
export VITE_CHECKOUT_URL="${VITE_CHECKOUT_URL:-}"
export VITE_PRODUCT_PRICE="${VITE_PRODUCT_PRICE:-}"
export VITE_INSTALLMENTS_TEXT="${VITE_INSTALLMENTS_TEXT:-}"
export VITE_MODAL_MODE="${VITE_MODAL_MODE:-}"
export VITE_WHATSAPP_GROUP_URL="${VITE_WHATSAPP_GROUP_URL:-}"
export VITE_URL_REDIRECT="${VITE_URL_REDIRECT:-}"
export VITE_BETA_CAPACITY="${VITE_BETA_CAPACITY:-}"
export VITE_BETA_WEBHOOK_URL="${VITE_BETA_WEBHOOK_URL:-}"
export VITE_LEAD_WEBHOOK_URL="${VITE_LEAD_WEBHOOK_URL:-}"
export VITE_META_PIXEL_ID="${VITE_META_PIXEL_ID:-}"
export VITE_GA_MEASUREMENT_ID="${VITE_GA_MEASUREMENT_ID:-}"

# Remove barra final do site URL
case "${VITE_SITE_URL}" in
  */) VITE_SITE_URL="${VITE_SITE_URL%/}" ;;
esac
export VITE_SITE_URL

envsubst '$VITE_URGENCY_TEXT $VITE_URGENCY_SECONDS $VITE_SITE_URL $VITE_CHECKOUT_URL $VITE_PRODUCT_PRICE $VITE_INSTALLMENTS_TEXT $VITE_MODAL_MODE $VITE_WHATSAPP_GROUP_URL $VITE_URL_REDIRECT $VITE_BETA_CAPACITY $VITE_BETA_WEBHOOK_URL $VITE_LEAD_WEBHOOK_URL $VITE_META_PIXEL_ID $VITE_GA_MEASUREMENT_ID' \
  < /docker/env.template.js \
  > /usr/share/nginx/html/env.js

# Open Graph / canonical (placeholder do build + localhost de fallback)
if [ -n "${VITE_SITE_URL}" ]; then
  sed -i \
    -e "s|__VITE_SITE_URL__|${VITE_SITE_URL}|g" \
    -e "s|http://localhost:5173|${VITE_SITE_URL}|g" \
    /usr/share/nginx/html/index.html
fi

# Proxy same-origin para o webhook de vagas beta (evita CORS no browser)
NGINX_CONF="/etc/nginx/conf.d/default.conf"
cp /docker/nginx.conf "$NGINX_CONF"

if [ -n "${VITE_BETA_WEBHOOK_URL}" ]; then
  cat > /tmp/beta-slots-proxy.conf <<EOF
  location = /api/beta-slots {
    proxy_pass ${VITE_BETA_WEBHOOK_URL};
    proxy_ssl_server_name on;
    proxy_http_version 1.1;
    proxy_set_header Host \$proxy_host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Content-Type application/json;
  }
EOF
else
  cat > /tmp/beta-slots-proxy.conf <<'EOF'
  location = /api/beta-slots {
    default_type application/json;
    return 503 '{"error":"VITE_BETA_WEBHOOK_URL nao configurada"}';
  }
EOF
fi

awk '
  /# __BETA_SLOTS_PROXY__/ {
    while ((getline line < "/tmp/beta-slots-proxy.conf") > 0) print line
    close("/tmp/beta-slots-proxy.conf")
    next
  }
  { print }
' "$NGINX_CONF" > /tmp/nginx-default.conf
mv /tmp/nginx-default.conf "$NGINX_CONF"

exec nginx -g 'daemon off;'
