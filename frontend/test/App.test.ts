import { mount } from '@vue/test-utils'
import AppVue from '../src/App.vue'
test('Deve ter um pedido vazio', async function () {
    const wrapper = mount(AppVue, {
    });
    expect(wrapper.get('.title').text()).toBe('Checkout');
    expect(wrapper.get('.title').text()).toBe('Checkout');
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe('A');
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe('$1,000.00');
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe('B');
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe('$5,000.00');
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe('C');
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe('$30.00');
    expect(wrapper.get('.total').text()).toBe('$0.00');
})

test('Deve ter um pedido com um item', async function () {
    const wrapper = mount(AppVue, {
    });
    expect(wrapper.get('.title').text()).toBe('Checkout');
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click');
    expect(wrapper.get('.total').text()).toBe('$1,000.00');
    expect(wrapper.findAll('.item-description').at(0)?.text()).toBe('A');
    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('1');

})

test('Deve ter um pedido com varios itens e quantidade acima de 1', async function () {
    const wrapper = mount(AppVue, {
    });
    expect(wrapper.get('.title').text()).toBe('Checkout');
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe('A');
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe('$1,000.00');
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe('B');
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe('$5,000.00');
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe('C');
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe('$30.00');

    await wrapper.findAll('.product-add-button').at(0)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    expect(wrapper.get('.total').text()).toBe('$6,090.00');

    expect(wrapper.findAll('.item-description').at(0)?.text()).toBe('A');
    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('1');
    expect(wrapper.findAll('.item-description').at(1)?.text()).toBe('B');
    expect(wrapper.findAll('.item-quantity').at(1)?.text()).toBe('1');
    expect(wrapper.findAll('.item-description').at(2)?.text()).toBe('C');
    expect(wrapper.findAll('.item-quantity').at(2)?.text()).toBe('3');
})

test('Deve ter um pedido com varios itens e deletar itens do pedido', async function () {
    const wrapper = mount(AppVue, {
    });
    expect(wrapper.get('.title').text()).toBe('Checkout');
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe('A');
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe('$1,000.00');
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe('B');
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe('$5,000.00');
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe('C');
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe('$30.00');

    await wrapper.findAll('.product-add-button').at(0)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click');
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click');
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click');
    expect(wrapper.get('.total').text()).toBe('$6,030.00');

    expect(wrapper.findAll('.item-quantity').at(2)?.text()).toBe('1');
})