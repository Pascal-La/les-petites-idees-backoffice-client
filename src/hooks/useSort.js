const useSort = () => {
  //* ================= SORT BY NAME =================
  const SortNameAsc = (arr) => {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
  };

  const SortNameDesc = (arr) => {
    return arr.sort((a, b) => b.name.localeCompare(a.name));
  };

  //* ================= SORT BY STAR =================
  const SortStar = (arr) => {
    return arr.sort((a, b) => (a.star === b.star ? 0 : a.star ? -1 : 1));
  };

  const UndoSortStar = (arr) => {
    return arr.sort((a, b) => (a.star === b.star ? 0 : b.star ? -1 : 1));
  };

  return [SortNameAsc, SortNameDesc, SortStar, UndoSortStar];
};

export default useSort;
