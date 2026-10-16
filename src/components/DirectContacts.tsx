const phone = "+351917361697";
const email = "procuracasa@procuracasa.pt";

export default function DirectContacts({
  message = "Olá! Gostaria de saber mais sobre os imóveis da Procuracasa.",
  subject = "Contacto Procuracasa",
}: {
  message?: string;
  subject?: string;
}) {
  return (
    <address
      className="direct-contacts"
      aria-label="Contactos diretos da Procuracasa"
    >
      <p>Prefere falar diretamente?</p>
      <div className="direct-contact-actions">
        <a
          className="button"
          href={`https://wa.me/351917361697?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar por WhatsApp: 917 361 697"
        >
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a
          className="direct-phone"
          href={`tel:${phone}`}
          aria-label="Ligar para 917 361 697"
        >
          <span>Ligar diretamente</span>
          <strong>917 361 697</strong>
        </a>
      </div>
      <a
        className="direct-email"
        href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
      >
        {email} <span aria-hidden="true">↗</span>
      </a>
    </address>
  );
}
