import { Icon } from "@/components/ui/Icon";

export function TrashApp() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
      <Icon name="trash" className="h-10 w-10 text-slate-400" />
      <p className="text-sm font-medium heading">Trash is empty</p>
      <p className="text-xs muted">No bugs in here. They were all fixed before commit.</p>
    </div>
  );
}
