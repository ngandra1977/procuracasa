export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Termos e Condições</h1>
        
        <div className="text-gray-600 space-y-4">
          <p><strong>Última atualização:</strong> Fevereiro 2025</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">1. Aceitação dos Termos</h2>
          <p>Ao utilizar o site Procuracasa.pt, concorda com estes Termos e Condições. Se não concordar, por favor não utilize o nosso serviço.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">2. Descrição do Serviço</h2>
          <p>O Procuracasa.pt é um serviço gratuito de apoio à procura de imóveis. O nosso serviço consiste em:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Receber informações sobre o imóvel que procura</li>
            <li>Pesquisar imóveis que correspondam às suas necessidades</li>
            <li>Apresentar-lhe opções de imóveis disponíveis</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-900 mt-8">3. Gratuidade</h2>
          <p>O serviço de pesquisa de imóveis é totalmente gratuito para o utilizador. Não há qualquer custo ou compromisso até decidir avançar com a compra ou arrendamento de um imóvel.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">4. Responsabilidades</h2>
          <p>O Procuracasa.pt:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Compromete-se a fazer a pesquisa de imóveis com diligência</li>
            <li>Não garante a disponibilidade permanente de imóveis que correspondam exatamente à procura</li>
            <li>Não se responsabiliza por informações fornecidas por terceiros</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-900 mt-8">5. Informações do Utilizador</h2>
          <p>O utilizador compromete-se a fornecer informações verdadeiras e corretas no formulário de contacto.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">6. Propriedade Intelectual</h2>
          <p>Todo o conteúdo do site (textos, imagens, logótipos) é propriedade do Procuracasa.pt e não pode ser utilizado sem autorização prévia.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">7. Alterações</h2>
          <p>O Procuracasa.pt reserva-se o direito de alterar estes Termos a qualquer momento. As alterações serão comunicadas através do site.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">8. Lei Aplicável</h2>
          <p>Estes Termos são regidos pela lei portuguesa. Qualquer litígio será submetido aos tribunais competentes em Portugal.</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">9. Contacto</h2>
          <p>Para questões sobre estes Termos: <a href="mailto:procura.casa@hotmail.com" className="text-orange-500">procura.casa@hotmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
