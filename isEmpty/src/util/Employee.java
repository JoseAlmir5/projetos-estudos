package util;

public class Employee {

    public String name;
    public double salary;
    public String departament;

    public Employee(String name, double salary, String departament) {
        this.name = name;
        this.salary = salary;
        this.departament = departament;
    }

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
        departament = "Not informed";
    }

    public String toString() {
        return "funcionario: "
                + name
                + ", "
                + "Salario: R$"
                + String.format("%.2f", salary)
                + ", "
                + "Departamento: "
                + departament;

    }

}
