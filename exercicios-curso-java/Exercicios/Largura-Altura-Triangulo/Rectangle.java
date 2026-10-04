package ExerciciosCurso.ExercicioPOO.LarguraAlturaRetangulo;

public class Rectangle {

    public double width;
    public double height;

    public double area() {
        return width * height;
    }

    public double perimeter() {
        return (width + height) * 2;
    }

    public double diagonal() {
        return Math.sqrt(width * width + height * height);
    }

    @Override
    public String toString() {
        return "AREA = "
                + String.format("%.2f", area())
                + "\nPERIMETER = "
                + String.format("%.2f", perimeter())
                + "\nDIAGONAL = "
                + String.format("%.2f", diagonal());
    }
}
