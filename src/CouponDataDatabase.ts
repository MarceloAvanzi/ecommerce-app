import CouponData from "./CouponData";
import pgp from 'pg-promise';

export default class CouponDataDatabase implements CouponData {
    async getCoupon(code: string): Promise<any> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        const [coupon] = await connection.query('select * from eccommerce_app.coupons where code = $1', [code])
        await connection.$pool.end()
        return coupon;
    }
}