# 使用官方 Node.js 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余的项目文件
COPY . .

# 构建 Next.js 项目
RUN npm run build

# 暴露端口（默认为 3000）
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
