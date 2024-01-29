package no.ntnu.ericbi.calculatorapi;

import com.fathzer.soft.javaluator.DoubleEvaluator;

class CalculationService {
    public double evaluate(String expression) {
        DoubleEvaluator eval = new DoubleEvaluator();
        return eval.evaluate(expression);
    }
}