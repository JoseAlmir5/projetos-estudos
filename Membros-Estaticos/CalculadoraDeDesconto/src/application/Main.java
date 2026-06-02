package application;

import util.DiscountCalculator;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.print("Entre com o preço do produto: ");
        double produto = sc.nextDouble();

        double valorF = DiscountCalculator.valueFinal(produto);

        System.out.printf("Preço inicial do produto = %.2f reais%nPreço final = %.2f%n", produto, valorF);


        sc.close();
    }
}
