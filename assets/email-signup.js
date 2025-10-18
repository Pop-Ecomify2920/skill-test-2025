/**
 * Email Signup Block Component
 *
 * Handles dynamic padding adjustment for email signup input fields
 * when integrated buttons have variable widths.
 */
class EmailSignupBlock extends HTMLElement {
  constructor() {
    super();
    /** @type {number} */
    this.lastButtonWidth = 0;
    /** @type {ResizeObserver | undefined} */
    this.observer = undefined;

    this.adjustInputPadding = this.adjustInputPadding.bind(this);
  }

  connectedCallback() {
    this.button = this.querySelector('.email-signup__button--integrated');
    this.input = this.querySelector('.email-signup__input');
    this.inputGroup = this.querySelector('.email-signup__input-group');

    const isTextButton = this.button && this.button.classList.contains('email-signup__button--text');

    if (this.button && this.input && this.inputGroup && isTextButton) {
      this.adjustInputPadding();

      this.observer = new ResizeObserver(() => {
        this.adjustInputPadding();
      });
      this.observer.observe(this.button);

      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          this.adjustInputPadding();
        });
      }
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  adjustInputPadding() {
    if (!this.button || !this.inputGroup) return;

    const buttonWidth = /** @type {HTMLElement} */ (this.button).offsetWidth;

    if (buttonWidth !== this.lastButtonWidth) {
      this.lastButtonWidth = buttonWidth;
      /** @type {HTMLElement} */ (this.inputGroup).style.setProperty('--button-actual-width', `${buttonWidth}px`);
    }
  }
}

if (!customElements.get('email-signup-block')) {
  customElements.define('email-signup-block', EmailSignupBlock);
}
