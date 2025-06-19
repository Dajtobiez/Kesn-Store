package poly.edu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Size")
public class Size {
    @Id
    @Column(name = "MaSize", length = 10)
    private String maSize;

    @Column(name = "SoSize", length = 10, nullable = false)
    private String soSize;

    // Getters and Setters
    public String getMaSize() {
        return maSize;
    }

    public void setMaSize(String maSize) {
        this.maSize = maSize;
    }

    public String getSoSize() {
        return soSize;
    }

    public void setSoSize(String soSize) {
        this.soSize = soSize;
    }
}