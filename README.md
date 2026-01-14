# notion_webhook_convert_wechat

docker 地址 https://hub.docker.com/repository/docker/dddddongyang/notion_webhook_wechat_webhook_bridge/general
端口 23000

```
docker run -d \
  --name notion_bridge \
  --restart always \
  -p 23000:23000 \
  dddddongyang/notion_webhook_wechat_webhook_bridge
```


notion自动化 支持 webhook ，可以转发到企业微信群消息webhook机器人

notion webhook 内容填： https://yourhost:23000?name=xxxxwx_token=xxxx  
1. name 填写自定义内容
2. wx_token 如下，填写企业微信群组 消息机器人的 key

获取 企业 wechat 消息机器人 https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxx (与上述 wx_token 一致)  
