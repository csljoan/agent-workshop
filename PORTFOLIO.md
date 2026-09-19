[![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)](https://github.com/csljoan/agent-workshop)

# 我的待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。它提供簡潔的待辦事項管理介面，讓使用者可以新增、整理、完成與清除日常任務，並將資料保留在瀏覽器中。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項，並限制內容長度為 100 個字元。
- 將待辦事項標記為完成或恢復為未完成。
- 逐筆刪除待辦事項。
- 依照「全部」、「未完成」與「已完成」篩選清單。
- 顯示目前未完成的待辦事項數量。
- 使用「清除已完成」一次刪除所有已完成項目，刪除前會顯示確認對話框。
- 沒有已完成項目時停用「清除已完成」按鈕，避免沒有作用的操作。
- 透過 `localStorage` 保存待辦事項與主題偏好，重新整理頁面後仍可保留資料。
- 支援淺色與深色模式，首次使用時會依照作業系統的色彩偏好設定初始主題。
- 在沒有待辦事項，或目前篩選結果為空時顯示對應提示。
- 提供基本的鍵盤操作與 ARIA 標籤，改善可近用性。
- 具備響應式版面，在較小的螢幕上也能使用。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用任何前端框架、外部套件或 CDN。
- 使用 CSS 變數管理色彩與介面樣式，並以 CSS media query 處理響應式版面與系統深色模式。
- 使用瀏覽器原生 `localStorage` 保存待辦資料與使用者的主題偏好。
- 所有資料與互動都在瀏覽器端處理，不需要後端服務。

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中，透過 GitHub Copilot Agent Mode 協助完成開發。Agent Mode 用來理解需求、探索既有程式碼、提出修改計畫、實作功能，並在修改後協助檢查結果。

開發過程也使用 MCP 連接 GitHub 相關工具，讀取 GitHub Issue、掌握需求內容，並在功能完成後建立 Pull Request。這讓需求、程式碼修改與審查流程可以在同一個工作流程中串接起來。

此外，專案使用 `.github/prompts` 中的 prompt 定義 agentic workflow，將「讀取 issue、提出計畫並等待確認、建立分支、修改、驗證、提交推送與建立 PR」拆成明確步驟。這次的功能開發也依照該流程處理，並以 issue #4 追蹤需求與變更。

## 我學到什麼

- 如何使用 Agent Mode 從需求探索到實際修改，並讓每個開發步驟保持可追蹤。
- 如何使用 MCP 讀取 GitHub Issue、建立分支與 Pull Request，串接開發與協作流程。
- 如何用原生 JavaScript 管理 DOM、事件、篩選狀態與 `localStorage` 資料同步。
- 如何在新增不可逆操作時加入確認對話框、停用狀態與 ARIA 標籤，兼顧使用體驗與可近用性。
- 如何透過 `.github/prompts` 設計可重複執行的 agentic workflow，讓需求處理順序更清楚。
