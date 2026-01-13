# 1. 使用轻量级的 Node.js 基础镜像 (LTS 版本)
FROM node:20-alpine

# 2. 设置容器内的工作目录
WORKDIR /app

# 3. 将当前目录下的 index.js 复制到容器的 /app 目录
COPY index.js .

# 4. 如果你有 package.json，请取消下面两行的注释：
# COPY package.json .
# RUN npm install

# 5. 容器启动时执行的命令
CMD ["node", "index.js"]
