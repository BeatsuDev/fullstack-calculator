package no.ntnu.ericbi.calculatorapi;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@RestController
public class SolutionController {
    private static ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
    private static ScriptEngine scriptEngine = scriptEngineManager.getEngineByName("JavaScript");

    @GetMapping("/calculate")
    public Solution greeting(@RequestParam(value = "expression") String expression) throws ScriptException {
        Double answer = (Double) scriptEngine.eval(expression);
        return new Solution(expression, answer.toString());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ScriptException.class)
    public Solution handleScriptException(ScriptException e) {
        return new Solution("Invalid expression", "Error");
    }
}