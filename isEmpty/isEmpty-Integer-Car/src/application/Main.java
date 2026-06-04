package application;

import util.Car;
import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Entre com os dados do seu carro...");

        System.out.print("Entre com a marca do carro: ");
        String brand = sc.nextLine();
        System.out.print("Entre com o modelo do carro: ");
        String model = sc.nextLine();
        System.out.print("Entre com o ano do carro (ou deixe vazio): ");
        String yearT = sc.nextLine();

        Car car;

        if (yearT.isEmpty()) {
            car = new Car(brand, model);
        } else {
            int year = Integer.parseInt(yearT);
            car = new Car(brand, model, year);
        }

        System.out.println(car);

        sc.close();
    }
}
