package com.dp.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_desc")
    private String desc;

    @ManyToOne
    @JsonIgnoreProperties(value = { "books" }, allowSetters = true)
    private Author author;

    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "book" }, allowSetters = true)
    private Set<Measure> dims = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Book id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Book name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return this.desc;
    }

    public Book desc(String desc) {
        this.setDesc(desc);
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Author getAuthor() {
        return this.author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Book author(Author author) {
        this.setAuthor(author);
        return this;
    }

    public Set<Measure> getDims() {
        return this.dims;
    }

    public void setDims(Set<Measure> measures) {
        if (this.dims != null) {
            this.dims.forEach(i -> i.setBook(null));
        }
        if (measures != null) {
            measures.forEach(i -> i.setBook(this));
        }
        this.dims = measures;
    }

    public Book dims(Set<Measure> measures) {
        this.setDims(measures);
        return this;
    }

    public Book addDim(Measure measure) {
        this.dims.add(measure);
        measure.setBook(this);
        return this;
    }

    public Book removeDim(Measure measure) {
        this.dims.remove(measure);
        measure.setBook(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
