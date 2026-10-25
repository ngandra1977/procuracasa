"use client";
import { useLocalize } from "@/lib/i18n/client";
import { FormEvent, useState } from "react";
import { locations, propertyTypes, isResidential } from "@/lib/properties";
export default function Contact({ initial = "", initialPropertyType = "", }: {
    initial?: string;
    initialPropertyType?: string;
}) {
    const localize = useLocalize();
    const [propertyType, setPropertyType] = useState(initialPropertyType);
    const [zone, setZone] = useState("");
    const showBedrooms = !propertyType || isResidential(propertyType);
    const [state, setState] = useState("");
    const [busy, setBusy] = useState(false);
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const selectedZone = data.get("zone_choice") === "other"
            ? String(data.get("zone_other") || "").trim()
            : String(data.get("zone_choice") || "Sem preferência");
        if (zone === "other" && !selectedZone) {
            setState("Indique a zona que procura.");
            return;
        }
        setBusy(true);
        setState("");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    consent: data.get("consent") === "on",
                    website: data.get("website"),
                    message: `${data.get("message")}\nTipo de imóvel: ${data.get("property_type") || "Sem preferência"}\nZona: ${selectedZone}\nOrçamento: ${data.get("budget")}\nTipologia: ${showBedrooms ? data.get("bedrooms") : "Não aplicável"}\nPrazo: ${data.get("timeline")}\nTelefone: ${data.get("phone")}`,
                }),
            });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.error);
            setState("Pedido enviado. Entraremos em contacto consigo.");
            form.reset();
            setPropertyType(initialPropertyType);
            setZone("");
        }
        catch (error) {
            setState(error instanceof Error ? error.message : "Não foi possível enviar.");
        }
        finally {
            setBusy(false);
        }
    }
    return localize((<form className="contact-form" onSubmit={submit}>
      <div className="form-pair">
        <label>
          O seu nome
          <input name="name" required minLength={2} maxLength={200} autoComplete="name" placeholder="Nome completo"/>
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="nome@exemplo.pt"/>
        </label>
      </div>
      <div className="form-pair">
        <label>
          Telefone <small>(opcional)</small>
          <input name="phone" type="tel" autoComplete="tel"/>
        </label>
        <label>
          Zona de interesse
          <select name="zone_choice" value={zone} onChange={(e) => setZone(e.target.value)}>
            <option value="">Sem preferência</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            <option value="other">Outra zona — indicar localização</option>
          </select>
          <small>Trabalhamos também noutras zonas.</small>
        </label>
      </div>
      {zone === "other" && <label>
        Que zona procura?
        <input name="zone_other" required maxLength={200} placeholder="Ex.: Braga, Gaia, Maia ou várias localidades"/>
      </label>}
      <label>
        Tipo de imóvel
        <select name="property_type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">Sem preferência</option>
          {propertyTypes.map((type) => (<option key={type}>{type}</option>))}
        </select>
      </label>
      <div className="form-pair">
        <label>
          Orçamento máximo
          <input name="budget" type="number" min="1" placeholder="€"/>
        </label>
        <label>
          Tipologia
          <select name="bedrooms" disabled={!showBedrooms}>
            <option>
              {showBedrooms ? "Sem preferência" : "Não aplicável"}
            </option>
            {["T0", "T1", "T2", "T3", "T4 ou superior"].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
      </div>
      <label>
        Quando pretende comprar?
        <select name="timeline">
          <option>Sem prazo definido</option>
          <option>Nos próximos 3 meses</option>
          <option>Entre 3 e 6 meses</option>
          <option>Daqui a mais de 6 meses</option>
        </select>
      </label>
      <label>
        O que procura?
        <textarea key={initial} name="message" rows={3} defaultValue={initial} maxLength={4000} placeholder="Conte-nos o que é importante na sua próxima casa."/>
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true"/>
      <label className="check">
        <input name="consent" type="checkbox" required/>
        <span>
          Concordo com a utilização dos meus dados para responder a este pedido,
          nos termos da <a href="/privacidade">política de privacidade</a>.
        </span>
      </label>
      <button className="button" disabled={busy}>
        {busy ? "A enviar…" : "Enviar pedido"} <span>↗</span>
      </button>
      <p role="status" aria-live="polite">
        {state}
      </p>
    </form>));
}
