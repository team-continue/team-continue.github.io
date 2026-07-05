---
title: CoRE 2026 ソフトウェア
project: core2026
section: software
summary: ROS 2ベースの自律移動・自動照準ソフトウェア。LiDARによる自己位置推定から射撃制御までをノードで構成。
tags: [ROS 2, LiDAR, 自律移動, 自動照準]
order: 3
---

## ソフトウェア全体構成

CoRE 2026 では、上位 PC 上の ROS 2 ノード群と STM32 ファームウェアの 2 層構成に刷新しました。自己位置推定・経路計画・照準は ROS 2 側、モータ制御などのリアルタイム処理はファームウェア側が担当します。

## 使用OS・フレームワーク

- OS: Ubuntu 22.04
- フレームワーク: ROS 2 Humble
- ファームウェア: C++ (STM32)

## ROS 2構成 (ノード構成)

- `local_costmap_builder` — LiDAR スキャンから局所コストマップを生成
- `path_planner` — コストマップ上で目標地点までの経路を計画
- `path_follower` — 計画経路に追従する速度指令を生成
- `body_controller` — 速度指令を制御基板へ送信し、オドメトリを配信
- `shooter` — カメラ画像からターゲットを認識し、ジンバル角と発射を制御

## トピック構成

- `/scan` — LiDAR スキャン
- `/local_costmap` — 局所コストマップ
- `/planned_path` — 計画経路
- `/cmd_vel` — 速度指令
- `/odom` — オドメトリ
- `/target_pose` — 照準ターゲット位置

## TF構成

`map → odom → base_link → lidar_link / camera_link / gimbal_link` のツリーで管理しています。

## 自己位置推定

LiDAR スキャンマッチングとホイールオドメトリ・IMU の融合により推定します。

## 経路計画・制御

局所コストマップ上でのグリッドベース探索により経路を生成し、`path_follower` が Pure Pursuit ベースの追従制御を行います。

## UI / GUI

オペレータ用に Web ベースの操作 UI を開発中です。ロボットの状態・コストマップ・カメラ映像を一画面で確認できます。

## シミュレータ

フィールドを模した Gazebo 環境で、自律移動と照準ロジックを実機なしで検証しています。

## 開発環境

- Ubuntu 22.04 + ROS 2 Humble
- Docker による開発環境の統一
- GitHub + CI によるビルド検証

## GitHubリポジトリ

ソースコードは [GitHub](https://github.com/team-continue) で公開しています。
