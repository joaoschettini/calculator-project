package br.com.joaoschettini.calculator.controller;

import br.com.joaoschettini.calculator.model.Calculadora;
import br.com.joaoschettini.calculator.model.Historico;
import br.com.joaoschettini.calculator.service.CalculadoraService;
import br.com.joaoschettini.calculator.service.HistoricoService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@AllArgsConstructor
@RequestMapping("/calcular")
public class CalculadoraController {

    private final CalculadoraService service;


    @PostMapping
    @ApiResponse(responseCode = "201", description = "Cálculo realizado com sucesso")
    public ResponseEntity<Calculadora> calcular(@RequestBody Calculadora calculadora) {
        try {
            Calculadora novoCalculadora = service.calcular(calculadora);
            return ResponseEntity.status(201).body(novoCalculadora);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
