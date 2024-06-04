<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

const products = reactive([
  { idProduct: 1, description: 'A', price: 1000 },
  { idProduct: 2, description: 'B', price: 5000 },
  { idProduct: 3, description: 'C', price: 30 }
]);

const order = reactive({
  code: "",
  cpf: "987.654.321-00",
  items: [] as any,
  total: 0
});

const message = ref("");

const addItem = function (product: any) {
  const existingItem = order.items.find((item: any) => item.idProduct === product.idProduct)
  if (!existingItem) {
    order.items.push({ idProduct: product.idProduct, price: product.price, quantity: 1 })
  } else {
    existingItem.quantity++
  }
};

const decreaseItem = function (idProduct: number) {
  const existingItem = order.items.find((item: any) => item.idProduct === idProduct)
  if (!existingItem) return
  existingItem.quantity--
  if (existingItem.quantity === 0) {
    order.items.splice(order.items.indexOf(existingItem), 1);
  }
}

const increaseItem = function (idProduct: number) {
  const existingItem = order.items.find((item: any) => item.idProduct === idProduct)
  if (!existingItem) return
  existingItem.quantity++
}

const getTotal = function () {
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  return total
};

const getProductById = function (idProduct: number) {
  return products.find((product) => product.idProduct === idProduct);
}

const formatMoney = function (amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(amount);
}

const confirm = async function (order: any) {
  const response = await axios.post('http://localhost:3000/checkout', order)
  const orderData = response.data
  order.code = orderData.code
  order.total = orderData.total
  message.value = 'Success';
}

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/products');
  const productsData = response.data;
  products.push(...productsData);
});

</script>

<template>
  <div class="title">Checkout</div>
  <div v-for="product in products">
    <span class="product-description">{{ product.description }}</span>
    <span class="product-price">{{ formatMoney(product.price) }}</span>
    <button class="product-add-button" @click='addItem(product)'>add</button>
  </div>
  <div class="total">{{ formatMoney(getTotal()) }}</div>
  <div v-for="item in order.items">
    <span class="item-description">{{ getProductById(item.idProduct)?.description }}</span>
    <span class="item-quantity">{{ item.quantity }}</span>
    <button class="item-increase-button" @click='increaseItem(item.idProduct)'>+</button>
    <button class="item-decrease-button" @click='decreaseItem(item.idProduct)'>-</button>
  </div>
  <button class="confirm" @click="confirm(order)">confirm</button>
  <div class="message">{{ message }}</div>
  <div class="order-code">{{ order.code }}</div>
  <div class="order-total">{{ order.total }}</div>
</template>

<style scoped></style>
