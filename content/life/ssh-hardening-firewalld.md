+++
title = "Linux 服务器安全加固，SSH 密钥登录与防火墙配置"
description = "禁用密码登录、配置公钥认证与 firewalld 防火墙策略的完整流程"
date = 2026-09-14
[taxonomies]
tags = []

[extra]
image = "/images/id-239.jpg"
author = "编辑部"
+++

新服务器第一步是 SSH 加固：本地 `ssh-keygen -t ed25519` 生成密钥对，将公钥写入服务器 `~/.ssh/authorized_keys` 并设置 600 权限。确认密钥登录成功后，编辑 `/etc/ssh/sshd_config`：`PasswordAuthentication no`、`PermitRootLogin prohibit-password`，重启 sshd 前务必保留当前会话测试新连接，避免把自己锁在门外。

防火墙用 firewalld 时，先 `firewall-cmd --permanent --add-service=ssh` 放行管理端口，再按需放行 80/443，其他默认拒绝。若修改了 SSH 端口，除了 firewalld 还要处理 SELinux 上下文（`semanage port -a -t ssh_port_t -p tcp <端口>`），这是最常见的「改了端口连不上」的原因。

加固完成后做一轮验证：`ss -tlnp` 检查监听端口是否最小化，`lastb` 查看爆破尝试是否显著减少，`journalctl -u sshd` 确认登录日志正常。安全加固是持续过程，配合 fail2ban 与定期系统更新才能长期有效。
