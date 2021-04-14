# [AWS CLI](https://docs.aws.amazon.com/zh_tw/cli/latest/userguide/cli-chap-welcome.html)

設定來源

- CLI
- 環境變數
- CLI 設定檔
- Shared Credential 設定檔

設定檔預設位於 `~/.aws/config`

## Credentials

- 環境變數
- Shared Credential File
- CLI 設定檔

## Shared Credentials File

設定檔預設位於 `~/.aws/credentials`，檔案格式為 INI，僅能設定 `aws_access_key_id`, `aws_secret_access_key`, `aws_session_token`

## 使用說明

```shell
aws help
aws ec2 help
aws ec2 describe-instances help
```

## Note

- [Command Complete](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html) version 2 only
- [CLI reference](https://docs.aws.amazon.com/cli/latest/reference/)
