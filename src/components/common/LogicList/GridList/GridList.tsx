type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => JSX.Element;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? (
      records.map((record) => (
        <div key={record.id} className="flex items-center justify-center gap-2">
          {renderItem(record)}
        </div>
      ))
    ) : (
      <div className="">Loading....</div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-5">
      {renderList}
    </div>
  );
};

export default GridList;
