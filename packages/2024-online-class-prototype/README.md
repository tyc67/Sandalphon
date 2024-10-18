# 線上課程 Prototype
[專案索引文件](https://paper.dropbox.com/doc/prototype-epi2CTVaPzDuNkkTrHoQO)


## 前置準備
1. Node.js (`>= 18.17.0`)
2. yarn
3. gcloud CLI (登入具備寫入特定 cloud storage bucket 權限的帳戶)
4. 參考[環境變數](#環境變數)來設定 `.env.dev` (測試環境) 和 `.env.prod` (正式環境)

## 使用說明
* 安裝專案
```
yarn install
```

* 開啟 dev server
```
// 測試環境
yarn dev

// 正式環境
yarn dev:prod
```

* 輸出靜態網站
```
// 測試環境
yarn build:dev

// 正式環境
yarn build:prod
```

* 分析靜態網站的 bundle size
```
yarn analyze
```

* 部屬專案到 GCS Bucket
```
// 測試環境
yarn deploy:dev

// 正式環境
yarn deploy:prod
```


## 環境變數
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| ------ | ------ | ------ | ------ |
| NEXT_PUBLIC_ENV | `'dev'` or `'prod'` | `'dev'` | 環境設定 |
| NEXT_PUBLIC_BASE_JSON_URL | 字串 | `''` | 首頁資料的來源 |
| NEXT_PUBLIC_COURSE_JSON_URL | 字串 | `''` | 單一課程頁資料的來源 |
| NEXT_PUBLIC_COLLECTION_NAME | 字串 | `'students'` | 使用者訂購課程資料儲存的集合名稱 |
| NEXT_PUBLIC_AUTH_API_URL | 字串 | `''` | 驗證使用者資訊的後端 API URL |


## 其他說明
* undici 套件須限制在 `5.28.4` 版本，以避免[相關問題](https://github.com/nodejs/undici/discussions/3010#discussioncomment-9581353)，如果遇到該問題，建議將 `firebase` 套件重新安裝，即可解決。