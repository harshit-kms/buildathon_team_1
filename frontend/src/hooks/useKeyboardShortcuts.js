import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when user is typing in input fields
      if (
        event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA' || 
        event.target.contentEditable === 'true' ||
        event.target.isContentEditable
      ) {
        return;
      }

      // Use Alt+Number for navigation (common web app pattern)
      if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        switch (event.code) {
          case 'Digit1':
            event.preventDefault();
            navigate('/');
            break;
          case 'Digit2':
            event.preventDefault();
            navigate('/customers');
            break;
          case 'Digit3':
            event.preventDefault();
            navigate('/marketing');
            break;
          case 'Digit4':
            event.preventDefault();
            navigate('/referrals');
            break;
          case 'Digit5':
            event.preventDefault();
            navigate('/learning');
            break;
        }
      }

      // Use single letters for quick actions (Gmail-style)
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        switch (event.code) {
          case 'KeyH':
            event.preventDefault();
            navigate('/');
            break;
          case 'KeyC':
            event.preventDefault();
            navigate('/customers');
            break;
          case 'KeyM':
            event.preventDefault();
            navigate('/marketing');
            break;
          case 'KeyR':
            event.preventDefault();
            navigate('/referrals');
            break;
          case 'KeyL':
            event.preventDefault();
            navigate('/learning');
            break;
        }
      }

      // Show shortcuts help with '?' (Shift + /)
      if (event.key === '?' && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        showKeyboardShortcutsHelp();
      }

      // Escape to close any open modals
      if (event.key === 'Escape') {
        // Close any existing modals
        const modal = document.getElementById('keyboard-shortcuts-modal');
        if (modal && modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }
    };

    // Show keyboard shortcuts help modal
    const showKeyboardShortcutsHelp = () => {
      // Remove existing modal if present
      const existingModal = document.getElementById('keyboard-shortcuts-modal');
      if (existingModal && existingModal.parentNode) {
        existingModal.parentNode.removeChild(existingModal);
      }

      // Create help modal
      const modal = document.createElement('div');
      modal.id = 'keyboard-shortcuts-modal';
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
      `;

      const content = document.createElement('div');
      content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      `;

      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #111827; font-size: 20px; font-weight: 600;">Keyboard Shortcuts</h2>
          <button id="close-shortcuts" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #6B7280;">&times;</button>
        </div>
        
        <div style="space-y: 16px;">
          <div>
            <h3 style="color: #374151; font-size: 16px; font-weight: 500; margin: 0 0 12px 0;">Navigation (Single Keys)</h3>
            <div style="display: grid; gap: 8px;">
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Dashboard</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">H</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Customers</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">C</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">AI Marketing</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">M</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Referrals</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">R</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Learning</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">L</kbd>
              </div>
            </div>
          </div>

          <div>
            <h3 style="color: #374151; font-size: 16px; font-weight: 500; margin: 16px 0 12px 0;">Alternative Navigation (Alt + Number)</h3>
            <div style="display: grid; gap: 8px;">
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Dashboard</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Alt+1</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Customers</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Alt+2</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">AI Marketing</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Alt+3</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Referrals</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Alt+4</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Learning</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Alt+5</kbd>
              </div>
            </div>
          </div>

          <div>
            <h3 style="color: #374151; font-size: 16px; font-weight: 500; margin: 16px 0 12px 0;">General</h3>
            <div style="display: grid; gap: 8px;">
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Show this help</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">?</kbd>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px; background: #F9FAFB; border-radius: 6px;">
                <span style="color: #374151;">Close modal</span>
                <kbd style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">Esc</kbd>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E5E7EB;">
          <p style="margin: 0; color: #6B7280; font-size: 14px; text-align: center;">
            💡 Shortcuts don't work when typing in text fields
          </p>
        </div>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      // Close modal functionality
      const closeModal = () => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      };

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      content.querySelector('#close-shortcuts').addEventListener('click', closeModal);

      // Close on escape key
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, location]);
};

export default useKeyboardShortcuts;