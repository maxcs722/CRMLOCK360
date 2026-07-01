export function Logo() {
  return (
    <div className="flex items-center gap-3 px-4 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
        L
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          LOCK360
        </h1>

        <p className="text-xs text-muted-foreground">
          Enterprise CRM
        </p>
      </div>
    </div>
  );
}