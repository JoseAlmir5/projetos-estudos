package main;

import entities.Rectangle;

import java.util.Locale;
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        Rectangle ret = new Rectangle();

        System.out.println("Digite a largura: ");
        ret.width = sc.nextDouble();

        System.out.println("Digite a altura: ");
        ret.height = sc.nextDouble();

        System.out.printf("Area: %.2f%n", ret.area());
        System.out.printf("Perimetro: %.2f%n", ret.perimeter());
        System.out.printf("Diagonal: %.2f%n", ret.diagonal());

        sc.close();
    }
}
