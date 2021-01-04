import { Vue, Component } from 'nuxt-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    activeModal: number;
    openModal(id: number): boolean;
    toggleModal(id: number, lock: boolean): void;
    scrollLock(): void;
    scrollUnlock(): void;
  }
}

@Component
export default class ToggleModalMxn extends Vue {

  openModal(id: number) {
    return this.activeModal === id;
  }

  toggleModal(id: number, lock: boolean) {
    if (this.activeModal !== 0) {
      this.activeModal = 0;

      if (lock === true)
        this.scrollUnlock();

      return false;
    }

    this.activeModal = id;

    if (lock === true)
      this.scrollLock();
  }

  scrollLock() {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.classList.add('locked');
    body.style.width = '100%';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
  }

  scrollUnlock() {
    const scrollY = document.body.style.top;
    const body = document.body;
    body.classList.remove('locked');
    body.style.width = '100%';
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

}
