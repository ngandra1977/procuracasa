import Brand from "@/components/Brand";
export default function Privacy() {
  return (
    <>
      <header className="header">
        <Brand />
        <a href="/">Voltar ao início</a>
      </header>
      <main className="section legal">
        <p className="eyebrow">PROCURACASA</p>
        <h1>Privacidade</h1>
        <h2>Os dados do seu pedido</h2>
        <p>
          O formulário recolhe o nome, email, telefone opcional, preferências de
          localização, orçamento, tipologia, prazo de compra e a mensagem que
          decidir partilhar. Não envie documentos de identificação, dados
          bancários ou outros documentos pessoais neste formulário.
        </p>
        <h2>Para que são utilizados</h2>
        <p>
          Os dados destinam-se a responder ao seu pedido e a acompanhar a
          procura de imóvel através da Procuracasa. O consentimento é solicitado
          no formulário. Este consentimento não corresponde a uma subscrição de
          publicidade ou newsletter.
        </p>
        <h2>Envio e armazenamento</h2>
        <p>
          O pedido é transmitido através do serviço Formspree, utilizado para a
          receção de contactos. O site está alojado na Vercel. A carteira de
          imóveis e respetivas fotografias é armazenada no Supabase quando este
          serviço está configurado. O formulário não guarda os seus dados na
          base de dados de imóveis.
        </p>
        <h2>Procura através de parceiros</h2>
        <p>
          Podemos procurar opções através de entidades de mediação imobiliária
          parceiras. A necessidade de transmitir os seus dados de contacto a um
          parceiro deve ser esclarecida consigo antes dessa transmissão.
        </p>
        <h2>Os seus direitos</h2>
        <p>
          Pode pedir acesso, correção ou eliminação dos dados que enviou e
          retirar o consentimento, sem afetar o tratamento anterior à retirada.
          Pode contactar a equipa através das páginas oficiais{" "}
          <a href="https://www.instagram.com/procuracasa.pt/">
            Instagram Procuracasa
          </a>{" "}
          ou{" "}
          <a href="https://www.facebook.com/profile.php?id=61594045382307">
            Facebook Procuracasa
          </a>
          . Pode também apresentar reclamação à CNPD.
        </p>
        <h2>Informação a completar antes do lançamento</h2>
        <p>
          A identificação completa do responsável pelo tratamento, o contacto
          específico de privacidade, o prazo de conservação e as condições
          aplicáveis aos prestadores devem ser confirmados pela equipa antes da
          publicação desta versão.
        </p>
      </main>
    </>
  );
}
