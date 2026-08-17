package br.com.joaoschettini.calculator.controller;

import br.com.joaoschettini.calculator.model.Historico;
import br.com.joaoschettini.calculator.repository.HistoricoRepository;
import br.com.joaoschettini.calculator.service.HistoricoService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@AllArgsConstructor
@RequestMapping("/historico")
public class HistoricoController {

    private final HistoricoService service;



    @PostMapping
    @ApiResponse(responseCode = "201", description = "Histórico criado com sucesso")
    public ResponseEntity<Historico> salvar(@RequestBody Historico historico) {
        Historico novoHistorico = service.salvar(historico);
        return ResponseEntity.status(201).body(novoHistorico);
    }

    @GetMapping
    @ApiResponse(responseCode = "200", description = "Históricos encontrados")
    public ResponseEntity<List<Historico>> listar() {
        List<Historico> historicos = service.listar();
        return ResponseEntity.ok(historicos);
    }

    @GetMapping("/{id}")
    @ApiResponse(responseCode = "200", description = "Histórico encontrado")
    @ApiResponse(responseCode = "404", description = "Histórico não encontrado")
    public ResponseEntity<Historico> buscarPorId(@PathVariable Long id) {
        try {
            Historico historico = service.buscarPorId(id);
            return ResponseEntity.ok(historico);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @ApiResponse(responseCode = "200", description = "Histórico atualizado com sucesso")
    @ApiResponse(responseCode = "404", description = "Histórico não encontrado")
    public ResponseEntity<Historico> atualizar(@PathVariable Long id, @RequestBody Historico historicoAtualizado) {
        try {
            Historico historicoAtual = service.atualizar(id, historicoAtualizado);
            return ResponseEntity.ok(historicoAtual);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204", description = "Histórico removido com sucesso")
    @ApiResponse(responseCode = "404", description = "Histórico não encontrado")
    public ResponseEntity<Historico> deletar(@PathVariable Long id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
