import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Benvenuta nella tua Dashboard 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card title="Magazzino" icon="📦" path="/magazzino" navigate={navigate} />
          <Card title="Articoli" icon="🧶" />
          <Card title="Ordini di Vendita" icon="🛒" />
          <Card title="Ordini di Acquisto" icon="🛍️" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, path, navigate }) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => path && navigate(path)}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    </div>
  );
}
