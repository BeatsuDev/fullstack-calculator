package no.ntnu.ericbi.calculatorapi;

import java.util.logging.Logger;

import org.springframework.web.bind.annotation.*;

@RestController
public class CalculatorController {
    private final CalculationService calculationService = new CalculationService();
    private static final Logger logger = Logger.getLogger( CalculatorController.class.getName() );

    @GetMapping("/calculate")
    public Calculation calculate(@RequestParam(value = "expression") String expression) {
        logger.info("Received request to calculate " + expression);
        double answer = calculationService.evaluate(expression);
        logger.info("Returning answer " + answer);
        return new Calculation(expression, Double.toString(answer));
    }
}