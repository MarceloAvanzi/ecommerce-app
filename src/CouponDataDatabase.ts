import Coupon from "./Coupon";
import CouponData from "./CouponData";
import pgp from 'pg-promise';

export default class CouponDataDatabase implements CouponData {
    async getCoupon(code: string): Promise<Coupon> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        const [couponData] = await connection.query('select * from eccommerce_app.coupons where code = $1', [code])
        await connection.$pool.end()
        if (!couponData) throw new Error('Coupon not found')
        return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
    }
}