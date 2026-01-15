const http = require('http');

const PORT = 23000;

const server = http.createServer((req, res) => {
    let body = [];

    // 1. 监听 data 事件，接收数据流
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    // 2. 数据接收完毕
    req.on('end', () => {
        // 将 Buffer 拼接并转为字符串
        body = Buffer.concat(body).toString();

        const timestamp = new Date().toISOString();
        
        console.log('------------------------------------------------');
        console.log(`[${timestamp}] 收到请求:`);
        console.log(`> Method  : ${req.method}`);
        console.log(`> URL     : ${req.url}`);
        console.log(`> Headers :`, req.headers);

        if (body) {
            try {
                const jsonBody = JSON.parse(body);
                console.log('> Body (JSON):', jsonBody);
            } catch (e) {
                console.log('> Body (Raw) :', body);
            }
        }

        // 返回响应
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Received' }));

        // 解析url query 参数
        // wx: https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=
        const url = new URL(req.url, `http://${req.headers.host}`);
        const params = new URLSearchParams(url.search);
        const wx_token = params.get('wx_token');
        const title = params.get('title');
        if (wx_token != null && title != null) {
            console.log('> wx_token:', wx_token);
            console.log('> title:', title);
            console.log('> Query Params:', Object.fromEntries(params));
            // notion
            // https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx
            // 解析body
            // 尝试解析notion_url const notion_url = jsonBody.data.url
            let notion_url=null
            try {
                const jsonBody = JSON.parse(body)
                notion_url = jsonBody.data.url
            } catch (e) {
                console.log('> notion_url is -- null');
            }     
            
            const content = `${title} \n url:${notion_url?notion_url:""}`
            const wxurl = new URL(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${wx_token}`);
            const wxbody = {
                "msgtype": "text",
                "text": {
                    "content": content
                }
            };
            
            // 发起请求
            fetch(wxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wxbody)
            }).then(response => {
                console.log('> wx response:', response);
            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('> wx_token or title is -- null');
        }
        
    });
});

server.listen(PORT, () => {
    console.log(`📦 原生服务已启动: http://localhost:${PORT}`);
});
