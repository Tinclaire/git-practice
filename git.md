## Introduction to Git objects, branch, and head.

Git 中的核心 objects 包括 **blob**、**tree** 和 **commit**，每個 object 都會有一個 SHA-1 hash value（約 20 bytes, 40 個 16 進位的字元），這些 hash value 可以用來觀察 objects。

### 1. **Blob**

- **Blob** 只存檔案的純內容，不包括檔案的 metadata（如創建日期、檔名）。
- 即使兩個檔案名稱不同，但只要內容相同，兩者會共用相同的 SHA-1 hash。

### 2. **Tree**

- **Tree** 類似 file-system 中的 directory，記錄了檔案結構及檔名。
- Tree 會透過 SHA-1 hash 指向 blob 或其他 tree。
- 只要指向的 blob 和 tree 相同，tree 的 SHA-1 hash 也會是一樣的。

### 3. **Commit**

- **Commit** 是當前 tree 的快照，指向 root tree（類似 file-system 的根目錄）。
- Commit 除了指向 tree 外，還存有 metadata，包括 committer、commit message、author，以及一個或多個 parent commit（previous snapshots）。
- 不同的 commit 儘管指向的 tree 相同，但如果 metadata（例如 committer、commit time）不同，commit 的 SHA-1 hash 也不會相同。
- **每次 commit 儲存的是整個檔案快照**，不僅僅是與 previous commit 的差異。
- **Commit Workflow** - 以更新一個檔案為例：
    1. **更改檔案內容**：
        - 當改變了某個 blob 的內容時，Git 會產生新的 blob、新的 SHA-1 hash。
    2. **更新 Tree**：
        - 當某個 blob 被更新後，指向這個 blob 的 tree 也會跟著更新，並拿到新的 SHA-1 hash。
    3. **沒有變的 Objects**：
        - 沒有變動的 blob 和 tree 會保持原本的 SHA-1 hash。
    4. **Snapshot**：
        - 雖然看似每次 commit 都儲存了整個 file-system 的 snapshot，但實際上，Git 對於未變更的 objects，會直接指向他們的 hash value，這樣可以避免重複儲存未改變的內容，節省儲存空間。
        - commit 裡的 metadata 就多了 commit parent，可以觀看版本歷史。

### 4. **Branch**

- **Branch** 是一個指向 latest commit 的 named reference。
- `git branch` 時，便多了一個指向當前 commit 的 pointer。

### 5. Head

- **Head** 指向 branch，是 Git 用來知道目前在哪個 branch 上的一個 pointer。
- `git checkout` 時，head 會指向切換到的 branch。
## Git 操作與 `.git` 資料夾觀察

1. **初始化 Git 儲存庫**
    - 執行 `git init` 後，會生成 `.git` 資料夾，其中包含以下子資料夾：
        - `hooks/`：有很多 `.sample` 的腳本範例。
        - `info/`：存放 `exclude`。
        - `objects/`：包含 `info/` 和 `pack/`，此時都還是空的。
        - `refs/`：內含 `heads/` 和 `tags/`。
2. **git add 並檢查 object**
    - `git add hello.txt` 後，我發現 `.git/objects/` 資料夾裡面多了一個 `e9/` 資料夾，底下有個檔名 `65047ad7c57865823c7d992b1d046ea66edf78` 的檔案，folder 和 filename 可以組合成一個 SHA-1 hash。
    - 用 `git cat-file` 查看 object：
        - `git cat-file -t e96504`：結果顯示它是一個 blob。
        - `git cat-file -p e96504`：顯示內容為 `Hello`。
3. **提交變更**
    - 接著 `git commit -m "add hello.txt"`，我發現在 `.git/` 下多了以下檔案和資料夾：
        - `COMMIT_EDITMSG`：裡面記錄我剛剛的 commit message - `add hello.txt`。
        - `logs/`：內含 `HEAD` 和 `refs/heads/master`，這兩個檔案都記錄了剛剛的 commit SHA-1 hash。
    - `.git/objects/` 裡也多了兩個資料夾 `8c/` 和 `f2/`
        - 檢查 `8c3c7f`：
            - `git cat-file -t 8c3c7f`：結果顯示它是一個 tree。
            - `git cat-file -p 8c3c7f`：顯示內容為
                
                ```sql
                100644 blob e965047ad7c57865823c7d992b1d046ea66edf78    hello.txt
                ```
                
        - 檢查 `f21a`：
            - `git cat-file -t f21a`：結果顯示它是一個 commit。
            - `git cat-file -p f21a`：顯示內容為
            
            ```sql
            tree 8c3c7fbcd903744b20fd7567a1fcefa99133b5bc
            author tintin <abctintin0504@gmail.com> 1726310340 +0800
            committer tintin <abctintin0504@gmail.com> 1726310340 +0800
            
            add hello.txt
            ```
            
