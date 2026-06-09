import { useState } from 'react';
import './AddressForm.css';

const EMPTY_ADDRESS = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  localidade: '',
  uf: '',
};

function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

export default function AddressForm() {
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [invalidCep, setInvalidCep] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  function handleCepChange(event) {
    setAddress((prev) => ({ ...prev, cep: formatCep(event.target.value) }));
  }

  function clearAddressFields() {
    setAddress((prev) => ({
      ...EMPTY_ADDRESS,
      cep: prev.cep,
      numero: prev.numero,
    }));
  }

  async function searchCep() {
    const cep = address.cep.replace(/\D/g, '');
    if (cep.length === 0) return;

    if (!/^\d{8}$/.test(cep)) {
      setInvalidCep(true);
      setStatus({ message: 'CEP inválido. Use 8 dígitos.', type: 'error' });
      clearAddressFields();
      return;
    }

    setInvalidCep(false);
    setStatus({ message: 'Buscando endereço...', type: 'loading' });

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.erro) {
        setInvalidCep(true);
        setStatus({ message: 'CEP não encontrado.', type: 'error' });
        clearAddressFields();
        return;
      }

      setAddress((prev) => ({
        ...prev,
        logradouro: data.logradouro || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
      }));
      setStatus({ message: 'Endereço encontrado!', type: 'ok' });
    } catch (err) {
      console.error(err);
      setStatus({ message: 'Falha ao consultar o CEP. Tente novamente.', type: 'error' });
      clearAddressFields();
    }
  }

  return (
    <main className="container">
      <h1>Cadastro de Endereço</h1>

      <form
        className="address-form"
        autoComplete="off"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="field">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            placeholder="00000-000"
            maxLength={9}
            inputMode="numeric"
            value={address.cep}
            onChange={handleCepChange}
            onBlur={searchCep}
            className={invalidCep ? 'invalid' : ''}
            required
          />
          {status.message && (
            <span className={`hint ${status.type}`}>{status.message}</span>
          )}
        </div>

        <div className="row">
          <div className="field field-grow">
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              id="logradouro"
              name="logradouro"
              value={address.logradouro}
              onChange={handleChange}
            />
          </div>

          <div className="field field-numero">
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              id="numero"
              name="numero"
              inputMode="numeric"
              value={address.numero}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="complemento">Complemento</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={address.complemento}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={address.bairro}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="field field-grow">
            <label htmlFor="localidade">Cidade</label>
            <input
              type="text"
              id="localidade"
              name="localidade"
              value={address.localidade}
              onChange={handleChange}
            />
          </div>

          <div className="field field-uf">
            <label htmlFor="uf">UF</label>
            <input
              type="text"
              id="uf"
              name="uf"
              maxLength={2}
              value={address.uf}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
