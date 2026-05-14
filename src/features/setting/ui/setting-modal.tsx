'use client';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/components/modal';

type Props = {
  overlayId: string;
  isOpen: boolean;
  onClose: () => void;
};

// TODO: 설정 기능 구현 시점에 작업 필요
export function SettingModal({ overlayId, isOpen, onClose }: Props) {
  return (
    <Modal id={overlayId} isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="border-border/70 flex items-start justify-between border-b px-6 py-5">
          <div>
            <p className="text-lg font-semibold">설정</p>
            <p className="text-muted-foreground mt-1 text-sm">상세 설정 화면은 후속 스펙에서 확장할 예정입니다.</p>
          </div>
          <Button variant="icon" size="sm" className="h-9 w-9 rounded-full" onClick={onClose}>
            <span className="text-lg leading-none">×</span>
          </Button>
        </div>
        <div className="space-y-3 px-6 py-5">
          <section className="bg-muted rounded-2xl px-4 py-4">
            <p className="text-sm font-semibold">기본 환경</p>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              헤더에서는 설정 모달 진입까지만 책임지고, features/setting 내 구현체를 사용해 해당 모달 내에서 탭 관리,
              중첩 모달 오픈 등을 책임집니다.
            </p>
          </section>
        </div>
      </div>
    </Modal>
  );
}
