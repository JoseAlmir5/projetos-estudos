package util;

public class Aluno {

    private String name;
    private double nota1;
    private double nota2;
    private double nota3;

    public Aluno(String name, double nota1, double nota2, double nota3) {
        this.name = name;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getNota1() {
        return nota1;
    }

    public double getNota2() {
        return nota2;
    }

    public double getNota3() {
        return nota3;
    }

    public double media() {
        return (nota1 + nota2 + nota3) / 3;
    }

    public String situacao() {
        if (media() >= 6) {
            return ("Aprovado");
        } else {
            return ("Reprovado");
        }
    }

    public String toString() {
        return "Média: "
                + String.format("%.2f", media())
                + ", "
                + "status: "
                + situacao();
    }

}
