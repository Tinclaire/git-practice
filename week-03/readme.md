# week-03
## 110306065-王亭宇-資管四
- ### AWS Region & AZ
    - **Region:**
        - AWS 把其全球的基礎設施劃分成多個地理區域，稱為 Region
        - 每個 Region 都是獨立的，如果未經允許，資料不會進出到其他 Region
        - Region 由多個 AZ 組成，以提供 AWS 各項服務
        - 在使用 AWS 的服務時，都需要選擇 Region，確定執行與存放資料的位置
    - **AZ:**
        - 單或多個 data center
        - 多個 AZ 組合成一個 Region
        - 同 Region 的 AZ 彼此仍有一段距離，確保在災害發生時不會同時受到影響
        - 提供高可用性 (HA) 和容錯能力
- ### 選擇 Region 的考量
    - **Compliance and Regulation:** 是否有被政府規定資料要放在哪裡，例如: 金融與醫療資料須存放境內
    - **Distance:** 和客戶的距離，離越遠就越會有 latency
    - **Feature availability:** 有一些功能只有在特定的 Region 才有，例如: Amazon Braket
    - **Pricing:** 不同 Region 價錢不一樣，例如: 巴西因為政府對 AWS 收比較多錢，所以服務較貴