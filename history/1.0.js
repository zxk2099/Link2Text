// ==UserScript==
// @name         取消超链接 Link2Text
// @namespace    link_to_text
// @version      1.0
// @description  长按<a>元素超链接取消超链接
// @author       zxk2099
// @icon         https://github.com/zxk2099/Link2Text/icon.png
// @downloadURL  https://github.com/zxk2099/Link2Text/main.js
// @updateURL    https://github.com/zxk2099/Link2Text/main.js
// @supportURL   https://github.com/zxk2099/Link2Text/issues
// @match        *://*/*
// ==/UserScript==

(function () {

    // 在此更改长按时间（毫秒）
    const longPressTime = 1000;

    let pressTimer = null,targetLink = null;
    const savedLinks = new Map();
    let linkCounter = 0;

    document.addEventListener('mousedown', (event) => {
        const linkElement = event.target.closest('a');
        if (linkElement) {
            event.preventDefault();
            targetLink = linkElement;
            pressTimer = setTimeout(() => {
                replaceLinkWithText(targetLink);
            }, longPressTime);
        }
    });

    document.addEventListener('mouseup', () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
            targetLink = null;
        }
    });

    document.addEventListener('mouseleave', () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
            targetLink = null;
        }
    });

    const replaceLinkWithText = (linkElement) => {
        const linkId = `link-${linkCounter++}`;
        const attributes = {};
        for (const attr of linkElement.attributes) {
            attributes[attr.name] = attr.value;
        }
        savedLinks.set(linkId, {
            attributes,
            innerHTML: linkElement.innerHTML,
        });
        const linkHTML = linkElement.innerHTML;

        const container = document.createElement('span');
        container.style.position = 'relative';
        container.innerHTML = linkHTML;
        const restoreButton = document.createElement('div');
        restoreButton.className = 'restore-button';
        restoreButton.textContent = '↺';
        restoreButton.dataset.id = linkId;
        restoreButton.addEventListener('click', (event) => {
            event.stopPropagation();
            restoreLink(container, linkId);
        });
        container.appendChild(restoreButton);
        linkElement.replaceWith(container);
    };

    const restoreLink = (container, linkId) => {
        const linkData = savedLinks.get(linkId);
        if (!linkData) return;
        const newLink = document.createElement('a');
        for (const [name, value] of Object.entries(linkData.attributes)) {
            newLink.setAttribute(name, value);
        }
        newLink.innerHTML = linkData.innerHTML;
        container.replaceWith(newLink);
        savedLinks.delete(linkId);
    };

    const style = document.createElement('style');
    style.textContent = `
        .restore-button {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 16px;
            height: 16px;
            background-color: #ff0000;
            color: white;
            border-radius: 50%;
            font-size: 12px;
            text-align: center;
            line-height: 16px;
            cursor: pointer;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
})();
