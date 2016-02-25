# 分片


## 简介

### 什么是分片

分片(Sharding)是一种MongodB的集群技术，用以支持特别大的数据及以及非常高的吞吐操作。可以满足MongoDB数据量大量增长的需求。

当MongoDB存储海量的数据时，一台机器可能不足以存储数据也足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

### 分片目的

单台服务器能够支持的数据量和吞吐量都是有限的，过高频度的查询会耗尽服务器的CPU资源，而过大数据的存储量会好景服务器的存储资源。

为了达到scaling的目的，数据系统有两种技术：**vertical scaling**和**分片(sharding)**

**vertical scaling** 为服务器添加更多的CPU和存储以增加服务器的能力。但是这种方法是有限度的，而且成本和性能并不能成正比。 所以，vertical scaling是有一个最大限度的。

**分片sharing** 分片技术分解数据集并将数据分别放在多个服务器(shards)上，每个shard是一个独立的数据库，而总体又可以组成一个逻辑上数据库。

![shard](https://docs.mongodb.org/manual/_images/sharded-collection.png)

通过分片技术可以解决高吞吐量和大数据集的问题
* 分片减少了单个shard上的操作数量。当集群变大时，每个shard需要操作的数量是减少的。相应地，集群可以达到水平扩张的目的。
* 分片减少了单个服务器上的存储量。如上图所示，原来1T的数据，分成4个shards以后，每个片只需要保存256G即可。


### 分片结构

下图展示了在MongoDB中使用分片集群结构分布：

![sharding](https://docs.mongodb.org/manual/_images/sharded-cluster-production-architecture.png)

上图中主要有如下所述三个主要组件：
* **Shard** 用于存储实际的数据块。 在实际生产环境中，每个shard都应该是一个复制集。
* **Router** mongos实例，接受客户端的请求并将操作路由到特定的shard上，最终将shard返回的结果返回给客户端。 一个集群可以有多个mongos以分解请求的负载。
* **Config Server** 保存集群的元数据(metadata)，保存了从数据集到shard的映射关系。查询路由mongos利用这些元数据来决定具体的shard。


## 分片集群组成

分片集群由Shards，mongos和Config Server组成。

### Shards

Shard是保存整个分片集群子数据集的mongod实例或复制集。所有shard的数据在一起组成了集群所有的数据。

在生产环境下，每个shard都应该是一个复制集，通过复制集保证每个shard的高可用和冗余。

### Config Server

配置服务器保存分片集群的元数据，将chunks映射到shards上。 配置服务器自身也应该配置成复制集。

### mongos

mongos将客户端程序的读写路由到特定的shard上，这些程序不直接读写shard。

![mongos](https://docs.mongodb.org/manual/_images/sharded-cluster.png)

## 生产环境集群架构

在生产环境下部署分片集群，必须要确保数据的冗余和系统的高可用。一个生产集群必须具有如下组成

* **配置服务器Config Server**
  一般配置服务器也按照复制集来部署，他必须运行WiredTiger存储引擎。配置服务器不可以在多个分片集群之间共享，每个翻盘集群需要独占式地使用配置服务器。

* **2个以上复制集Shard**
  至少2个以上的shard才可以形成分片集群，每个shard都是一个复制集。

* **1个以上mongos**
  mongos是集群的路由，支持部署情况下，每个应用服务器都可以使用一个mongos的实例。由于每个mongos内部的游标和资源都是独立的，所以每个客户端只能与一个特定的mongos实例交互。
 
![prdshard](https://docs.mongodb.org/manual/_images/sharded-cluster-production-architecture.png)






-
