const SearchInput = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Buscar tareas..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
};

export default SearchInput;
