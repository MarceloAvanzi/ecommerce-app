import Coupon from "./Coupon";

export default interface CouponData {
    getCoupon(code: string): Promise<Coupon>;
}