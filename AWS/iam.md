# IAM

免費服務，用來控管可存取的 AWS 資源

root user: 具備無敵權限，通常用來建立 IAM user
iam user: 日常維運使用者或應用程式

## [SES](https://docs.aws.amazon.com/zh_tw/ses/latest/DeveloperGuide/control-user-access.html)

僅限於在網域 example.com 中的收件人地址

```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Effect":"Allow",
      "Action":[
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource":"*",
      "Condition":{
        "ForAllValues:StringLike":{
          "ses:Recipients":[
            "*@example.com"
          ]
        }
      }
    }
  ]
}
```

## Reference

- [Terms](https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html#intro-structure-terms)
- [AWS Services That Work with IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [IAM Policy Simulator](https://policysim.aws.amazon.com/home/index.jsp)
