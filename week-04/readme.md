# week-04
## 1. Public IP
43.207.152.234

## 2. instance type
可以依照需求，選擇不同的 instance type。
每個 instance type 有不同的 CPU、記憶體、storage、bandwidth 的 hardware 配置。

## 3. Nginx
Nginx 是開源的 web server

### 用途：
- 處理 HTTP request
- HTTP caching
- Reverse Proxy: 在 server 和 client 之間傳遞訊息
- Mail Proxy
- Load Balancer
### 特性：
- 可以處理大量的同時連線
- 記憶體消耗低
- 支援 Gzip 和 cache，減少 data 大小、縮短傳遞時間

## 4. pm2
- 一個 node 的 process manager
- 功能
  - 自動重啟
  - load balance
  - 最大化使用 cpu
  - 多 process，可提升處理 request 的速度
  - `pm2 monit` 監控 process，提供重啟次數、cpu 用量、memory 用量等多種資訊

## 5. Proxy
- **Forward Proxy**
  - send request: client -> Forward Proxy -> server
  - 隱藏 client 的 IP，server 不會知道 request 從哪裡來
  - 突破溝通限制: 可以透過 forward proxy 來連本來連不到的網站
  - caching 加速回應
- **Reverse Proxy**
  - send response: server -> Reverse Proxy -> client
  - 隱藏 server 的 IP，client 不知道 response 從哪來
  - load balance
  - 資訊安全: 避免外部直接攻擊 servers
  - caching

## 6. nginx.conf
```
 server {
        listen 80;
        listen [::]:80;
        server_name 43.207.152.234;

        location / {
                proxy_pass http://localhost:3000;

                proxy_http_version 1.1;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```
## 7. Security Group
- 虛擬防火牆
- 控制 EC2 的傳入和傳出
- inbound default: deny all
- 需要設定 type (HTTP, UDP...), protocol, port range, IP...

## 8. What is sudo? When should we use sudo?
### sudo = Super User DO
當加了 **sudo** 在指令前面，表示這個指令是 **root user** 執行的

- **使用 sudo 的情況：**
  - 更改網路設定
  - 查看 key
  - 改系統設定
  - install or uninstall

## 9. Nginx log
### 我在 nginx.conf 裡看到：
- error_log /var/log/nginx/error.log
- access_log /var/log/nginx/access.log

### 查看 log：
- **tail:** 可以看到最近幾則 log
    ```bash
    tail -n 20 -f /var/log/nginx/access.log

    // -n 設定最近 n 則
    // -f 會持續顯示新的 log
    ```
- **less:** 看到完整的 log (press q to leave)
    ```bash
    less /var/log/nginx/access.log
    ```
## 10. Problem
無

## 設置過程
1. 創建 EC2 instance
    - 到 security group add inbound rule: type HTTP, port 80
2. connect to instance through SSH client
    ```bash
    chmod 400 "key-pair-name.pem" // 確保只有 owner 可以讀
    ssh -i "key-pair-name.pem" ubuntu@ec2-public-dns
    ```
3. 進入 linux 後更新 OS 和套件
    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    ```
4. install Nginx
    ```bash
    // install
    sudo apt install nginx -y

    // check nginx is active or not
    sudo systemctl status nginx
    ```
5. install Node.js
    ```bash
    // install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.bashrc

    // install node.js with nvm
    nvm install --lts

    // 檢查是否成功下載
    node --version
    npm --version
    ```
6. git clone remote repo
    ```bash
    // install git
    sudo apt install git -y

    // clone
    git clone 'remote repo'
    ```
7. conduct Express server with pm2
    ```bash
    // install pm2
    npm install pm2 -g

    // install dependencies of Express project
    cd git-practice/backend/
    npm install

    // run app.js *remember to add .env file
    pm2 start app.js

    // check everything good or not
    pm2 logs app
    ```
8. set Nginx.conf
    ```bash
    // 在 nginx.conf 的 http 裡多設定 server
    sudo nano /etc/nginx/nginx.conf

    // restart nginx
    sudo systemctl restart nginx
    ```

## Reference
- [官方文件: Get Started with Amazon EC2 - Step 2: Connect to your instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-connect-to-instance)
- [官方文件: Tutorial: Setting Up Node.js on an Amazon EC2 Instance](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
- [Day4. Linux 用 pm2 來管理伺服器](https://ithelp.ithome.com.tw/m/articles/10214173)
- [How To Configure Nginx as a Reverse Proxy on AWS EC2 Instance](https://medium.com/@mudasirhaji/how-to-configure-nginx-as-a-reverse-proxy-on-aws-ec2-instance-270736ca2a50)
- [Nginx Logging: A Comprehensive Guide](https://betterstack.com/community/guides/logging/how-to-view-and-configure-nginx-access-and-error-logs/)
- [好 pm2，不用嗎？](https://medium.com/learn-or-die/%E5%A5%BD-pm2-%E4%B8%8D%E7%94%A8%E5%97%8E-fc7434cc8821)
- [用人類語言跟你說甚麼是正向代理(Forward Proxy)和反向代理(Reverse Proxy)](https://www.pressplay.cc/project/F720CEB1D6057D7ABB5614722AB18FFF/articles/660A57208C29FF94453548ED21F284EF)
- [三分鐘快速了解 Linux sudo 指令是什麼！](https://yhtechnote.com/linux-sudo/)
