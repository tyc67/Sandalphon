# 線上課程 Prototype
[專案索引文件](https://paper.dropbox.com/doc/prototype-epi2CTVaPzDuNkkTrHoQO)

## 環境變數
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| ------ | ------ | ------ | ------ |
| NEXT_PUBLIC_ENV | `'dev'` or `'prod'` | `'dev'` | 環境設定 |
| NEXT_PUBLIC_BASE_JSON_URL | 字串 | `''` | 首頁資料的來源 |
| NEXT_PUBLIC_COURSE_JSON_URL | 字串 | `''` | 單一課程頁資料的來源 |
| NEXT_PUBLIC_COLLECTION_NAME | 字串 | `'students'` | 使用者訂購課程資料儲存的集合名稱 |


## 其他說明
* undici 套件須限制在 `5.28.4` 版本，以避免[相關問題](https://github.com/nodejs/undici/discussions/3010#discussioncomment-9581353)，如果遇到該問題，建議將 `firebase` 套件重新安裝，即可解決。