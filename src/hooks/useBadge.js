const useBadge = () => {
  const SelectBadge = (val, badgeList, setBadgeList) => {
    setBadgeList([...badgeList, val]);
  };

  const RemoveBadge = (val, badgeList, setBadgeList) => {
    const updateBadgeList = [...badgeList].filter((badge) => badge !== val);
    setBadgeList(updateBadgeList);
  };

  return [SelectBadge, RemoveBadge];
};

export default useBadge;
