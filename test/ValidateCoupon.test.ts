import CouponDataDatabase from "../src/CouponDataDatabase"
import ValidateCoupon from "../src/ValidateCoupon";

test('Deve validar um cupom de desconto', async function () {
    const couponData = new CouponDataDatabase();
    const validateCoupon = new ValidateCoupon(couponData);
    const output = await validateCoupon.execute('VALE20', 1000);
    expect(output.isExpired).toBeFalsy();
    expect(output.discount).toBe(200);
})