/*!
 * justwait cookiemger v2.0
 * A lightweight cookie consent manager
 * MIT License
 */

document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  let config = {
    position: 'right-bottom',
    theme: 'auto',
    showCustomize: true,
    message: 'We use cookies to enhance your experience',
    acceptText: 'Accept All',
    denyText: 'Reject',
    customizeText: 'Customize',
    title: 'Cookie Preferences',
    requiredText: 'Required cookies cannot be disabled',
    primaryColor: '#3b82f6',
    borderRadius: '8px'
  };

  const savedConfig = localStorage.getItem('cookie_config');
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      config = { ...config, ...parsedConfig };
    } catch (e) {
      console.error('Failed to parse cookie_config from localStorage:', e);
    }
  }

  // Check for existing cookie
  const cookie = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
  if (cookie) {
    try {
      const prefs = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      if (prefs.theme === 'dark') document.documentElement.classList.add('dark');
      return;
    } catch (e) {
      // Old cookie format, proceed to show widget
    }
  }

  // Create and inject styles with animations
  const style = document.createElement('style');
  style.textContent = `
    .cookie-widget {
      position: fixed;
      max-width: 380px;
      width: 90%;
      padding: 20px;
      border-radius: ${config.borderRadius};
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background: white;
      color: #1f2937;
      transition: all 0.3s ease;
      animation: fadeInUp 0.5s ease-out;
      transform-origin: bottom;
    }
    .cookie-widget.dark {
      background: #111827;
      color: #f3f4f6;
    }
    .cookie-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .cookie-icon {
      width: 24px;
      height: 24px;
      color: ${config.primaryColor};
    }
    .cookie-buttons {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    .cookie-btn {
      padding: 10px 16px;
      border-radius: ${config.borderRadius};
      font-weight: 500;
      flex: 1;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .cookie-btn-primary {
      background: ${config.primaryColor};
      color: white;
      border: none;
    }
    .cookie-btn-secondary {
      background: transparent;
      border: 1px solid #d1d5db;
      color: inherit;
    }
    .dark .cookie-btn-secondary {
      border-color: #374151;
    }
    .cookie-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 420px;
      padding: 24px;
      border-radius: ${config.borderRadius};
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      z-index: 10000;
      background: white;
      color: #1f2937;
      display: none;
      animation: fadeIn 0.3s ease-out;
    }
    .dark .cookie-modal {
      background: #111827;
      color: #f3f4f6;
    }
    .cookie-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .cookie-theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f3f4f6;
      border-radius: 20px;
      padding: 2px;
    }
    .dark .cookie-theme-toggle {
      background: #1f2937;
    }
    .cookie-theme-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      cursor: pointer;
    }
    .cookie-theme-btn.active {
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .dark .cookie-theme-btn.active {
      background: #374151;
    }
    .cookie-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .dark .cookie-toggle {
      border-color: #374151;
    }
    .cookie-toggle-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cookie-toggle-icon {
      width: 20px;
      height: 20px;
    }
    .cookie-required {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }
    .dark .cookie-required {
      color: #9ca3af;
    }
    .cookie-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      font-size: 12px;
      color: #6b7280;
    }
    .cookie-footer-text {
      display: flex;
      flex-direction: column;
    }
    .cookie-footer-name {
      font-weight: 600;
    }
    .cookie-footer-version {
      font-size: 11px;
      opacity: 0.8;
    }
    .cookie-footer-github {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
    }
    .cookie-footer-github svg {
      width: 16px;
      height: 16px;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Version and GitHub URL
  const version = 'v2.0';
  const githubUrl = 'https://github.com/justwaitfor-me/cookiemger.git';

  // Create widget
  const widget = document.createElement('div');
  widget.className = 'cookie-widget';
  widget.id = 'cookie-consent';

  // Position widget
  const positions = {
    'right-bottom': { bottom: '20px', right: '20px' },
    'left-bottom': { bottom: '20px', left: '20px' },
    'right-top': { top: '20px', right: '20px' },
    'left-top': { top: '20px', left: '20px' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  };
  Object.assign(widget.style, positions[config.position]);

  // Set initial theme
  if (config.theme === 'dark' || (config.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    widget.classList.add('dark');
  }

  // Widget content
  widget.innerHTML = `
    <div class="cookie-header">
      <svg class="cookie-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p>${config.message}</p>
    </div>
    <div class="cookie-buttons">
      <button id="accept-all" class="cookie-btn cookie-btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        ${config.acceptText}
      </button>
      ${config.showCustomize ? `
        <button id="customize" class="cookie-btn cookie-btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          ${config.customizeText}
        </button>
      ` : ''}
      <button id="deny-all" class="cookie-btn cookie-btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        ${config.denyText}
      </button>
    </div>
    <div class="cookie-footer">
      <div class="cookie-footer-text">
        <span class="cookie-footer-name">justwait cookiemger</span>
        <span class="cookie-footer-version">${version}</span>
      </div>
      <a href="${githubUrl}" class="cookie-footer-github" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </a>
    </div>
  `;
  document.body.appendChild(widget);

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'cookie-widget cookie-modal';
  modal.id = 'cookie-modal';
  modal.innerHTML = `
    <div class="cookie-modal-header">
      <h3>${config.title}</h3>
      <div class="cookie-theme-toggle">
        <button class="cookie-theme-btn light-btn" title="Light theme">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
        <button class="cookie-theme-btn dark-btn" title="Dark theme">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="cookie-toggle">
      <div class="cookie-toggle-label">
        <svg class="cookie-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <span>Essential Cookies</span>
      </div>
      <label class="switch">
        <input type="checkbox" checked disabled>
        <span class="slider round"></span>
      </label>
    </div>
    <div class="cookie-required">${config.requiredText}</div>
    <div class="cookie-toggle">
      <div class="cookie-toggle-label">
        <svg class="cookie-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <span>Analytics</span>
      </div>
      <label class="switch">
        <input type="checkbox" id="analytics" checked>
        <span class="slider round"></span>
      </label>
    </div>
    <div class="cookie-toggle">
      <div class="cookie-toggle-label">
        <svg class="cookie-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>Marketing</span>
      </div>
      <label class="switch">
        <input type="checkbox" id="marketing" checked>
        <span class="slider round"></span>
      </label>
    </div>
    <div class="cookie-buttons" style="margin-top:20px">
      <button id="save-prefs" class="cookie-btn cookie-btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Save Preferences
      </button>
    </div>
  `;
  document.body.appendChild(modal);

  // Set initial theme button state
  const lightBtn = modal.querySelector('.light-btn');
  const darkBtn = modal.querySelector('.dark-btn');
  if (widget.classList.contains('dark')) {
    darkBtn.classList.add('active');
  } else {
    lightBtn.classList.add('active');
  }

  // Theme toggle handlers
  lightBtn.addEventListener('click', () => {
    widget.classList.remove('dark');
    modal.classList.remove('dark');
    lightBtn.classList.add('active');
    darkBtn.classList.remove('active');
  });

  darkBtn.addEventListener('click', () => {
    widget.classList.add('dark');
    modal.classList.add('dark');
    darkBtn.classList.add('active');
    lightBtn.classList.remove('active');
  });

  // Event handlers
  document.getElementById('customize')?.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  document.getElementById('save-prefs')?.addEventListener('click', () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    const prefs = {
      analytics: document.getElementById('analytics').checked,
      marketing: document.getElementById('marketing').checked,
      theme: modal.classList.contains('dark') ? 'dark' : 'light',
      date: new Date().toISOString()
    };

    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(prefs))}; expires=${expires.toUTCString()}; path=/`;
    modal.style.display = 'none';
    widget.remove();
  });

  document.getElementById('accept-all')?.addEventListener('click', () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    const prefs = {
      analytics: true,
      marketing: true,
      theme: widget.classList.contains('dark') ? 'dark' : 'light',
      date: new Date().toISOString()
    };

    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(prefs))}; expires=${expires.toUTCString()}; path=/`;
    widget.remove();
  });

  document.getElementById('deny-all')?.addEventListener('click', () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    const prefs = {
      analytics: false,
      marketing: false,
      theme: widget.classList.contains('dark') ? 'dark' : 'light',
      date: new Date().toISOString()
    };

    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(prefs))}; expires=${expires.toUTCString()}; path=/`;
    widget.remove();
  });
});