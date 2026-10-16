# Procuracasa · Carla Morais

Remodelação em Next.js para o alojamento existente na Vercel. Identidade marfim/terracota, logótipo vetorial, catálogo com filtros, páginas individuais, formulário de procura e gestão protegida em `/gestao`. Não inclui imóveis fictícios: sem conteúdo carregado, apresenta uma carteira vazia e o convite à procura personalizada.

## Arranque

1. `npm install`
2. Copiar `.env.example` para `.env.local` e preencher as variáveis.
3. `npm run dev`. Para validar: `npm run build`. Se o ambiente restringir sockets usados pelo Turbopack, usar `npm run build -- --webpack`.

## Dados e fotografias

Criar um projeto Supabase e executar `supabase/setup.sql` no editor SQL. Configurar na Vercel (e localmente):

- `SUPABASE_URL`: URL do projeto.
- `SUPABASE_SERVICE_ROLE_KEY`: chave de servidor; nunca expor ao browser.
- `ADMIN_PASSWORD`: palavra-passe única com pelo menos 16 caracteres.

A base de dados não permite acesso anónimo. As imagens são públicas; só o servidor autenticado pode carregar. A sessão de gestão dura oito horas e usa cookie HttpOnly, SameSite Strict e Secure em produção. O carregamento valida o formato e assinatura do ficheiro, limitado a 3 MB para ficar dentro do limite de pedidos da Vercel. Não há contas individuais ou recuperação de palavra-passe; alterar ADMIN_PASSWORD invalida as sessões. Existe limitação de tentativas por IP e por instância (não distribuída). Antes de exposição pública, complementar a limitação de tentativas para `/api/admin/login` no firewall da Vercel e verificar as condições/custos atuais dos serviços.

Abrir `/gestao`, iniciar sessão, adicionar imóvel, carregar fotografias e guardar como rascunho. Para publicar são obrigatórias fotografias, entidade mediadora e número AMI. É possível escolher a capa, remover imagens da galeria, editar, reservar, vender/arrendar e eliminar anúncios. Remover fotografias da galeria ou eliminar anúncios não apaga objetos do bucket; a limpeza é feita no Supabase para evitar apagar imagens ainda utilizadas.

## Contactos

Mantém-se o destino Formspree existente (`xeelaaew`), agora através de uma rota de servidor, com consentimento, validação, campo antispam e confirmação/erro visíveis. Confirmar que o destino continua sob controlo do titular e fazer um envio real de teste antes de divulgar. Nenhum pedido é dado como enviado quando o serviço devolve erro. Não foi enviado um contacto real durante o desenvolvimento.

## Antes de publicar

- Carregar imóveis autorizados e confirmar preços, áreas, disponibilidade, entidade e AMI.
- Confirmar a apresentação da Carla e o destino do formulário.
- Completar a identificação do responsável pelo tratamento e rever privacidade/termos com os parceiros. Os textos foram adaptados ao novo formulário e incluem os pontos de identificação ainda por completar.
- Substituir, se desejado, as fotografias de ambiente Unsplash incluídas em `public/images` por imagens próprias; a imagem inicial está identificada como ambiente e não é anúncio.
- O SVG `public/brand.svg` é uma proposta vetorial de símbolo arquitetónico. O nome Procuracasa mantém-se; a disponibilidade de TERRACOTA não foi verificada.
- A ferramenta de avaliação não foi integrada nesta fase.

O código não altera DNS, não publica na Vercel e não requer mudança de plataforma. A ligação do repositório à Vercel pode publicar automaticamente um push para a branch de produção: rever em preview antes de integrar.

## Validação realizada

Compilação de produção (`npm run build -- --webpack`) e testes de segurança (`npm test`) concluídos. Os testes verificam sessões, adulteração, expiração, revogação por mudança da palavra-passe, bloqueio de acesso não autenticado, rejeição de publicação incompleta, origem, limitação de tentativas e validação do contacto. Não houve validação visual num browser, envio real de contacto nem teste integrado com Supabase, por faltarem configuração e credenciais.

## Zonas de atuação

As localidades destacadas são preferenciais. O formulário e a gestão permitem escrever qualquer localização, e os filtros do catálogo são gerados a partir dos imóveis carregados. As imagens de ambiente são servidas pelo próprio site; a pré-visualização HTML inclui as imagens para funcionar sem dependências externas.
