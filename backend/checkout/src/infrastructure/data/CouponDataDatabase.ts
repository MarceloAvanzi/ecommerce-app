import Coupon from "../../domain/entities/Coupon";
import CouponData from "../../domain/data/CouponData";
import pgp from 'pg-promise';
import Connection from "../database/Connection";

export default class CouponDataDatabase implements CouponData {

    constructor(readonly connection: Connection) { }

    async getCoupon(code: string): Promise<Coupon> {
        const [couponData] = await this.connection.query('select * from eccommerce_app.coupons where code = $1', [code])
        if (!couponData) throw new Error('Coupon not found')
        return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
    }
}