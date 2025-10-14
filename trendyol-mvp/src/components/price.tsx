export function Price({ value, original }: { value: number; original?: number }) {
  return (
    <div className="flex items-baseline gap-2">
      {original && original > value ? (
        <span className="text-sm line-through text-gray-500">{original.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
      ) : null}
      <span className="text-lg font-semibold text-orange-600">
        {value.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
      </span>
    </div>
  );
}
