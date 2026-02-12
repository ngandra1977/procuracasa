export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p><strong>Última atualização:</strong> Fevereiro 2025</p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">1. Quem Somos</h2>
          <p>
            O Procuracasa.pt é um serviço de intermediação imobiliária que ajuda pessoas a encontrar 
            o imóvel ideal. O responsável pelo tratamento dos dados pessoais é a equipa Procuracasa.
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">2. Dados que Recolhemos</h2>
          <p>Recolhemos apenas os seguintes dados pessoais através do formulário de contacto:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome completo</li>
            <li>Endereço de email</li>
            <li>Localização pretendida para pesquisa de imóveis</li>
            <li>Tipo de imóvel procurado</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-900 mt-8">3. Finalidade do Tratamento</h2>
          <p>Os seus dados pessoais são utilizados exclusivamente para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contactá-lo para apresentar opções de imóveis que correspondam à sua procura</li>
            <li>Responder a questões ou pedidos que nos envie</li>
            <li>Melhorar os nossos serviços</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-900 mt-8">4. Base Legal</h2>
          <p>
            O tratamento dos seus dados pessoais baseia-se no seu consentimento, dado aquando 
            do preenchimento do formulário de contacto, em conformidade com o artigo 6.º, n.º 1, 
            alínea a) do Regulamento Geral sobre a Proteção de Dados (RGPD).
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">5. Partilha de Dados</h2>
          <p>
            Os seus dados pessoais não são vendidos, alugados ou partilhados com terceiros 
            para fins de marketing. Podem ser partilhados apenas com:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestadores de serviços que nos ajudam a operar o site (ex: serviço de email)</li>
            <li>Autoridades públicas, se exigido por lei</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-900 mt-8">6. Conservação dos Dados</h2>
          <p>
            Os seus dados pessoais são conservados apenas pelo tempo necessário para cumprir 
            as finalidades para as quais foram recolhidos, ou conforme exigido por lei. 
            Pode solicitar a eliminação dos seus dados a qualquer momento.
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">7. Os Seus Direitos</h2>
          <p>Ao abrigo do RGPD, tem os seguintes direitos:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Direito de acesso:</strong> Solicitar informação sobre os dados que temos sobre si</li>
            <li><strong>Direito de retificação:</strong> Corrigir dados inexatos ou incompletos</li>
            <li><strong>Direito de apagamento:</strong> Solicitar a eliminação dos seus dados</li>
            <li><strong>Direito de limitação:</strong> Restringir o tratamento dos seus dados</li>
            <li><strong>Direito de portabilidade:</strong> Receber os seus dados num formato estruturado</li>
            <li><strong>Direito de oposição:</strong> Opor-se ao tratamento dos seus dados</li>
          </ul>
          <p>
            Para exercer qualquer um destes direitos, contacte-nos através do email: 
            <a href="mailto:procura.casa@hotmail.com" className="text-orange-500"> procura.casa@hotmail.com</a>
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">8. Segurança</h2>
          <p>
            Implementamos medidas técnicas e organizativas adequadas para proteger os seus 
            dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">9. Alterações</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações 
            serão publicadas nesta página com a data de atualização.
          </p>

          <h2 className="text-xl font-bold text-blue-900 mt-8">10. Contacto</h2>
          <p>
            Para questões relacionadas com esta Política de Privacidade ou o tratamento dos 
            seus dados pessoais, contacte-nos:
          </p>
          <p>
            Email: <a href="mailto:procura.casa@hotmail.com" className="text-orange-500">procura.casa@hotmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
