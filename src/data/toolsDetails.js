export const toolsDetails = {
  provision: {
    id: 'provision',
    name: 'Provision',
    tagline: 'Você compra a VPS. O Provision coloca o Afiliados Lab inteiro no ar.',
    problem:
      'O afiliado tem o kit, mas fica preso no gargalo de infraestrutura: instalar Docker, proxy, bancos e apps exige DevOps, horas de terminal ou técnico caro — e sem servidor rodando as outras ferramentas não existem na prática.',
    promise:
      'Transforma uma VPS vazia em servidor completo do Afiliados Lab — com Docker, proxy, bancos, WhatsApp API e as apps do kit — sem o afiliado precisar saber DevOps, Docker ou terminal.',
    features: [
      {
        title: 'Wizard de bootstrap da VPS',
        items: [
          'Conecta por SSH e valida VPS Debian 12 virgem',
          'Instala Docker Engine, Swarm e rede overlay',
          'Sobe Traefik com HTTPS (Let\'s Encrypt)',
          'Instala Portainer com token de API no vault',
        ],
      },
      {
        title: 'Catálogo de serviços com dependências',
        items: [
          'Instala infra compartilhada: PostgreSQL, Redis e MinIO',
          'WhatsApp: EvoGo (padrão) ou Evolution API v2',
          'Apps do lab: MultiLink, ZynkLink, Wavro, Smart Showcase e FluxClick',
          'Blog Lab: WordPress multi-site e AdPost AI',
          'Gera senhas, resolve URIs e faz deploy via Portainer',
        ],
      },
      {
        title: 'Vault e API Keys',
        items: [
          'Credenciais criptografadas em repouso (SSH, Portainer, bancos, apps)',
          'Consulta no painel e reenvio de acessos por e-mail',
          'Módulo Minhas API Keys integrado ao API Control',
          'Copia a key e cola em cada app do kit',
        ],
      },
      {
        title: 'Operação e autonomia da VPS',
        items: [
          'Instalação com log em tempo real e progresso por etapa',
          'Painel com status da VPS, serviços e desempenho sob demanda',
          'Stacks ficam no Portainer da própria máquina',
          'Porta de saída: sai do Provision e continua operando a VPS',
        ],
      },
    ],
    benefits: [
      'Setup guiado para leigo — meta de menos de 15 minutos por etapa',
      'Menos dependência de técnico externo após a compra do kit',
      'Credenciais organizadas, sem senhas espalhadas em anotações',
      'Dependências validadas: apps sobem na ordem certa',
      'Sem aprisionamento: a base fica na VPS do afiliado',
    ],
    summary:
      'O Provision é a ferramenta indispensável que resolve o gargalo de colocar e manter a infraestrutura no ar. Ele liga o interruptor das outras ferramentas do kit na VPS do afiliado, com segurança, ordem de dependências, credenciais no vault e autonomia real via Portainer.',
  },
  wavro: {
    id: 'wavro',
    name: 'Wavro',
    tagline: 'A operação do Instagram que o afiliado não consegue fazer só no celular.',
    problem:
      'Sem uma plataforma que publique, modere, automatize conversas e mensure resultado, o afiliado trabalha mais e converte menos — e o Instagram vira custo de tempo, não ativo de vendas.',
    promise:
      'Central de comando do Instagram: agenda conteúdo, responde e automatiza comentários e DMs, captura leads a partir do engajamento e mostra o que performa — tudo em um só lugar.',
    features: [
      {
        title: 'Agendamento e publicação',
        items: [
          'Agenda posts, Reels, Stories e carrosséis',
          'Publicação automática no horário via API da Meta',
          'Fila com retry e alerta quando a publicação falha',
          'Respeito ao limite de publicações da Meta por conta',
        ],
      },
      {
        title: 'Inbox e automação de comentários',
        items: [
          'Inbox unificada com responder, ocultar e deletar',
          'Regras por palavra-chave, username ou comentário com link',
          'Automações em publicação, Reels e mídia de anúncio',
          'Private Reply: do comentário para o Direct',
          'Notificações in-app, por e-mail e resumo diário',
        ],
      },
      {
        title: 'Chatbot e Direct',
        items: [
          'Editor visual de fluxos com triggers, envios e captura',
          'Automação de resposta a Stories com DM e link',
          'Palavra-chave de DM, tags, condições, wait e HTTP',
          'IA de fallback (OpenAI) e handoff para humano',
          'Disclosure obrigatório de automação (conformidade Meta)',
        ],
      },
      {
        title: 'Insights e workspace',
        items: [
          'Impressões, alcance, visitas, seguidores e engajamento',
          'Top posts, séries temporais e filtro por período',
          'Exportação em CSV e PDF',
          'Conta profissional conectada por OAuth no workspace',
        ],
      },
    ],
    benefits: [
      'Suite única: publicação + comentários + DM + insights',
      'Funil nativo do afiliado: comentário → private reply → DM → lead',
      'Follow-up de Stories e anúncios no mesmo sistema',
      'Atendimento que escala com fluxo, IA e humano no handoff',
      'Mais consistência de conteúdo e menos horas manuais no celular',
    ],
    summary:
      'A Wavro é a plataforma de gestão e automação do Instagram do kit Afiliados Lab. Ela opera conteúdo, atendimento e conversão em escala — sem depender só do celular e sem deixar lead engajado sem follow-up.',
  },
  multilink: {
    id: 'multilink',
    name: 'MultiLink',
    tagline: 'Seus links em um só lugar.',
    problem:
      'O afiliado perde vendas porque links, ofertas e contatos ficam espalhados — e ninguém consegue medir o que realmente converte.',
    promise:
      'Uma página pública profissional que organiza links e produtos, captura leads nos CTAs, rastreia cliques e visitas, integra Pixel/Analytics/webhooks e roda sob licença própria no kit.',
    features: [
      {
        title: 'Página pública de links',
        items: [
          'URL pública no formato /{username}',
          'Avatar, nome, bio e lista de links com clique rastreado',
          'Abas Links e Produtos (conteúdo separado de oferta)',
          'Redes sociais, rodapé legal e SEO por perfil',
          'Opção de página privada',
        ],
      },
      {
        title: 'Gestão de links e ofertas',
        items: [
          'Criar, editar, ativar/desativar e excluir links',
          'Tipos NORMAL e PRODUCT',
          'Reordenação por arrastar e soltar',
          'Contador de cliques e upload de imagem',
          'Opção de formulário antes do destino',
        ],
      },
      {
        title: 'Formulários e captura de leads',
        items: [
          'Campos nome, e-mail, WhatsApp e customizado',
          'Modal na página pública ao clicar no CTA',
          'Leads salvos na plataforma',
          'Exportação em CSV e estatísticas por formulário',
        ],
      },
      {
        title: 'Personalização e branding',
        items: [
          'Temas prontos e estilos de botão',
          'Fundo sólido, gradiente ou imagem',
          'Controle de avatar, cores, hover e animações',
          'CSS personalizado avançado com preview',
        ],
      },
      {
        title: 'Analytics e integrações',
        items: [
          'Cliques, views, visitantes únicos e top links',
          'Filtros de período e relatório por e-mail',
          'Google Analytics e Meta Pixel',
          'Webhooks de lead, clique, visita e stats diários',
        ],
      },
    ],
    benefits: [
      'Um único hub na bio — tráfego deixa de vazar entre canais',
      'Clique vira ativo: captura de e-mail/WhatsApp no momento da intenção',
      'Troca de oferta da campanha sem refazer bio em vários lugares',
      'Decisão por dados: top links, views e leads',
      'Stack conectada com Pixel, Analytics e automações',
    ],
    summary:
      'O MultiLink é a central de links do afiliado: página profissional que concentra ofertas, conteúdos e redes; captura leads no clique; mede o que performa; e conecta Pixel, Analytics e automações — porque afiliado sem hub opera no escuro.',
  },
  zynklink: {
    id: 'zynklink',
    name: 'ZynkLink',
    tagline: 'Pare de colar promoção. Comece a operar divulgação.',
    problem:
      'Afiliados de grupos no WhatsApp não conseguem escalar envios, controle e conversão sem se afogar em trabalho manual — com inconsistência, perda de timing e risco operacional.',
    promise:
      'Plataforma de automação e gestão de grupos de promoções no WhatsApp: conecta números, organiza audiência, cadastra ofertas, padroniza mensagens, agenda envios e mede resultados com equipe.',
    features: [
      {
        title: 'Instâncias e grupos WhatsApp',
        items: [
          'Conexão de números via QR',
          'Status quase em tempo real da instância',
          'Sincronização, ativação e métricas de grupos',
          'Blacklist/whitelist e exportação de contatos',
          'Pausa de agendamentos se a conexão cair',
        ],
      },
      {
        title: 'Catálogo de produtos',
        items: [
          'CRUD com preço, desconto, link afiliado, imagem e categoria',
          'Status de envio e filtros por plataforma',
          'Importação em massa (Excel/CSV)',
          'API pública para inserir produtos',
          'Plataformas: Shopee, Amazon, Mercado Livre e Outro',
        ],
      },
      {
        title: 'Templates e agendamentos',
        items: [
          'Templates com variáveis e preview estilo WhatsApp',
          'Mídia por URL e versionamento',
          'Agendamentos recorrentes por horário e dias da semana',
          'Intervalo fixo ou aleatório (humanização)',
          'Retry, histórico de execuções e envio de teste',
        ],
      },
      {
        title: 'Dashboard, alertas e equipe',
        items: [
          'Métricas globais e por grupo (entradas/saídas)',
          'Alertas de desconexão, queda de membros e falhas',
          'Exportação CSV, Excel e PDF',
          'RBAC: Root, Admin, Editor, Operador e Visualizador',
          'Webhooks de saída e auditoria',
        ],
      },
    ],
    benefits: [
      'Automatiza a maior parte dos envios diários fora do braço',
      'Timing consistente com horários e recorrência',
      'Visibilidade de audiência (entradas e saídas) nos grupos',
      'Escala com templates, agendamentos e permissões de equipe',
      'Menos risco operacional com intervalos humanizados e pausa automática',
    ],
    summary:
      'O ZynkLink é a ferramenta do kit para afiliados que dependem de grupos de WhatsApp: conecta WhatsApp, gerencia grupos, organiza produtos e templates, agenda envios com worker e entrega dashboard, alertas e integrações — transformando divulgação manual em sistema operacional.',
  },
  'smart-showcase': {
    id: 'smart-showcase',
    name: 'Smart Showcase',
    tagline: 'Curadoria inteligente de produtos para marketplaces — do anúncio bruto à oferta pronta para vender.',
    problem:
      'Caçar promoção à mão em Mercado Livre, Amazon e Shopee não escala: o afiliado perde horas, publica oferta mediana, erra link de afiliado e chega atrasado no timing que paga o mês.',
    promise:
      'Vitrine inteligente self-hosted que raspa marketplaces, usa IA para escolher as melhores ofertas, gera links de afiliado e publica só o que está pronto na plataforma de distribuição.',
    features: [
      {
        title: 'Extração de produtos',
        items: [
          'Scraping de Mercado Livre e Amazon por URL',
          'Extração por palavra-chave na Shopee',
          'Seletores CSS sem código, com geração por IA',
          'Jobs assíncronos com retry e deduplicação',
          'Importação em lote via extensão Chrome',
        ],
      },
      {
        title: 'Vitrine e cofres de afiliado',
        items: [
          'Grid/lista com filtros e badges de status',
          'Edição de título, preços, imagem e categoria',
          'Cofres criptografados para ML, Amazon e Shopee',
          'Geração de link de afiliado via OmniLink',
          'Preservação de itens na limpeza automática',
        ],
      },
      {
        title: 'Curadoria com IA',
        items: [
          'Agrupa produtos similares',
          'Escolhe a melhor oferta com score e justificativa',
          'Sugere categoria automaticamente',
          'Histórico de runs de análise',
          'Aprovação humana em paralelo no fluxo de exportação',
        ],
      },
      {
        title: 'Exportação e agendamento',
        items: [
          'Publicação validada na API do ZynkLink',
          'Pipeline: cofre → afiliado → shortlink FluxClick (opcional) → API',
          'Agendamento do fluxo completo ou etapas isoladas',
          'Histórico de exportações e reenvio em erro',
          'Download de CSV com links de afiliado',
        ],
      },
    ],
    benefits: [
      'Três marketplaces num só fluxo de abastecimento',
      'IA separa a melhor oferta entre similares',
      'Link de afiliado gerado com a tag do cofre — sem gambiarra',
      'Exportação pronta e validada para a distribuição',
      'Ciclo diário vira pipeline agendado, não ritual manual',
    ],
    summary:
      'O Smart Showcase é a peça de curadoria e abastecimento do kit: extrai produtos de ML, Amazon e Shopee, escolhe as melhores ofertas com IA, gera links de afiliado e publica o que está validado na distribuição — com agendamento, vitrine e colaboradores.',
  },
  fluxclick: {
    id: 'fluxclick',
    name: 'FluxClick',
    tagline: 'Se o afiliado não controla o clique, ele não controla a campanha.',
    problem:
      'Quem escala campanhas investe em tráfego sem controle real do clique: links frágeis, UTM inconsistente, destino que muda depois de publicado, métricas infladas e campanhas que continuam vivas fora do prazo.',
    promise:
      'Motor próprio de links curtos com regras avançadas, UTM de equipe, páginas públicas governadas, métricas em tempo real (só clique válido), colaboração segura e API de integração.',
    features: [
      {
        title: 'Gestão de links curtos',
        items: [
          'Modo simples (redirect direto) ou avançado',
          'Senha, splash, expiração e limite de cliques',
          'Editar destino sem mudar o slug já divulgado',
          'Ativar/desativar e gerar QR Code da URL final',
          'Proteção: bloqueios não revelam a URL de destino',
        ],
      },
      {
        title: 'UTMs e páginas de estado',
        items: [
          'Biblioteca de templates UTM compartilhada pela equipe',
          'Merge de parâmetros: append, replace ou keep',
          'Templates para splash, senha, inativo, expirado e não encontrado',
          'Override de página por link quando necessário',
        ],
      },
      {
        title: 'Analytics em tempo real',
        items: [
          'Dashboard com KPIs e Top 10 de cliques',
          'Stream ao vivo via WebSocket',
          'Geo, dispositivo, navegador, referrer e marcação de bot',
          'Contagem só de redirect bem-sucedido',
          'Exportação de relatórios em CSV',
        ],
      },
      {
        title: 'Equipe, segurança e API',
        items: [
          'Acesso por convite com papéis Admin e Editor',
          '2FA TOTP para ações administrativas críticas',
          'Login local e OAuth (Google e GitHub)',
          'API com chaves fc_live_… para criar e consultar links',
          'Integração típica com n8n, backends e CRMs',
        ],
      },
    ],
    benefits: [
      'Link estável: muda a oferta por trás sem republicar tudo',
      'UTM padronizada sem retrabalho entre canais',
      'Cliques reais em tempo real — sem vanity metric',
      'Proteção de funis sensíveis com senha, splash e limites',
      'Governança de equipe com permissões, 2FA e API',
    ],
    summary:
      'O FluxClick é a ferramenta de links, proteção de fluxo e analytics de cliques do Afiliados Lab. Entrega links curtos com regras, UTM de equipe, páginas governadas e métricas confiáveis — para instrumentar, governar e medir cada clique com método.',
  },
}
