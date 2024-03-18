# 318 專題

使用週刊 3.0 wide 版型 ＋ 便利貼互動功能

由於本次專案使用 next.js 的 getStaticProps 在 build time (yarn export, yarn dev 時)，就會先去拿文章的 json、便利貼的設定檔，因此若文章 json 有更動的情況下需要重新跑 yarn export + gsutil upload 等指令，這個做法的好處是 export 出來的靜態 html 本身就會有文章內容，對專題的 SEO 會有大大的加分，但專案上線前就會面臨文章不斷修改需要重複推版的狀況。

follow-up: 可能透過 terminal 的方式讓記者可以把 source code 抓下來跑 yarn export 和 gsutil upload，可能需要做成 script 方便使用。

## 週刊 3.0 wide 版型

### 已知問題

週刊 wide 版型的漢堡側欄的 scrollTo 寫法搬到靜態專題後，在 iOS 會失效 (iPad / iPhone)，點了會完全不滑，
測試過 scrollTo / window.scrollTo / scrollIntoView，在 iOS 也都會失效、點了完全不滑（其餘瀏覽器正常），
目前是改用網路建議的 requestAnimationFrame 重新改寫，但也只能 debug 到 iPad OK、iphone 會滑動但對位失準。

follow-up: 之後可以考慮改成幫 draft-renderer 的 H1, H2 加上 id，直接用 <link href="#header-${id}"/> 來進行跳轉，
在有許多 lazy load 的 embed code 情況下確保可以滑動＋滑動到對的位置 (待驗證)

## 便利貼

目前便利貼採用 google sheet 作為資料管理：

- 讀取：google sheet 產生的 json 檔， dev 透過 url 來 trigger json 更新 (見[專題文件](https://data-services-dev-ufaummkd5q-de.a.run.app/sheet_to_json?sheet_name=placeholder&bucket=v3-statics-dev.mirrormedia.mg&dest_file=json/project_318_meta.json&sheet_url=https://docs.google.com/spreadsheets/d/1YS35rZCU4AoyiPB9gH0hZ6_dtuvq_FbYVjk_bHFk2xA/edit#gid=0))，prod 一樣是拿 json，不過會有 cronjob 固定時間更新 json 檔。
- 寫入：透過週刊 3.0 的 googlesheet api 來新增，需要提供對應的 googlesheet id, sheetTitle 和各欄位對應的 object，以上三者皆為必填，若各欄位對應的 key 名稱填錯則不會新增該欄位，新增成功的該 row 會把缺失的 key 值留空，不會報錯，近一步資訊參考週刊 3.0 api 文件。

## 日後重複使用

### 文章部分(週刊 3.0 wide 版型)

待修改檔案：

新專案設定

- const/index.js 中的 `projectName` 修改成新專案的 slug 名稱
- const/wide-article.js 中的 `POST_JSON` 需要依照對應的環境修填入新的 post json 檔名
- pages/\_document.js 下修改新專案的 html meta

若要修改文章 style

- 修改文章底色： styles/global-styles

```
body {
  background: black;
  margin: 0;
}
```

- 修改其他 style: components/wide-article 下尋找對應的位置修改，ex: 修改字體顏色，在 components/wide-article/index.js `DraftWrapper` 的 styled-components 中

```
const DraftWrapper = styled.div`
  *,
  *::before,
  *::after {
    color: white;
    ${defaultPingFangFontFamily};
  }

  div[data-block='true'] {
    font-weight: 300;
  }
`
```

### 便利貼部分

待修改檔案：

新專案設定

- (寫入) 便利貼 google sheet id: const/sticky-notes.js 中 `googleSheetId`
- (寫入) 便利貼 google sheet 分頁名稱： const/sticky-notes.js 中 `googleSheetTitle` (不同環境有不同分頁)
- (拿取) 便利貼設定檔 google sheet placehodler 頁面： const/sticky-notes.js 中 `stickyNoteMetaUrl`
- (拿取) 便利貼 google sheet json: api/fetch-sticky-notes.js 中 `url` 中的檔名，目前為 `project_318_${page}.json`

p.s. 若要透過便利貼設定檔來修改便利貼預設的五種顏色，需要另外開發在透過 stikcyNoteMetaUrl 拿到的資料(build time 就會拿到) 來設定顏色，目前是寫死在 const/stikcy-notes.js 中的 `stickyNoteColors` 中，不過資料結構可以能會改變，需要同步修改對應的地方。
