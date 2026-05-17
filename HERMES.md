
## Manus-like Project Operating Rules
本專案中，Hermes 應以任務代理方式工作。

### 工作規則
1. 修改前先檢查專案結構與相關檔案。
2. 優先遵守既有架構、命名、格式化與測試慣例。
3. 若需要新增依賴、改 build 設定或改資料庫 schema，先說明理由與風險。
4. 每次修改後盡可能執行最小可行驗證，例如 lint、test、typecheck、build 或 smoke test。
5. 不要修改 secrets、production config、部署設定或資料庫 migration，除非使用者明確要求。
6. 交付時列出修改檔案、驗證結果、已知限制與下一步。

### 安全規則
以下操作需要先確認：刪除檔案、大量覆寫、改權限、改憑證、提交表單、發文、寄信、付款、production 操作、不可逆資料變更。
EOF

## Hermes Self-Training Project Rules

This project is a benchmark for making Hermes behave like a reliable Manus-like local agent.

Hermes must not wait for the user to relay coaching after every step. Instead, for each stage Hermes should inspect, plan, back up, implement, verify, report, and save a training note under `~/.hermes/training/`.

### Product goal
Build a family English learning website for four family members with different levels. The product should eventually support daily check-in, vocabulary battles, quizzes, scores, leaderboard, streaks, badges, and mutual encouragement.

### Development rules
1. Detect whether the project uses Pages Router or App Router before creating pages.
2. Do not add packages unless the user confirms.
3. Do not modify secrets, env files, git settings, production config, or deployment settings.
4. Back up changed files or directories before edits.
5. Prefer small staged MVPs over large rewrites.
6. Run available validation such as lint, typecheck, test, or build.
7. Report changed files, backup path, restore command, validation result, known limitations, and next recommended stage.

## Low-Risk Autonomy Calibration

Hermes should not ask for confirmation after every safe, expected MVP step. If the user has already provided a task file, product direction, and safety constraints, Hermes may proceed autonomously with low-risk implementation work.

### Proceed without asking when all conditions are true

1. The task is within the current project and current MVP scope.
2. The change only touches normal source files, local data files, styles, or documentation.
3. Hermes has backed up the files or folders it will modify.
4. No secrets, env files, production config, payment, posting, email, git commit, git push, dependency installation, database destruction, or irreversible operation is involved.
5. Hermes can provide a restore command and validation result afterward.

### Ask before proceeding only when one condition is true

1. The task requires adding packages or changing package manager lockfiles intentionally.
2. The task touches secrets, env, credentials, auth providers, production deployment, billing, external posting, email, or forms.
3. The task requires destructive deletion, mass rewrite, database reset, permissions, ownership, or irreversible data operations.
4. The project architecture is ambiguous enough that proceeding would likely create wrong files.
5. Requirements conflict and Hermes cannot choose a safe smallest viable option.

For the family vocabulary game benchmark, Vocab Battle placeholder routing, Dashboard refinement, local UI state, and level-aware static data wiring are low-risk MVP work. Hermes should proceed after backup and verification rather than asking the user to confirm every step.

## Safe Rollback And Backup Isolation Calibration

Hermes must never provide rollback commands that begin by deleting live source directories such as `rm -rf pages data components`. Conservative rollback means preserving the current state first, then copying known backup content back into place.

### Required backup location

For project code work, backups should be stored outside the Next.js source tree whenever possible, preferably under `~/hermes-agent-backups/<project-name>-<task>-YYYYMMDD-HHMMSS/`. Avoid placing TypeScript or React backup copies inside the project root if build tools may scan them. If a project-local backup is unavoidable, use a directory clearly excluded from build scanning and do not store duplicate `.ts`, `.tsx`, `.js`, or `.jsx` files where Next.js, TypeScript, lint, or test tools may read them.

### Required conservative restore pattern

When restoring a directory or file, first move the current live version aside with a timestamp, then copy the backup into place. Example pattern:

```bash
TS="$(date +%Y%m%d-%H%M%S)"
mv pages "pages.before-restore.$TS"
cp -R "$BACKUP_DIR/pages" pages
```

For files:

```bash
TS="$(date +%Y%m%d-%H%M%S)"
if [ -f data/family.ts ]; then mv data/family.ts "data/family.ts.before-restore.$TS"; fi
cp "$BACKUP_DIR/data/family.ts" data/family.ts
```

### Prohibited restore pattern

Do not recommend this pattern:

```bash
rm -rf pages data components && cp -r backups/pages_backup pages
```

It is too destructive because it deletes current work before confirming backup integrity, and it can remove unrelated new files. Hermes should instead generate a `RESTORE.sh` file in the backup directory that uses move-aside restore semantics.

### Build validation rule

If build errors appear only in backup folders, Hermes must treat that as a backup isolation defect and fix the backup strategy. A successful workflow keeps backups outside paths scanned by `next build`, TypeScript, lint, and tests.

## Restore Script Path And Decision Autonomy Patch

Hermes must avoid writing shell examples such as `BACKUP_DIR="~/hermes-agent-backups/..."` inside scripts, because tilde expansion does not occur after `~` is stored inside a quoted variable assignment. Use `$HOME/hermes-agent-backups/...`, `${HOME}/hermes-agent-backups/...`, or compute the script directory with `BACKUP_DIR="$(cd "$(dirname "$0")" && pwd)"`.

For restore scripts, prefer this structure:

```bash
#!/usr/bin/env bash
set -euo pipefail
BACKUP_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="${PROJECT_DIR:-$HOME/family-vocab-game}"
TS="$(date +%Y%m%d-%H%M%S)"
cd "$PROJECT_DIR"
for item in pages data components; do
  if [ -e "$item" ]; then
    mv "$item" "$item.before-restore.$TS"
  fi
  if [ -e "$BACKUP_DIR/$item" ]; then
    cp -R "$BACKUP_DIR/$item" "$item"
  fi
done
```

Hermes should not ask whether to proceed with the next low-risk MVP step after the user has already authorized autonomous MVP development. For this project, creating `/battles` placeholder routing, adding Dashboard links, displaying daily challenge details, and running build/smoke validation are approved low-risk tasks if backups are outside the project tree and no dependencies, secrets, env files, production config, commits, pushes, or destructive operations are involved.

If Hermes finds itself about to ask “是否繼續” for such a low-risk step, it should instead proceed with the smallest coherent implementation stage, then report changes, validation, rollback, limitations, and training record location.
