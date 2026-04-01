---
hide_table_of_contents: true
---

# 限价单

## 操作指南

![Limit Order Interface](/pendle-docs/imgs/AppGuide/limit_order.png "Limit Order Interface")
1. 选择目标资产并切换至「**限价**」("Limit") 标签页
2. 输入为限价单预留的资产数量（注意：为保持订单有效，你的余额不应低于此处设置的数量）
3. 输入目标 Implied APY 和订单到期时间（注意：订单在到期时间后不再执行）
4. 批准并提交签名
5. 订单状态将显示在页面底部的「**我的活跃订单**」("My Active Orders") 表格中

![Order Table](/pendle-docs/imgs/AppGuide/order_table.png "Order Table")
1. 若要取消订单，点击右侧的红色垃圾桶图标
2. 订单成交状态将在表格中显示，直至到期日，之后将移至「**我的历史订单**」("My Order History") 表格

## 多签钱包操作指南

**请在整个挂单过程中，始终同时保持 Pendle 限价单页面标签和 Safe Wallet 页面标签处于打开状态。**

1. 点击 Pendle App 右上角的「Connect Wallet」连接钱包。

  ![Click Conncect Wallet](/pendle-docs/imgs/AppGuide/limit-order-multisig/1.click-connect-wallet.png "Click Conncect Wallet")

2. 选择「WalletConnect」。

  ![Choose WalletConnect](/pendle-docs/imgs/AppGuide/limit-order-multisig/2.click-walletconnect.png "Choose WalletConnect")

3. 复制弹窗中的配对码。

  ![Copy pairing code](/pendle-docs/imgs/AppGuide/limit-order-multisig/3.click-copy-pairing-code.png "Copy pairing code")

4. 在 Safe Wallet 首页，点击「Use WalletConnect」。

  ![Click use WalletConnect](/pendle-docs/imgs/AppGuide/limit-order-multisig/4.click-use-walletconnect.png "Click use WalletConnect")

5. 在弹窗表单中粘贴步骤 3 中复制的配对码。

  完成此步骤后，你的 Pendle App 已连接至 Safe Wallet。

  ![Patse pairing code to Safe Wallet app](/pendle-docs/imgs/AppGuide/limit-order-multisig/5.patse-pairing-code.png "Patse pairing code to Safe Wallet app")

6. 下单。

  ![Place the limit order](/pendle-docs/imgs/AppGuide/limit-order-multisig/6.place-order.png "Place the limit order")

7. 确认订单并点击「Place Order」。

  ![Review the order](/pendle-docs/imgs/AppGuide/limit-order-multisig/7.review-the-order.png "Review the order")

8. 点击步骤 7 中的「Place Order」后，Safe Wallet 标签页将弹出提示，要求你签署订单消息并收集其他签名人的签名。点击「Sign」按钮签署消息，并从其他签名人处收集所需签名。

  收集到足够签名后，订单将在几秒内提交至 Pendle 限价单系统。

  ![Signed message pop up](/pendle-docs/imgs/AppGuide/limit-order-multisig/8.signed-message-pop-up.png "Signed message pop up")

  ![Sign the message](/pendle-docs/imgs/AppGuide/limit-order-multisig/9.sign-the-message.png "Sign the message")


**请在整个挂单过程中，始终同时保持 Pendle 限价单页面标签和 Safe Wallet 页面标签处于打开状态。**


## 常见问题

**为什么 AMM 即期 APY 与订单簿最优报价之间差距较大，但却没有发生套利？**

套利机器人在决定是否操作时会综合计算 AMM 和订单簿的手续费。只有两者之间的价差超过双边总手续费时，套利才有利可图。例如，若订单簿手续费为 0.2%，AMM 手续费为 0.15%，则仅当价差超过 0.35% 时才会发生套利。低于此阈值时，扣除手续费后套利无利可图，因此不会发生套利。

**为什么我的兑换只有约 90% 路由经过订单簿，即使订单簿提供更优价格？**

这是设计使然。每笔兑换都有一小部分始终路由经过 AMM 作为安全缓冲。订单簿执行有时会产生零头——太小无法继续处理的极小余量。若没有 AMM 兜底，这些零头要么需要退还给你（需要额外兑换），要么被销毁。通过将一小部分路由经过 AMM，所有资金都能得到充分利用，因为 AMM 始终提供连续的流动性。
