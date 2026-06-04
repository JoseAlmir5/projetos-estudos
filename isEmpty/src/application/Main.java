package application;

import util.Employee;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Digite os dados do funcionario... ");

        System.out.println("Nome do funcionario: ");
        String name = sc.nextLine();
        System.out.println("Informe o salario: ");
        double salary = sc.nextDouble();
        sc.nextLine();
        System.out.println("Departamento: ");
        String departament = sc.nextLine();

        Employee employee;
        if (departament.isEmpty()) {
            employee = new Employee(name, salary);
        } else {
            employee = new Employee(name, salary, departament);
        }

        System.out.println(employee);

        sc.close();
    }
}
