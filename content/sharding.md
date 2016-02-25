# 分片Sharding


## 什么是分片

在Mongodb里面存在另一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。

当MongoDB存储海量的数据时，一台机器可能不足以存储数据也足以提供可接受的读写吞吐量。这时，我们就

可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

## 为什么用分片

* 复制所有的写入操作到主节点
* 延迟的敏感数据会在主节点查询
* 单个副本集限制在12个节点
* 当请求量巨大时会出现内存不足。
* 本地磁盘不足
* 垂直扩展价格昂贵

## 分片原理

下图展示了在MongoDB中使用分片集群结构分布：

![sharding](https://docs.mongodb.org/manual/_images/sharded-cluster-production-architecture.png)

上图中主要有如下所述三个主要组件：
* **Shard** 用于存储实际的数据块，实际生产环境中一个shard server角色可由几台机器组个一个relica set承担，防止主机单点故障
* **Config Server** mongod实例，存储了整个 ClusterMetadata，其中包括 chunk信息。
* **Query Routers** 前端路由，客户端由此接入，且让整个集群看上去像单一数据库，前端应用可以透明使用。
