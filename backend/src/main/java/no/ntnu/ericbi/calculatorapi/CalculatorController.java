package no.ntnu.ericbi.calculatorapi;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
public class CalculatorController {
    private final CalculationService calculationService = new CalculationService();

    @GetMapping("/calculate")
    public Calculation calculate(@RequestParam(value = "expression") String expression) {
        Double answer = calculationService.evaluate(expression);
        return new Calculation(expression, answer.toString());
    }
}