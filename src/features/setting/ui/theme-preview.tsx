import type { ThemeMode } from '@/features/setting/config/theme-options';
import { cn } from '@/shared/lib/cn';

type Props = {
  mode: ThemeMode;
  isActive: boolean;
};

export function ThemePreview({ mode, isActive }: Props) {
  return (
    <div className={cn('rounded-lg p-0.5', isActive ? 'border-foreground border-2' : 'border border-transparent')}>
      <div className="h-9 w-14 overflow-hidden rounded-md">
        {mode === 'system' ? (
          <>
            <div className="h-1/2 bg-slate-50 p-1.5">
              <div className="h-1.5 w-9 rounded bg-slate-300" />
            </div>
            <div className="h-1/2 bg-slate-800 p-1.5">
              <div className="h-1.5 w-9 rounded bg-slate-600" />
            </div>
          </>
        ) : (
          <div className={cn('h-full p-1.5', mode === 'dark' ? 'bg-slate-800' : 'bg-slate-50')}>
            <div className={cn('h-1.5 w-9 rounded', mode === 'dark' ? 'bg-slate-600' : 'bg-slate-300')} />
            <div className="mt-1 flex gap-1">
              <div className={cn('h-4 w-4 rounded', mode === 'dark' ? 'bg-slate-700' : 'bg-slate-200')} />
              <div className={cn('h-4 flex-1 rounded', mode === 'dark' ? 'bg-slate-700' : 'bg-slate-200')} />
            </div>
            <div className={cn('mt-1 h-1 w-3 rounded', isActive ? 'bg-foreground' : 'bg-muted-foreground')} />
          </div>
        )}
      </div>
    </div>
  );
}
