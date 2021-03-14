import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';
// jest.mock("../node_modules/nuxt-i18n");
// import i18n from "../node_modules/nuxt-i18n";

const $tc = () => { };

describe('Footer', () => {
  const wrapper = shallowMount(Footer, {
    mocks: { $tc }
  });

  it('is a Vue component', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // it('renders the correct date', () => {
  //   expect(wrapper.html()).toContain('Cyberleaf Studio');
  // });

});
