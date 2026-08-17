package br.com.joaoschettini.calculator.service;

import br.com.joaoschettini.calculator.model.Calculadora;
import br.com.joaoschettini.calculator.model.Historico;
import lombok.AllArgsConstructor;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CalculadoraService {

    private final HistoricoService historicoService;

    public Calculadora calcular(Calculadora calculadora) {
        Expression calculo = new ExpressionBuilder(calculadora.getExpressao())
                .build();

        Double resultado = calculo.evaluate();
        calculadora.setResultado(resultado.toString());

        salvarHistorico(calculadora);

        return calculadora;
    }

    public Historico salvarHistorico(Calculadora calculadora) {
        Historico historico = new Historico();
        historico.setExpressao(calculadora.getExpressao());
        historico.setResultado(calculadora.getResultado());
        return historicoService.salvar(historico);
    }
}
