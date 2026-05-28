package application;

import entities.Student;
import java.util.Locale;
import java.util.Scanner;

public class main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        Student student = new Student();

        System.out.println("Bem vindo aluno! Coloque suas notas para saber sua média...");

        System.out.print("Digite sua primeira nota: ");
        student.grade1 = sc.nextDouble();
        System.out.print("Digite sua segunda nota: ");
        student.grade2 = sc.nextDouble();
        System.out.print("Digite sua terceira nota: ");
        student.grade3 = sc.nextDouble();

        System.out.println(student);

        if (student.finalGrade() < 6) {
            System.out.println("REPROVADO");
            System.out.printf("Faltaram: %.2f pontos%n", student.missingPoints());
        } else {
            System.out.println("APROVADO");
        }

        sc.close();
    }
}
