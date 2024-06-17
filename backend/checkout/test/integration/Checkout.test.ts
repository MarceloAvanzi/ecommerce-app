import Checkout from "../../src/application/Checkout";
import CouponData from "../../src/domain/data/CouponData";
import Currencies from "../../src/domain/entities/Currencies";
import CurrencyGateway from "../../src/infrastructure/gateway/CurrencyGatewayRandom";
import Mailer from "../../src/infrastructure/mailer/Mailer";
import MailerConsole from "../../src/infrastructure/mailer/MailerConsole";
import OrderData from "../../src/domain/data/OrderData";
import ProductData from "../../src/domain/data/ProductData";
import sinon from 'sinon';
import Product from "../../src/domain/entities/Product";
import FreightGatewayHttp from "../../src/infrastructure/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infrastructure/gateway/CatalogGatewayHttp";

test('Deve fazer um pedido com 3 produtos', async function () {
    const input = {
        cpf: '987.654.321-00',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 1;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6370);
});

test('Deve fazer um pedido com 4 produtos com moedas diferentes com stub e spy', async function () {
    const currencies = new Currencies()
    currencies.addCurrency('USD', 2)
    currencies.addCurrency('BRL', 1)
    const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, 'getCurrencies').resolves(currencies);
    const mailerSpy = sinon.spy(MailerConsole.prototype, 'send');
    const input = {
        cpf: '987.654.321-00',
        email: 'marcelo@email.com',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
            { idProduct: 4, quantity: 1 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
                4: new Product(4, 'D', 100, 100, 30, 10, 3, 'USD'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 1;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6600);
    // expect(mailerSpy.calledOnce).toBeTruthy();
    // expect(mailerSpy.calledWith('marcelo@email.com', 'Checkout Success', 'ABCDEF')).toBeTruthy();
    currencyGatewayStub.restore();
    mailerSpy.restore();
});

test('Deve fazer um pedido com 4 produtos com moedas diferentes com mock', async function () {
    const currencies = new Currencies()
    currencies.addCurrency('USD', 2)
    currencies.addCurrency('BRL', 1)
    const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype);
    currencyGatewayMock.expects('getCurrencies')
        .once()
        .resolves(currencies);
    // const mailerMock = sinon.mock(MailerConsole.prototype);
    // mailerMock.expects('send')
    //     .once()
    //     .withArgs('marcelo@email.com', 'Checkout Success');

    const input = {
        cpf: '987.654.321-00',
        email: 'marcelo@email.com',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
            { idProduct: 4, quantity: 1 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
                4: new Product(4, 'D', 100, 100, 30, 10, 3, 'USD'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 1;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6600);
    currencyGatewayMock.restore();
    currencyGatewayMock.verify();
    // mailerMock.verify();
    // mailerMock.restore();
});

test('Deve fazer um pedido com 4 produtos com moedas diferentes com fake', async function () {
    const input = {
        cpf: '987.654.321-00',
        email: 'marcelo@email.com',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
            { idProduct: 4, quantity: 1 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
                4: new Product(4, 'D', 100, 100, 30, 10, 3, 'USD'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }
    const currencies = new Currencies()
    currencies.addCurrency('USD', 2)
    currencies.addCurrency('BRL', 1)

    const currencyGateway: CurrencyGateway = {
        async getCurrencies(): Promise<any> {
            return currencies
        }
    }

    const log: { to: string, subject: string, message: string }[] = [];
    const mailer: Mailer = {
        async send(to: string, subject: string, message: string): Promise<any> {
            log.push({ to, subject, message });
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 1;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway, currencyGateway, mailer);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6600);
    // expect(log).toHaveLength(1);
    // expect(log[0].to).toBe('marcelo@email.com');
    // expect(log[0].subject).toBe('Checkout Success');
    // expect(log[0].message).toBe('ABCDEF');
});

test('Deve fazer um pedido com 3 produtos com código do pedido', async function () {
    const input = {
        cpf: '987.654.321-00',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 0;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const output = await checkout.execute(input);
    expect(output.code).toBe('202400000001');
});

test('Deve fazer um pedido com 3 produtos com CEP de origem e destino', async function () {
    const input = {
        from: '22030060',
        to: '88015600',
        cpf: '987.654.321-00',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    };

    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
    const productData: ProductData = {
        async getProduct(idProduct: number): Promise<Product> {
            const products: { [idProduct: number]: Product } = {
                1: new Product(1, 'A', 1000, 100, 30, 10, 3, 'BRL'),
                2: new Product(2, 'B', 5000, 50, 50, 50, 22, 'BRL'),
                3: new Product(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'),
            }
            return products[idProduct];
        }
    }
    const couponData: CouponData = {
        async getCoupon(code: string): Promise<any> {
            const coupons: { [code: string]: any } = {
                'VALE20': { code: 'VALE20', percentage: 20, expire_date: new Date('2024-12-01T10:00:00') },
                'VALE20_EXPIRED': { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date('2024-03-01T10:00:00') },
            }
            return coupons[code];
        }
    }

    const orderData: OrderData = {
        async save(order: any): Promise<void> {
        },
        async getByCpf(cpf: string): Promise<any> {
        },
        async count(): Promise<number> {
            return 1;
        }
    }

    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const output = await checkout.execute(input);
    expect(output.total).toBe(6307.06);
});