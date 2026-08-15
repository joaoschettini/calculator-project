package br.com.joaoschettini.calculator.service;

import br.com.joaoschettini.calculator.model.Historico;
import br.com.joaoschettini.calculator.repository.HistoricoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HistoricoService {

    private final HistoricoRepository repository;

    public Historico salvar(Historico historico) {
        return repository.save(historico);
    }

    public List<Historico> listar() {
        return repository.findAll();
    }

    public Historico buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado"));
    }

    public Historico atualizar(Long id, Historico historicoAtualizado) {
        Historico historicoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado"));

        historicoExistente.setExpressao(historicoAtualizado.getExpressao());
        historicoExistente.setResultado(historicoAtualizado.getResultado());

        return repository.save(historicoExistente);
    }

    public void deletar(Long id) {
        Historico historicoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado"));
        repository.delete(historicoExistente);
    }
}
