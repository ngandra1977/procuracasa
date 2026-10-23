const phone = "+351926657638";
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
      aria-label="Contactos de Carla Morais — Procuracasa"
    >
      <p>Fale diretamente com Carla Morais.</p>
      <div className="direct-contact-actions">
        <a
          className="button"
          href={`https://wa.me/351926657638?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar Carla Morais por WhatsApp: 926 657 638"
        >
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a
          className="direct-phone"
          href={`tel:${phone}`}
          aria-label="Ligar para Carla Morais: 926 657 638"
        >
          <span>Ligar diretamente</span>
          <strong>926 657 638</strong>
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
