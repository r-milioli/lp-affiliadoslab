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
export VITE_LEAD_WEBHOOK_URL="${VITE_LEAD_WEBHOOK_URL:-}"
export VITE_META_PIXEL_ID="${VITE_META_PIXEL_ID:-}"
export VITE_GA_MEASUREMENT_ID="${VITE_GA_MEASUREMENT_ID:-}"

# Remove barra final do site URL
case "${VITE_SITE_URL}" in
  */) VITE_SITE_URL="${VITE_SITE_URL%/}" ;;
esac
export VITE_SITE_URL

envsubst '$VITE_URGENCY_TEXT $VITE_URGENCY_SECONDS $VITE_SITE_URL $VITE_CHECKOUT_URL $VITE_PRODUCT_PRICE $VITE_INSTALLMENTS_TEXT $VITE_MODAL_MODE $VITE_WHATSAPP_GROUP_URL $VITE_LEAD_WEBHOOK_URL $VITE_META_PIXEL_ID $VITE_GA_MEASUREMENT_ID' \
  < /docker/env.template.js \
  > /usr/share/nginx/html/env.js

# Open Graph / canonical (placeholder do build + localhost de fallback)
if [ -n "${VITE_SITE_URL}" ]; then
  sed -i \
    -e "s|__VITE_SITE_URL__|${VITE_SITE_URL}|g" \
    -e "s|http://localhost:5173|${VITE_SITE_URL}|g" \
    /usr/share/nginx/html/index.html
fi

exec nginx -g 'daemon off;'
