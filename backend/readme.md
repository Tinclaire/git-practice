### dependencies vs devDependencies
當 `npm install` 的時候，會把套件寫入 package.json 文件裡
- dependencies:
    - `npm install --save`
    - 適用在 production 環境中
- devDependencies:
    - `npm install --save-dev`
    - 這邊的套件只適用在 develope 環境中

### scripts
- 可以快速執行特定指令，讓開發者不用記住或輸入很長的命令，簡化開發流程
- format: `"scripts name": "your command"`
- 使用方法：
    - 假設在 package.json 中設有 `"start": "node app.js"` 的 scripts
    - `npm start` 的時候，便會執行 `node app.js`

### 設定環境變數
1. `npm install dotenv`
2. 新增一個 `.env` 檔案
3. 在 `.env` 裡設定 port number ( `PORT=3000` )
4. 在想要使用 `PORT` 這個環境變數的檔案中
    1. 加入 `require('dotenv').config()`
    2. 使用 `process.env.PORT` 來存取環境變數

### 哪些檔案不該被放上 github repo
- **機密或敏感資料：**如 API key、密碼、資料庫連接等，這些應放入 `.env` 等環境變數文件中，並加入 `.gitignore` 中，防止意外上傳。
- **node_modules/：**這類檔案通常很龐大且可以透過 `npm install` 重新產生，因此不必上傳至 github repo 中，避免浪費空間和增加不必要的版控。
- **Log 檔案：**開發過程中產生的 log 檔案，通常是為了追蹤執行狀態，與實際程式碼無直接關聯。

**結論：**上傳 github repo 的時候，應避免上傳敏感資訊、可以自行產生的 dependencies、臨時性的紀錄檔案、與程式碼無關的檔案。

### CJS vs ESM
- CJS - CommonJS
    - 用 `module.exports` 或 `exports` 定義導出內容
    - 用 `require` 導入模塊
    
    ```jsx
    // helloWorld.js
    exports.hi = function () {
      return 'Hello World!';
    }
    
    // main.js
    const helloWorld = require('./helloWorld.js');
    console.log(helloWorld.hi()); // output: Hello World!
    ```
    
- ESM - ES Modules
    - `export` 導出模塊
        - 支援 `export default` 設定預設的導出
    - `import` 導入模塊
    - 需在 package.json 中設定 `"type": "module"`
    
    ```jsx
    // helloWorld.js
    export function hi() {
      return 'Hello World!';
    }
    
    // main.js
    import { hi } from './helloWorld.js';
    console.log(hi()); // output: Hello World!
    ```

### What is localhost?
是一個指向本機電腦的域名，對應的 IP address 為 `127.0.0.1`，可以理解成是「自己的電腦」。可以在 localhost 進行網站、API 開發或測試，不需連接到外部網路。

### What is curl?
- curl 是透過多種網路傳輸協定 (如 HTTP, HTTPS) 與 URL 進行互動的 CLI
- 指令格式：`curl [options] [URL]`
- 常用指令和參數：
    
    ```bash
    -X/--request [GET|POST|PUT|DELETE|PATCH]  使用指定的 http method 來發出 http request
    -H/--header                               設定 request 裡所攜帶的 header
    -i/--include                              在 output 顯示 response 的 header
    -d/--data                                 攜帶 HTTP POST Data
    -v/--verbose                              輸出更多的訊息方便 debug
    -u/--user                                 攜帶使用者帳號、密碼
    -b/--cookie                               攜帶 cookie（可以是參數或是檔案位置）
    ```
    
    - GET
        ```curl -X GET "http://www.example.com/api/resources"```
        
    - POST
        ```curl -X POST -H "Content-Type: application/json" -d '{"status" : false, "name" : "Jack"}' "http://www.example.com/api/resources"```
        
    - PUT
        ```curl -X PUT -H "Content-Type: application/json" -d '{"status" : false }' "http://www.example.com/api/resources"```
        
    - DELETE
        ```curl -X DELETE "http://www.example.com/api/resources/1"```

### Reference
- [dependencies 與devDependencies 的區別](https://dotblogs.com.tw/gra/2018/01/15/224301)
- [【程式語言 - Javascript】 ESM與CJS](https://vocus.cc/article/649cc0e0fd89780001a7d34d)
- [Linux Curl Command](https://medium.com/@asdasd_777/linux-curl-command-1eb72b373879)