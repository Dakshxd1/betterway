export default function Filters({ products, filters, setFilters }) {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="filters">
      <input
        placeholder="Search product"
        value={filters.search}
        onChange={e =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        value={filters.category}
        onChange={e =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={e =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="">Sort</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>

      <button onClick={() =>
        setFilters({ search: "", category: "", sort: "" })
      }>
        Clear Filters
      </button>
    </div>
  );
}
