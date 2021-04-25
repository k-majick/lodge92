import { Vue } from 'vue-property-decorator';

interface Binding extends Object {
  value?: string;
  expression?: string;
  arg?: string;
}

export const hoverTooltip = {

  bind(el: HTMLElement, binding: Binding, vnode: any) {
    const msgBox = document.createElement("div");
    let currentTarget: any = null;

    msgBox.classList.add('tooltip');

    el.appendChild(msgBox);

    el.addEventListener('mouseenter', () => {
      msgBox.classList.add('show');
    });

    el.addEventListener('mousemove', e => {
      msgBox.style.top = `calc(${e.offsetY}px + 30px)`;
      msgBox.style.left = `calc(${e.offsetX}px + 30px)`;

      let x = e.clientX;
      let y = e.clientY;
      let target = document.elementFromPoint(x, y);
      let eventName = 'roomId';
      let currentTargetId = '';

      if (binding.value) {
        msgBox!.innerHTML = binding.value;
        return;
      }

      if (target!.tagName === 'path' && target!.hasAttribute('data-id')) {
        msgBox.classList.add('show');

        if (currentTarget !== target) {
          if (currentTarget !== null)
            (currentTarget! as HTMLElement).classList.remove('active');

          currentTarget = target;
          (currentTarget! as HTMLElement).classList.add('active');
        }

      } else {
        msgBox.classList.remove('show');

        if (currentTarget) {
          currentTarget.classList.remove('active');
          currentTarget = null;
          currentTargetId = '';
        }
      }

      if (currentTarget) {
        currentTargetId = currentTarget.getAttribute('data-id');
      } else {
        currentTargetId = '';
      }

      if (vnode.componentInstance) {
        vnode.componentInstance.$emit(eventName, { detail: currentTargetId });
      } else {
        vnode.elm.dispatchEvent(new CustomEvent(eventName, { detail: currentTargetId }));
      }

    });

    el.addEventListener('mouseleave', () => {
      msgBox.innerHTML = '';
      msgBox.classList.remove('show');
    });
  },

  update(el: HTMLElement, binding: Binding, vnode: any) {
    const msg = binding.value;
    const msgBox = el.querySelector('.tooltip');

    msgBox!.innerHTML = msg as string;
  }
}

Vue.directive('hover-tooltip', hoverTooltip);
