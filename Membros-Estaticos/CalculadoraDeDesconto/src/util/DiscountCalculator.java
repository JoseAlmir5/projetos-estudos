package util;

public class DiscountCalculator {

    public static double DISCOUNT = 0.10;

    public static double valueFinal(double produto) {
        return produto - produto * DISCOUNT;
    }
}
