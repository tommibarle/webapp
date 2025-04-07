import { useState, useEffect } from "react";
import supabase from "./supabase"; // Assicurati di avere supabase.js configurato correttamente

function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria: "materia_prima",
    quantita: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  // Carica gli articoli dal database (Supabase)
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from("articoli").select();
      if (error) throw error;
      setItems(data);
    } catch (error) {
      console.error("Errore caricamento articoli:", error.message);
    }
  };

  useEffect(() => {
    fetchItems(); // Carica gli articoli all'avvio
  }, []);

  // Gestisce il cambiamento dei dati del form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gestisce l'invio del form per aggiungere o modificare un articolo
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, categoria, quantita } = form;

    try {
      if (editingItem) {
        // Modifica articolo esistente
        const { data, error } = await supabase
          .from("articoli")
          .update({ nome, categoria, quantita })
          .eq("id", editingItem.id);
        if (error) throw error;

        setItems(items.map((item) => (item.id === editingItem.id ? data[0] : item)));
      } else {
        // Aggiungi nuovo articolo
        const { data, error } = await supabase
          .from("articoli")
          .insert([{ nome, categoria, quantita }]);
        if (error) throw error;

        setItems([...items, ...data]);
      }

      setForm({ nome: "", categoria: "materia_prima", quantita: "" });
      setEditingItem(null);
    } catch (error) {
      console.error("Errore durante l'operazione:", error.message);
    }
  };

  // Gestisce la modifica di un articolo
  const handleEdit = (item) => {
    setForm({ nome: item.nome, categoria: item.categoria, quantita: item.quantita });
    setEditingItem(item);
  };

  // Gestisce la cancellazione di un articolo
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("articoli").delete().eq("id", id);
      if (error) throw error;
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Errore durante la cancellazione dell'articolo:", error.message);
    }
  };

  // Categorie per la visualizzazione
  const categorie = {
    materia_prima: "Materie Prime",
    semilavorato: "Semilavorati",
    prodotto_finito: "Prodotti Finiti",
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">📦 Magazzino</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-pink-50 p-4 rounded-lg shadow mb-6 grid sm:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome articolo"
          className="p-2 rounded border border-pink-300"
          required
        />
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="p-2 rounded border border-pink-300"
        >
          <option value="materia_prima">Materie Prime</option>
          <option value="semilavorato">Semilavorati</option>
          <option value="prodotto_finito">Prodotti Finiti</option>
        </select>
        <input
          type="number"
          name="quantita"
          value={form.quantita}
          onChange={handleChange}
          placeholder="Quantità"
          className="p-2 rounded border border-pink-300"
          required
        />
        <button className="bg-pink-500 text-white rounded px-4 hover:bg-pink-600">
          {editingItem ? "Aggiorna" : "Aggiungi"}
        </button>
      </form>

      {Object.keys(categorie).map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {categorie[cat]}
          </h2>
          <ul className="bg-gray-50 rounded-lg p-4 shadow">
            {items.filter((item) => item.categoria === cat).length === 0 ? (
              <li className="text-gray-400 italic">Nessun articolo</li>
            ) : (
              items
                .filter((item) => item.categoria === cat)
                .map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-1 border-b last:border-0"
                  >
                    <div>
                      <span>{item.nome}</span>
                      <span className="ml-2 text-gray-500">({item.quantita})</span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Elimina
                      </button>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Inventory;
