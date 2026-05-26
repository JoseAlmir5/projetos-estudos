package entities;

public class Employee {

    public String nome;
    public double salarioBruto;
    public double imposto;

    public double salarioLiquido() {
        return salarioBruto - (salarioBruto * imposto / 100);
    }

    public double aumentoDeSalario(double percentage) {
        return salarioBruto += (salarioBruto * percentage / 100);
    }

}
