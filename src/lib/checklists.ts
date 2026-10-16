export type CheckSection = {
  title: string;
  items: { id: string; title: string; detail: string }[];
};
export const buyerDocuments: CheckSection[] = [
  {
    title: "1. Identificação e preparação",
    items: [
      {
        id: "buyer-id",
        title: "Identificação e NIF dos intervenientes",
        detail:
          "Reúna os documentos de identificação e os números fiscais. Confirme como intervirão cônjuges, representantes ou procuradores, se aplicável.",
      },
      {
        id: "buyer-budget",
        title: "Orçamento e origem dos capitais",
        detail:
          "Organize a entrada e os custos da compra. Prepare os comprovativos de fundos que o banco ou os profissionais responsáveis solicitem.",
      },
      {
        id: "buyer-loan",
        title: "Documentação para o banco, se houver crédito",
        detail:
          "Peça a lista específica: pode incluir IRS e liquidação, recibos de vencimento, comprovativos profissionais e mapa de responsabilidades de crédito.",
      },
    ],
  },
  {
    title: "2. Conferir o imóvel antes de se comprometer",
    items: [
      {
        id: "buyer-registry",
        title: "Certidão permanente do registo predial",
        detail:
          "Confirme quem é proprietário e os registos de hipotecas, penhoras ou outros encargos. Esclareça como serão cancelados os encargos que não devam subsistir.",
      },
      {
        id: "buyer-tax",
        title: "Caderneta predial atualizada",
        detail:
          "Compare identificação, afetação, áreas e VPT com o anúncio, os registos e a realidade. As divergências precisam de esclarecimento.",
      },
      {
        id: "buyer-urban",
        title: "Situação urbanística, plantas e obras",
        detail:
          "Confirme utilização, licenças ou dispensas, alterações e documentação disponível com a câmara e os profissionais. A dispensa de apresentar um documento no ato não resolve por si uma irregularidade.",
      },
      {
        id: "buyer-energy",
        title: "Certificado energético ou eventual isenção",
        detail:
          "Peça o certificado aplicável e conheça as recomendações. Se for indicada isenção, confirme o fundamento para aquele imóvel.",
      },
      {
        id: "buyer-condo",
        title: "Condomínio, quando exista",
        detail:
          "Peça informação sobre encargos, dívidas, atas recentes, obras previstas e fundo de reserva. Esclareça a declaração do administrador e as consequências de qualquer dispensa.",
      },
    ],
  },
  {
    title: "3. Contrato e conclusão",
    items: [
      {
        id: "buyer-cpcv",
        title: "Revisão do CPCV, se for celebrado",
        detail:
          "Confirme partes, identificação do imóvel, preço, sinal, prazos, condições de financiamento e consequências do incumprimento com um profissional habilitado antes de assinar.",
      },
      {
        id: "buyer-fine",
        title: "FINE e condições finais do crédito",
        detail:
          "Confira taxas, prestação, seguros, produtos associados e montante aprovado. Confirme os prazos de reflexão e as condições para disponibilizar o dinheiro.",
      },
      {
        id: "buyer-taxes",
        title: "IMT e Imposto do Selo, ou benefício aplicável",
        detail:
          "Confirme liquidação, pagamento ou isenção com a entidade que formaliza a compra. Guarde os comprovativos solicitados.",
      },
      {
        id: "buyer-deed",
        title: "Ato de compra, registo e entrega",
        detail:
          "Confirme documentos finais, forma de pagamento, entrega das chaves e leituras dos contadores. Verifique o registo da aquisição e da hipoteca, se existir.",
      },
    ],
  },
];
export const sellerDocuments: CheckSection[] = [
  {
    title: "1. Identificar os titulares e o imóvel",
    items: [
      {
        id: "seller-id",
        title: "Identificação, NIF e legitimidade para vender",
        detail:
          "Confirme todos os titulares e os consentimentos necessários. Heranças, representações e regimes matrimoniais podem exigir documentos adicionais.",
      },
      {
        id: "seller-registry",
        title: "Certidão permanente do registo predial",
        detail:
          "Confirme titularidade e encargos. Resolva dúvidas sobre inscrições ou registos pendentes antes de negociar os prazos.",
      },
      {
        id: "seller-tax",
        title: "Caderneta predial",
        detail:
          "Disponibilize uma versão atualizada e confira identificação, áreas, afetação e VPT.",
      },
      {
        id: "seller-urban",
        title: "Documentação urbanística e técnica disponível",
        detail:
          "Reúna plantas, licenças ou comprovativos de dispensa, documentação de obras e ficha técnica, se existir. Valide eventuais divergências ou alterações não regularizadas.",
      },
      {
        id: "seller-energy",
        title: "Certificado energético ou fundamento de isenção",
        detail:
          "Confirme a obrigação aplicável ao anúncio e à venda. Não presuma que todos os tipos de imóvel estão sujeitos às mesmas regras.",
      },
    ],
  },
  {
    title: "2. Preparar a venda",
    items: [
      {
        id: "seller-condo",
        title: "Documentação do condomínio",
        detail:
          "Peça informação sobre encargos, dívidas e obras. Prepare a declaração do administrador aplicável à transmissão ou esclareça uma eventual dispensa com quem formaliza o ato.",
      },
      {
        id: "seller-bank",
        title: "Hipoteca e cancelamento do registo",
        detail:
          "Se houver empréstimo, peça ao banco o procedimento, valores e prazos para liquidar e cancelar a hipoteca na venda.",
      },
      {
        id: "seller-occupancy",
        title: "Ocupação, arrendamentos e direitos de preferência",
        detail:
          "Informe sobre ocupantes ou contratos e confirme se há titulares de preferência ou outras formalidades aplicáveis ao caso.",
      },
      {
        id: "seller-agency",
        title: "Condições de mediação e autorização de divulgação",
        detail:
          "Confira a entidade mediadora, a licença AMI, a comissão acordada e as condições do contrato de mediação, quando exista.",
      },
    ],
  },
  {
    title: "3. Fecho e obrigações posteriores",
    items: [
      {
        id: "seller-contract",
        title: "CPCV e documento de transmissão",
        detail:
          "Reveja preço, sinal, prazos, entrega e condições acordadas. Peça a lista final de documentos à entidade que vai formalizar o negócio.",
      },
      {
        id: "seller-delivery",
        title: "Entrega e comprovativos",
        detail:
          "Combine chaves, leituras de contadores, equipamentos incluídos e comprovativos de liquidação. Guarde os documentos da compra e da venda.",
      },
      {
        id: "seller-tax-future",
        title: "Preparação fiscal da venda",
        detail:
          "Organize despesas documentadas e informação para apurar o tratamento em IRS, incluindo eventuais condições de reinvestimento. Esta checklist não calcula mais-valias.",
      },
    ],
  },
];
export const visitSections: CheckSection[] = [
  {
    title: "1. Antes de sair",
    items: [
      {
        id: "visit-budget",
        title: "Definir orçamento e prioridades",
        detail:
          "Leve uma lista curta do que é essencial e do que é negociável. Considere despesas mensais e eventuais obras.",
      },
      {
        id: "visit-info",
        title: "Confirmar anúncio e localização",
        detail:
          "Anote a referência, as áreas anunciadas, a orientação e o que está incluído: garagem, arrumos, terraço ou equipamentos.",
      },
      {
        id: "visit-route",
        title: "Explorar acessos e envolvente",
        detail:
          "Experimente percursos, transportes, estacionamento e serviços. Quando possível, volte em horários diferentes.",
      },
    ],
  },
  {
    title: "2. Dentro do imóvel",
    items: [
      {
        id: "visit-light",
        title: "Luz, orientação e ventilação",
        detail:
          "Observe a luz natural e a circulação de ar. Pergunte pela exposição solar ao longo do dia e do ano.",
      },
      {
        id: "visit-damp",
        title: "Humidade, fissuras e infiltrações",
        detail:
          "Veja tetos, cantos, rodapés e zonas junto às janelas. Peça esclarecimentos e avaliação técnica quando houver sinais relevantes.",
      },
      {
        id: "visit-windows",
        title: "Janelas, isolamento e ruído",
        detail:
          "Abra e feche vãos, observe vedantes e procure perceber o ruído da rua e de outras frações.",
      },
      {
        id: "visit-water",
        title: "Água, eletricidade e climatização",
        detail:
          "Com autorização, verifique pressão da água, drenagem e equipamentos. Pergunte pela idade das instalações e pela manutenção.",
      },
      {
        id: "visit-layout",
        title: "Distribuição e dimensões úteis",
        detail:
          "Meça os espaços importantes e confirme se servem os seus móveis e necessidades. Compare plantas e realidade.",
      },
      {
        id: "visit-energy",
        title: "Conforto e consumo",
        detail:
          "Peça o certificado energético, quando aplicável, e pergunte como se aquece e arrefece a casa.",
      },
    ],
  },
  {
    title: "3. Edifício, terreno e custos",
    items: [
      {
        id: "visit-building",
        title: "Partes comuns e estado do edifício",
        detail:
          "Observe fachada, cobertura acessível, escadas, elevadores e garagem. Pergunte por obras feitas e previstas.",
      },
      {
        id: "visit-condo",
        title: "Condomínio e despesas recorrentes",
        detail:
          "Peça o valor da quota, encargos extraordinários e informação sobre dívidas e obras. Acrescente IMI e manutenção ao orçamento.",
      },
      {
        id: "visit-land",
        title: "Limites e viabilidade, se houver terreno",
        detail:
          "Confirme confrontações, acessos, infraestruturas e condicionantes. A possibilidade de construir exige confirmação junto do município; não resulta apenas do anúncio.",
      },
      {
        id: "visit-docs",
        title: "Registos e situação urbanística",
        detail:
          "Antes de avançar, confira titularidade, encargos, áreas e regularidade das alterações com documentação e apoio adequado.",
      },
    ],
  },
  {
    title: "4. Depois da visita",
    items: [
      {
        id: "visit-notes",
        title: "Registar dúvidas e comparar opções",
        detail:
          "Separe factos de impressões, faça fotografias com autorização e liste as respostas ainda em falta.",
      },
      {
        id: "visit-technical",
        title: "Pedir uma segunda visita ou avaliação técnica",
        detail:
          "Leve um técnico quando o estado, as obras ou a documentação exigirem esclarecimentos. Uma visita visual não substitui uma inspeção.",
      },
      {
        id: "visit-offer",
        title: "Confirmar condições antes de propor",
        detail:
          "Reveja preço, financiamento, prazos, equipamentos e condições da proposta. Não entregue valores sem compreender os documentos e o destinatário.",
      },
    ],
  },
];
