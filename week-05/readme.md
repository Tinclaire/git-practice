# week-04
## 1. 網址
[https://def.nccumisoj.online/](https://def.nccumisoj.online/)

## 2. 在哪裡購買網域的
- **GoDaddy**
- 使用心得：我覺得介面操作方便，可以輕鬆的看到全部的 DNS record，對新手而言非常容易上手！

## 3. DNS 的 A record
- DNS 中最常見的記錄之一，表示一個域名對應到的 IP address
- Resource Record (RR) format: (name, value, type, ttl)
  - name: hostname (ex: `www`, `@`)
  - value: 對應的 IPv4 address (ex: `192.0.2.1`)
  - type: A (Address)
  - TTL (Time-to-Live): record 在 DNS cache 中存留的時間

## 4. DNS 的 NS record
- 指定負責解析特定域名的 authoritative DNS server
- Resource Record (RR) format: (name, value, type, ttl)
  - name: 想要設定的域名或子域名 (ex: `example.com`)
  - value: authoritative Name Server 的域名 (ex: `ns1.example.com`)
  - type: NS (Name Server)
  - TTL: 同上

## 5. Domain Name vs FQDN vs URL
- **Domain Name**
  - Definition: 網站的地址，讓大家容易記住和訪問，不須背 IP address
  - Structure:
    - Domain Name 通常由兩個或三個部分組成，點號分隔
    - Second-Level Domain (SLD): domain name 的主名稱 (ex: `example`)
    - Top-Level Domain (TLD): domain name 的最後一個部分，表示類型或國別 (ex: `.com`, `.org`, `.edu`, `.uk`)
  - Example: `example.com`
  - Note: domain name 不一定會包含子域名，如 `www`，不像 FQDN 那麼完整

- **FQDN** (Fully Qualified Domain Name)
  - Definition：FQDN 包含 hostname 和 domain name，提供了到特定 server 的完整路徑
  - Structure：
    - Hostname (ex: `www`)
    - Domain Name
  - Example：www.example.com
- **URL** (Uniform Resource Locator)
  - Definition：URL provides a way to access a resource on the internet.
  - Structure：
    - Protocol (ex: `http`, `https`)
    - FQDN
    - Port - optional (ex: `:80` for http)
    - Path (ex: `path/to/where/you/want/to/go`)
    - Query Parameters - optional (ex: `?key=value`)
    - Fragment - optional (ex: `#section`)
  - Example：https://www.example.com:443/path/to/resource?key=value#section

## 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
 - 因為 `http` 傳輸都是以 plain text 的方式，表示任何通過網路傳送的資料 (`header`, `body`) 都可以被讀懂、偷看、攔截。如果傳輸過程帶的是敏感資料，如：銀行帳戶、信用卡資料、帳號密碼等等，便會被有心人士竊取，甚至可以攔截竄改資料。
 - `https` 是在 `http` 的基礎上加上了 **SSL/TLS**，可以加密保護資料。
    - 資料加密：request 和 response 的過程中，資料都被加密。
    - 資料完整性：防止資料在傳輸過程中被修改。

## Reference:
- [DNS A Record](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-a-record/)
- [DNS NS Record](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-ns-record/)
- [網域名稱是什麼](https://www.cloudflare.com/zh-tw/learning/dns/glossary/what-is-a-domain-name/)
- [What is the difference between an FQDN and a URL?](https://www.quora.com/What-is-the-difference-between-an-FQDN-and-a-URL)