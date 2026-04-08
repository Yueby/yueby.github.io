/**
 * Yueby - 极简精致个人主页
 * 交互逻辑
 */

(function() {
    'use strict';
    
    // ============================================
    // DOM 元素引用
    // ============================================
    const elements = {
        vipToggle: document.querySelector('.vip-toggle'),
        vipPanel: document.getElementById('vip-panel'),
        vipPanelClose: document.querySelector('.vip-panel-close'),
        vipList: document.getElementById('vip-list'),
        secretTrigger: document.getElementById('secret-trigger'),
        passwordModal: document.getElementById('password-modal'),
        passwordInput: document.getElementById('password-input'),
        modalCancel: document.getElementById('modal-cancel'),
        modalConfirm: document.getElementById('modal-confirm'),
        modalBackdrop: document.querySelector('.modal-backdrop')
    };
    
    // ============================================
    // VIP 面板功能
    // ============================================
    async function loadVIPList() {
        try {
            const response = await fetch('./res/data/vip.txt');
            const text = await response.text();
            const names = text.trim().split('\n').filter(name => name.trim());
            
            elements.vipList.innerHTML = names.map(name => 
                `<div class="vip-item">${escapeHtml(name.trim())}</div>`
            ).join('');
        } catch (error) {
            console.error('加载 VIP 列表失败:', error);
            elements.vipList.innerHTML = '<div class="vip-item">加载失败，请刷新重试</div>';
        }
    }
    
    function toggleVIPPanel(open) {
        const panel = elements.vipPanel;
        const toggle = elements.vipToggle;
        
        if (open === undefined) {
            open = !panel.classList.contains('open');
        }
        
        if (open) {
            panel.classList.add('open');
            panel.setAttribute('aria-hidden', 'false');
            toggle.classList.add('active');
            loadVIPList();
        } else {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            toggle.classList.remove('active');
        }
    }
    
    // VIP 面板事件监听
    if (elements.vipToggle) {
        elements.vipToggle.addEventListener('click', () => toggleVIPPanel());
    }
    
    if (elements.vipPanelClose) {
        elements.vipPanelClose.addEventListener('click', () => toggleVIPPanel(false));
    }
    
    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
        if (elements.vipPanel && elements.vipPanel.classList.contains('open')) {
            if (!elements.vipPanel.contains(e.target) && 
                !elements.vipToggle.contains(e.target)) {
                toggleVIPPanel(false);
            }
        }
    });
    
    // ESC 键关闭面板
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.vipPanel && elements.vipPanel.classList.contains('open')) {
                toggleVIPPanel(false);
            }
            if (elements.passwordModal && elements.passwordModal.classList.contains('open')) {
                togglePasswordModal(false);
            }
        }
    });
    
    // ============================================
    // 密码模态框功能
    // ============================================
    function togglePasswordModal(open) {
        const modal = elements.passwordModal;
        
        if (open === undefined) {
            open = !modal.classList.contains('open');
        }
        
        if (open) {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            elements.passwordInput.value = '';
            elements.passwordInput.focus();
        } else {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        }
    }
    
    function verifyPassword() {
        const password = elements.passwordInput.value;
        
        if (password === '114514') {
            togglePasswordModal(false);
            window.open('./res/html/class.html', '_blank');
        } else {
            elements.passwordInput.classList.add('shake');
            elements.passwordInput.value = '';
            
            setTimeout(() => {
                elements.passwordInput.classList.remove('shake');
            }, 500);
        }
    }
    
    // 隐藏入口事件监听
    if (elements.secretTrigger) {
        elements.secretTrigger.addEventListener('click', () => togglePasswordModal());
    }
    
    // 模态框事件监听
    if (elements.modalCancel) {
        elements.modalCancel.addEventListener('click', () => togglePasswordModal(false));
    }
    
    if (elements.modalConfirm) {
        elements.modalConfirm.addEventListener('click', verifyPassword);
    }
    
    if (elements.modalBackdrop) {
        elements.modalBackdrop.addEventListener('click', () => togglePasswordModal(false));
    }
    
    // 密码输入框回车确认
    if (elements.passwordInput) {
        elements.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                verifyPassword();
            }
        });
    }
    
    // ============================================
    // 工具函数
    // ============================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ============================================
    // 添加抖动动画样式
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        .shake {
            animation: shake 0.3s ease-in-out;
            border-color: #ff6b6b !important;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // 页面加载动画
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // 确保所有元素都已渲染
        document.body.style.opacity = '1';
    });
    
    // ============================================
    // 键盘导航支持
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Tab 键导航时显示焦点指示器
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // 添加键盘导航样式
    const keyboardNavStyle = document.createElement('style');
    keyboardNavStyle.textContent = `
        body:not(.keyboard-nav) *:focus {
            outline: none;
        }
        body.keyboard-nav *:focus-visible {
            outline: 2px solid var(--color-gold);
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(keyboardNavStyle);
    
})();
