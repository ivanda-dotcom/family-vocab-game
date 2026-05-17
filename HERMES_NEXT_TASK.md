# Hermes Next Task: Dashboard MVP With Self-Training

請依照你已安裝的 self-training protocol，繼續 `family-vocab-game` 的 Dashboard MVP。這不是一般聊天任務，而是一次本機自我訓練任務。你必須自行完成規劃、備份、實作、驗證、回報與訓練紀錄，不要要求使用者轉貼 Manus 的控制提示詞。

## 目標

建立家庭英文學習網站的 Dashboard MVP，支援一家四人、不同英文程度、每日 check-in 狀態、分數、排行榜與互相激勵的第一版介面。

## 必須遵守

1. 先讀取 `HERMES.md`、`AGENTS.md`、`CLAUDE.md`、`package.json` 與現有路由架構。
2. 先判斷是 Next.js Pages Router 還是 App Router，再決定檔案位置。
3. 修改前備份將改動的檔案與資料夾，至少涵蓋 `data/` 與即將新增或修改的 Dashboard 頁面位置。
4. 不新增外部套件，除非使用者確認。
5. 不修改 secrets、env、git 設定、production config，不 commit、不 push。
6. 實作最小可行 Dashboard：四位家庭成員卡片、英文程度、今日 check-in、streak、quiz score、vocab battle score、家庭排行或鼓勵區塊。
7. 如果相關頁面尚未存在，連結可以先指向 placeholder 或 disabled state，但要清楚標示。
8. 完成後執行可用驗證，例如 lint、typecheck、test、build；如果無法執行，說明原因。
9. 任務結束後，在 `~/.hermes/training/` 寫入一份訓練紀錄，記錄本次學到的模式、失敗、驗證、下一個可改進的 skill 或 memory。
10. 最終回報必須包含：修改檔案、備份位置、回滾指令、驗證結果、已知限制、下一階段建議、訓練紀錄檔位置。

## 開始方式

請從現況偵測開始，不要直接改檔案。若發現專案架構與假設不一致，先回報再決定。

## Autonomy Calibration Addendum

You should not stop to ask whether to continue with low-risk MVP work that is already implied by this task. For this project, implementing Vocab Battle placeholder routing, Dashboard challenge progress display, static vocabulary wiring, local UI state, and validation are approved low-risk steps if you back up changed files first and avoid secrets, env, package installation, git commits, production config, and destructive operations.

Proceed autonomously through the next smallest coherent implementation stage. Ask only if you need to add dependencies, change dangerous config, perform irreversible operations, or the project structure makes the correct path genuinely ambiguous.

