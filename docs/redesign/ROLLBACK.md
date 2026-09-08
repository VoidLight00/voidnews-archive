# 리뉴얼 기준선과 복구

- 작업 전 추적 파일 상태: clean.
- 기준 커밋: `958106db82c592f7e10bd8748090f2e99edea6b8`.
- 기존 브랜치: `feat/voidnews-2026-08b`.
- 작업 브랜치: `feature/runway-renewal-20260908-150208`.
- 복구 번들: `/Users/voidlight/.claude/backups/voidnews-runway-20260908-150208/baseline.bundle`.
- SHA256: `b093676e1171cca1499039a51ccfd6a97a3380861913d44d8343564204e12511`.
- 검증: `git bundle verify` exit 0, 기준선 clean 확인 후 브랜치 생성.
- 비추적·무시 파일(환경 비밀값, 의존성, 빌드 결과)은 번들에 넣지 않았으며 수정 대상에서 제외한다.

## 안전한 복구 확인
기존 작업을 지우지 말고 비어 있는 별도 폴더에서 번들을 연다.

```sh
git clone ~/.claude/backups/voidnews-runway-20260908-150208/baseline.bundle /tmp/voidnews-baseline-restore
git -C /tmp/voidnews-baseline-restore rev-parse HEAD
```

HEAD가 위 기준 커밋과 일치해야 한다. 실제 작업 폴더를 되돌릴 때는 먼저 이후 변경 내역을 검토하고 별도 보존한다. `reset --hard` 또는 `clean`을 자동 실행하지 않는다. 이번 작업은 배포하지 않으므로 운영 롤백은 필요하지 않다.
