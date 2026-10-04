package ExerciciosCurso.ExercicioPOO.LarguraAlturaRetangulo;

import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        Rectangle rectangle = new Rectangle();

        System.out.println("Enter rectangle width and height: ");
        System.out.println("Width: ");
        rectangle.width = sc.nextDouble();
        System.out.println("Height: ");
        rectangle.height = sc.nextDouble();

        System.out.println(rectangle);

        sc.close();
    }
}
