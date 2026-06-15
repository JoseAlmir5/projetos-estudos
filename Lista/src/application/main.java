package application;

import util.Employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

public class main {

    public static void main(String [] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        List<Employee> list = new ArrayList<>();

        System.out.println("Quantos funcionários serão registrados? ");
        int n = sc.nextInt();

        for (int i=0; i<n; i++) {

            System.out.println();
            System.out.println("Funcionário #" + (i + 1) + ":");
            System.out.println("Id: ");
            Integer id = sc.nextInt();
            System.out.println("Name: ");
            sc.nextLine();
            String name = sc.nextLine();
            System.out.println("Salary: ");
            Double salary = sc.nextDouble();

            Employee emp = new Employee(id, name, salary);
            list.add(emp);
        }

        System.out.print("Entre com o id do funcionário que tera aumento:  ");
        int idSalary = sc.nextInt();
        Integer pos = position(list, idSalary);

        if (pos == null) {
            System.out.println("Esse id não existe!");
        }
        else {
            System.out.print("Entre com a porcentagem ");
            double percent = sc.nextDouble();
            list.get(pos).increaseSalary(percent);
        }

        System.out.println();
        System.out.println("Lista de funcionarios: ");
        for (Employee emp : list) {
            System.out.println(emp);
        }

        sc.close();
    }

    public static Integer position(List<Employee> list, int id) {
        for (int i=0; i<list.size(); i++) {
            if (list.get(i) .getId() == id) {
                return i;
            }
        }
        return null;
    }

}
