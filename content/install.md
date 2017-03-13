# 安装

## 安装

首先

```
$ sudo brew install mongo
$ sudo mkdir -p /data/db
$ sudo chown -Rv <username> /data/db
```

然后可以通过命令行启动mongo

```
$ mongod
```

## 服务运行

```
$ brew services start mongo
```