package br.com.joaoschettini.calculator.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Changelog;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Table(schema = "historico")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Historico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    @UpdateTimestamp
    private LocalDateTime dataHora;

    @Column(name = "expressao")
    private String expressao;

    @Column(name = "resultado")
    private String resultado;

}
