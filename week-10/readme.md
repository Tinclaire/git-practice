## week-10
### CloudWatch - EC2 Instance metrics
有很多不同功用的 metrics
- NetworkIn、NetworkOut
- CPUUtilization、CPUCreditUsage
- EBSWriteOps
- and so on…

### CloudWatch - alarm
- 建立新的 SNS Topic → 可以去 SNS console 檢查設定的 email 帳號
- 設定 trigger lambda

### Lambda
- 設定 layer
- 設定 permission: 讓 CloudWatch alarm 有 lambda:InvokeFunction 的權限

### 使用 `stress-ng` 壓測
參考指令：
- `sudo apt-get install stress-ng`
- `stress-ng --cpu 16 --timeout 180`

### Reference
- [AWS Lambda: Send a Message with Discord Webhooks](https://dev.to/josuebustos/aws-lambda-send-a-message-with-discord-webhooks-12fa)
- [在 AWS Lambda 上使用 Python 第三方套件教學](https://jumping-code.com/2021/07/28/aws-lambda-python-packages/)
- [【压力测试】ubuntu使用stress-ng做CPU, 内存及硬盘使用率测试](https://www.cnblogs.com/fireblackman/p/16747354.html)
- [Trigger AWS Lambda directly from Cloudwatch Alarm](https://medium.com/@dithya512m/trigger-aws-lambda-directly-from-cloudwatch-alarm-d9844a410e8c)