package util;

public class Car {

    public String brand;
    public String model;
    public int year;

    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
        year = 2026;
    }

    public String toString() {
        return "Marca: "
                + brand
                + ", "
                + "Modelo: "
                + model
                + ", "
                + "Ano: "
                + year;
    }

}
