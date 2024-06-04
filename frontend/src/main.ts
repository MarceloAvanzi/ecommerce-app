import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import CheckoutGatewayHttp from './infra/gateway/CheckoutGatewayHttp'

const app = createApp(App)
app.provide('checkoutGateway', new CheckoutGatewayHttp())
app.mount('#app')
