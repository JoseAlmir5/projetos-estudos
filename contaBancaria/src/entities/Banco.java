package entities;

public class Banco {

    private int number;
    private String name;
    private double saldo;

    public Banco() {

    }

    public Banco(int number, String name, double initialDeposit) {
        this.number = number;
        this.name = name;
        addSaldo(initialDeposit);
    }

    public Banco(int number, String name) {
        this.number = number;
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSaldo() {
        return saldo;
    }

    public void addSaldo(double saldo) {
        this.saldo += saldo;
    }

    public void removeSaldo(double saldo) {
        if (saldo > 0 && saldo + 5 <= this.saldo) {
            this.saldo -= saldo + 5;
        }
    }

    public String toString() {
        return "Conta: "
                + number
                + ", Titular: "
                + name
                + ", Saldo: R$"
                + String.format("%.2f", saldo);
    }


}