4. **新增另一個檔案並 commit**
    - 新增 `hello2.txt`，內容與 `hello.txt` 都是 `Hello`，並執行 `git add hello2.txt` 和 `git commit -m "add hello2.txt"`。
    - 檢查 `.git/objects/`，發現多了 `a9/` 和 `b5/` 資料夾。
        - 檢查 `a9e9`：
            - `git cat-file -p a9e9`：可以發現多了 `parent`，並指向 previous commit。
            
            ```sql
            tree b57d5cc78db65842ea640fd2ad80c8eea425e8ea
            parent f21a310eebacdbab99707c91831a348f5f8c2765
            author tintin <abctintin0504@gmail.com> 1726312086 +0800
            committer tintin <abctintin0504@gmail.com> 1726312086 +0800
            
            add hello2.txt
            ```
            
        - 檢查新的 tree `b57d`：
            - `git cat-file -p b57d`：可以發現兩個檔案共用相同的 blob，因為檔案內容一樣。
            
            ```sql
            100644 blob e965047ad7c57865823c7d992b1d046ea66edf78    hello.txt
            100644 blob e965047ad7c57865823c7d992b1d046ea66edf78    hello2.txt
            ```
            
5. **建立與切換分支**
    - `git branch test`，發現 `.git/refs/heads/` 裡面多了一個 `test` 分支。
    - 此時 `.git/HEAD` 的內容仍是 `ref: refs/heads/master`。
    - 使用 `git checkout test` 切換分支後，檢查 `.git/HEAD`，內容變成了 `ref: refs/heads/test`。

### 結論

- **Git 物件生成與儲存**
    - 在 `git add` 或 `git commit` 之後，Git 會在 `.git/objects/` 資料夾內生成對應的 object，這些 object 的檔案夾名稱與檔案名稱合併後，構成該 object 的 SHA-1 hash。
    - 舊的 object 不會被刪除，即使檔案被更新或有新的 commit，過去的 object 仍然會保留在 `.git/objects/` 中。
- **Commit 的 parent 關係**
    - 除了第一個 commit 外，之後的每次 commit 都會有一個 parent，指向上一個 commit，讓 Git 可以版控。
- **Branch and Head**
    - 當建立新的分支後，`.git/refs/heads/` 會新增對應的 branch。
    - 切換分支後，`.git/HEAD` 會隨之更新，指向當前所在的 branch。
## How to write a commit message

**要可以一眼看出種類、這個 commit 做了什麼**

Format:

```bash
Header: <TYPE>(<SCOPE>): <SUBJECT>

- TYPE: commit 的種類，feat, fix, docs, style, refactor, test, chore 等等。

- (Optional) SCOPE: commit 影響的範圍，database 等等

- (Required) SUBJECT: commit 的簡短描述，盡量一個 commit 一個主題

Body:

- 詳細描述改動的內容，What, Why, How

Footer:

- 可以寫 issue number

- (optional) BREAKING CHANGE: 紀錄不相容的變動，描述變動的原因、migration
```
## Reference

- [Git Internals - Git Objects](https://youtu.be/MyvyqdQ3OjI?si=OxZ0ZUuwOGfdFc4V)
- [Git Internals - Branches](https://youtu.be/mhZQRBp8dXE?si=yWs4vdTM1aXEYRTX)
- [什麼是Git物件?](https://medium.com/@flyotlin/什麼是git物件-ebbeb3b22f9c)
- [Git Commit Message 到底怎麼寫才優美?](https://medium.com/@1chooo/git-commit-message-到底怎麼寫才優美-5b789157b549)
