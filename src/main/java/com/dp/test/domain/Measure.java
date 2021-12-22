package com.dp.test.domain;

import com.dp.test.domain.enumeration.MeasureType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Measure.
 */
@Entity
@Table(name = "measure")
public class Measure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MeasureType type;

    @Column(name = "value")
    private Float value;

    @ManyToOne
    @JsonIgnoreProperties(value = { "author", "dims" }, allowSetters = true)
    private Book book;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Measure id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MeasureType getType() {
        return this.type;
    }

    public Measure type(MeasureType type) {
        this.setType(type);
        return this;
    }

    public void setType(MeasureType type) {
        this.type = type;
    }

    public Float getValue() {
        return this.value;
    }

    public Measure value(Float value) {
        this.setValue(value);
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Book getBook() {
        return this.book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Measure book(Book book) {
        this.setBook(book);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Measure)) {
            return false;
        }
        return id != null && id.equals(((Measure) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Measure{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
