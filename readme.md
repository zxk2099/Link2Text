# <div align="center">取消超链接 Link2Text</div>
长按`<a>`元素超链接取消超链接，并提供一个额外的新的`↺`按钮以恢复原超链接。
## 安装后尝试一下：<a href="https://github.com/zxk2099/Link2Text">长按我1秒钟</a>
## 下载
<img alt="Favicon" src="https://www.faviconextractor.com/favicon/greasyfork.org?larger=true" /><a href="https://greasyfork.org/zh-CN/scripts/530665">取消超链接 - Greasy Fork</a>

## 问题
+ 恢复按钮显示不全或不显示
  + 部分父级元素`overflow:hidden`样式限制内部元素显示
  + 网站动态变更元素尺寸或位置
+ 在Edge中Bing搜索结果无效：可能在Edge中有特殊优化
## 更新记录
### `2025/03/24` v1.2
+ [修复]与`Text To Link`脚本的冲突。
+ [优化]临时保存原超链接样式，恢复时保持原样式不变。
+ [优化]调整恢复按钮的位置和色彩。
